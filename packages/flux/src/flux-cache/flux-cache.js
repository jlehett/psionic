//#region Imports

import cloneDeep from 'lodash/cloneDeep';
import { emit } from '@psionic/emit';
import { FluxManager } from '../flux-manager/flux-manager';

//#endregion

//#region Protected Classes

/**
 * Class representing a Flux cache. A Flux cache has a defined `fetch` function which can be used to
 * fetch the data asynchronously. After the data has been fetched, it will be cached. The next time the
 * data needs to be fetched, it will be taken from the cache, unless it was marked as stale.
 *
 * New `FluxCache`s should be created with the `createFluxCache` function -- NOT with a `new FluxCache()`
 * constructor. Otherwise, the Flux object will not be instantiated in the general FluxManager singleton, and
 * functionality may break.
 *
 * @public
 * @memberof module:@psionic/flux
 * @alias module:@psionic/flux.FluxCache
 */
class FluxCache {

    //#region Public Variables

    //#endregion

    //#region Private Variables

    /**
     * Tracks whether the cache is currently stale or not.
     * @private
     * @type {boolean}
     */
    #stale = true;

    /**
     * The data to track in the Flux cache.
     * @private
     * @type {*}
     */
    #data;

    /**
     * The ID of the Flux object.
     * @private
     * @type {string}
     */
    #id;

    /**
     * The function to call to fetch the data from outside the cache.
     * @private
     * @type {function}
     */
    #fetch;

    /**
     * The promise tracking the most recent external `fetch` call.
     * @private
     * @type {Promise<*>}
     */
    #fetchPromise;

    /**
     * The number of milliseconds after which the data in the cache should be marked as stale.
     * @private
     * @type {Number}
     */
    #staleAfter;

    /**
     * The function to call to cancel the active stale setter timer.
     * @private
     * @type {function}
     */
    #cancelStaleSetter;

    //#endregion

    //#region Constructor

    /**
     * @constructor
     * @private
     *
     * @param {Object} config The configuration object
     * @param {string} config.id The ID to use for the FluxCache; should be unique among all other active Flux objects
     * @param {function} config.fetch The function to call to asynchronously fetch the data to store in the cache, if non-stale
     * data does not already exist in the cache
     * @param {Number} [config.staleAfter] The amount of time to wait before declaring the data in the cache as stale; if this value is
     * not passed, then the cache will not be marked stale in response to the age of the data in the cache
     */
    constructor({
        id,
        fetch,
        staleAfter,
    }) {
        this.#id = id;
        // We want to make sure this fetch function is async so we can treat all potential fetch operations identically
        this.#fetch = async () => {
            return fetch();
        };
        this.#staleAfter = staleAfter;
    }

    //#endregion

    //#region Public Functions

    /**
     * Retrieves the appropriate data from the cache, if it is available and non-stale, or externally via
     * the Flux cache's `fetch` function if the data is not available or is stale in the cache.
     * @public
     *
     * @example
     * // Create a FluxCache object
     * const profileCache = createFluxCache({
     *      id: 'profileCache',
     *      fetch: async () => {
     *          await delay(5000);
     *          return { name: 'John' };
     *      }
     * });
     *
     * // Read the value from the FluxCache for the first time (runs the fetch function passed to the cache; promise should take ~5s)
     * const profile = await profileCache.get(); // { name: 'John' }
     *
     * // Read the value from the FluxCache for the second time (retrieves the stored data from the cache; promise should only take a few milliseconds)
     * const cachedProfile = await profileCache.get();
     *
     * @returns {Promise<*>} Resolves with the data from either the cache or from the external fetch function
     */
    async get() {
        // If there is non-stale data in the cache, clone the data and return the result
        if (this.#data && !this.#stale) {
            return cloneDeep(this.#data);
        }
        // If there is a fetch operation already in progress, simply return that promise
        else if (this.#fetchPromise) {
            return this.#fetchPromise;
        }
        // Otherwise, initiate a new external fetch operation, and store the results in the cache
        else {
            this.#fetchPromise = this.#fetch();
            this.#emitUpdatedEvent();

            // Clear out the fetch promise once it resolves
            this.#fetchPromise.then(() => {
                this.#fetchPromise = null;
            });

            // Get the result from the fetch promise, cache the data, and return the result
            const result = await this.#fetchPromise;
            this.#cacheData(result);
            return result;
        }
    }

    /**
     * Getter for the `stale` flag on the cache.
     * @public
     *
     * @example
     * // Create a FluxCache object
     * const profileCache = createFluxCache({
     *      id: 'profileCache',
     *      fetch: async () => {
     *          return { name: 'John' };
     *      },
     *      staleAfter: 5000, // Data will be marked as stale 5s after it is cached
     * });
     *
     * // The cache is always stale when first initialized
     * let isStale = profileCache.getStale(); // true
     *
     * // Fetch the profile to remove the stale state
     * profileCache.get();
     *
     * // The cache will no longer be stale, since the profile was just fetched
     * isStale = profileCache.getStale(); // false
     *
     * // If we wait 5 seconds, the data will become stale since we set `staleAfter` to `5000`
     * await delay(5000);
     * isStale = profileCache.getStale(); // true
     *
     * @returns {boolean} The flag indicating whether the data in the cache is currently stale or not
     */
    getStale() {
        return this.#stale;
    }

    /**
     * Get a flag indicating whether the cache is currently loading data or not.
     * @public
     *
     * @example
     * // Create a FluxCache object
     * const profileCache = createFluxCache({
     *      id: 'profileCache',
     *      fetch: async () => {
     *          // Add an artifical 500ms delay before the data loads
     *          await delay(500);
     *          return { name: 'John' };
     *      },
     * });
     *
     * // The cache is not loading data in the beginning
     * let isStale = profileCache.getIsLoading(); // false
     *
     * // Initiate the load of the data
     * profileCache.get();
     *
     * // The cache is now loading data
     * isStale = profileCache.getIsLoading(); // true
     *
     * // Wait for 500ms for the data to fully load
     * await delay(500);
     *
     * // The cache is no longer loading data
     * isStale = profileCache.getIsLoading(); // false
     *
     * @returns {boolean} Flag indicating whether the cache is actively loading data or not
     */
    getIsLoading() {
        return Boolean(this.#fetchPromise);
    }

    /**
     * Updates the function this cache uses to externally fetch the data it stores. Calling this function will automatically
     * mark the cache as stale.
     * @public
     *
     * @example
     * // Create a FluxCache object
     * const profileCache = createFluxCache({
     *      id: 'profileCache',
     *      fetch: async () => {
     *          return { name: 'John' };
     *      }
     * });
     *
     * // Fetch the initial profile; the cache will not be marked as stale anymore
     * profileCache.get();
     *
     * // Update the fetch function to retrieve a different user's profile; the cache will immediately be marked as stale
     * profileCache.updateFetch(async () => {
     *      return { name: 'Roni' };
     * });
     *
     * @param {function} fetch The new function to call to fetch data to store in this cache
     */
    updateFetch(fetch) {
        // We want to make sure this fetch function is async so we can treat all potential fetch operations identically
        this.#fetch = async () => {
            return fetch();
        }
        this.#markStale();
    }

    /**
     * Manually sets the stale state of the FluxCache. If setting the stale state to `false`, and the `staleAfter` value is set for the FluxCache,
     * the stale timer will start immediately after setting the stale state to `false`.
     * @public
     *
     * @example
     * // Create a FluxCache object
     * const profileCache = createFluxCache({
     *      id: 'profileCache',
     *      fetch: async () => {
     *          return { name: 'John' };
     *      }
     * });
     *
     * // Set the stale state of the cache to `false`, manually
     * profileCache.setStale(false);
     *
     * // Set the stale state of the cache to `true`, manually
     * profileCache.setStale(true);
     *
     * @param {boolean} isStale Flag indicating whether the cache is stale or not
     */
    setStale(isStale) {
        isStale ? this.#markStale() : this.#unmarkStale();
    }

    /**
     * Manually clears the data from the cache. Usually not needed unless a large amount of data is being stored in the cache and you wish to free
     * up memory usage. Calling this function will automatically mark the cache as stale.
     * @public
     *
     * @example
     * // Create a FluxCache object
     * const profileCache = createFluxCache({
     *      id: 'profileCache',
     *      fetch: async () => getLargeAmountOfData(),
     * });
     *
     * // Fetch the data for the cache
     * await profileCache.get();
     *
     * // If the data is no longer needed, it can be manually cleared from the cache to free up memory
     * profileCache.clear();
     */
    clear() {
        this.#data = undefined;
        this.#markStale();
    }

    /**
     * Returns whatever data is currently stored in the cache, regardless of whether that data is stale or not. To note, unless manually cleared,
     * the data from the last successful `get` call will remain stored in the cache until another `get` call resolves and updates the cache. This
     * means it is possible to use this function while another `get` operation is running to retrieve the results from the last successfuly `get`
     * operation.
     * @public
     *
     * @example
     * // Create a FluxState object
     * const userIDState = createFluxState({
     *      id: 'userIDState',
     *      value: 'John',
     * });
     *
     * // Create a FluxCache object
     * const profileCache = createFluxCache({
     *      id: 'profileCache',
     *      fetch: async () => {
     *          // Mock a 5s delay before the data is resolved and stored in the cache
     *          await delay(5000);
     *          const userID = await userIDState.get();
     *          return { name: userID };
     *      },
     * });
     *
     * // Fetch the first reading and store it in the cache
     * await profileCache.get(); // { name: 'John' }
     *
     * // Update the `userIDState` to trigger a stale profile cache
     * userIDState.set('Roni');
     *
     * // Start a new `get` operation to store the new data in the cache (but don't `await` the result)
     * profileCache.get(); // Will resolve to { name: 'Roni' } after 5 seconds
     *
     * // Retrieve the data currently in the cache before the new data resolves and updates the cache
     * profileCache.getCachedData(); // { name: 'John' }
     *
     * @returns {*} The data currently stored in the cache, whether it is stale or not
     */
    getCachedData() {
        return cloneDeep(this.#data);
    }

    /**
     * Get the Flux object's ID.
     * @public
     *
     * @return {string} The Flux object's ID
     */
    getID() {
        return this.#id;
    }

    //#endregion

    //#region Private Functions

    /**
     * Emits the "flux object updated" event.
     * @private
     */
    #emitUpdatedEvent() {
        emit(`_FLUX_${this.#id}-updated`);
    }

    /**
     * Caches the given data, and handles any stale timer logic, if needed.
     * @private
     *
     * @param {*} data The data to store in the cache
     */
    #cacheData(data) {
        this.#data = data;
        this.#unmarkStale();
    }

    /**
     * Marks the cache as stale, while canceling any stale timer that may have otherwise been set.
     * @private
     */
    #markStale() {
        this.#stale = true;

        // If there is an active timeout function, cancel it
        if (this.#cancelStaleSetter) {
            this.#cancelStaleSetter();
            this.#cancelStaleSetter = null;
        }

        // Ask the manager to mark all Flux objects depending on this object as stale
        FluxManager.markAllObjectsRelyingOnObjAsStale(this.#id);

        // Emit the updated event
        this.#emitUpdatedEvent();
    }

    /**
     * Unmarks the cache as stale. Regardless of the cache's stale status before this call, the stale timer will
     * be reset (if a `staleAfter` timer has been provided when constructing the FluxCache).
     * @private
     */
    #unmarkStale() {
        this.#stale = false;

        // If a `staleAfter` timer has been provided, perform the necessary stale timer logic
        if (this.#staleAfter) {

            // Cancel any active timeout functions
            if (this.#cancelStaleSetter) {
                this.#cancelStaleSetter();
            }

            // Create the timeout function and the function to cancel it
            const staleTimeout = setTimeout(() => {
                this.#markStale();
            }, this.#staleAfter);
            this.#cancelStaleSetter = () => clearTimeout(staleTimeout);

        }

        // Emit the updated event
        this.#emitUpdatedEvent();
    }

    //#endregion
}

//#endregion

//#region Public Functions

/**
 * Creates a new `FluxCache` with the given ID. If the ID is already taken by another flux object, that object will be returned instead of
 * a new Flux object being created.
 * @public
 * @memberof module:@psionic/flux
 * @alias module:@psionic/flux.createFluxCache
 *
 * @example
 * // Create a new Flux Cache representing a profile
 * const profileCache = createFluxCache({
 *      id: 'profileCache',
 *      fetch: async () => {
 *          return { name: 'John' };
 *      }
 * });
 *
 * @example
 * // If you attempt to create another Flux object with the same ID, the existing Flux object with that ID will be returned instead of
 * // a new one being created:
 * const profileCache = createFluxCache({
 *      id: 'profileCache',
 *      fetch: async () => {
 *          return { name: 'John' };
 *      }
 * });
 *
 * const newProfileCache = createFluxCache({
 *      id: 'profileCache',
 *      fetch: async () => {
 *          return { name: 'Roni' };
 *      }
 * });
 *
 * await profileCache.get(); // { name: 'John' }
 * await newProfileCache.get(); // { name: 'John' } as well, because the `createFluxCache` call simply returned the existing object with ID `profileCache`
 *
 * @example
 * // Sometimes you may want to invalidate a cache based on 1+ dependencies becoming stale; you can use the `dependsOn` config value to specify this
 * const userIDState = createFluxState({
 *      id: 'userIDState',
 *      value: 'original',
 * });
 *
 * const profileCache = createFluxCache({
 *      id: 'profileCache',
 *      fetch: async () => {
 *          const userID = await userIDState.get();
 *          return fetchProfileByUserID(userID);
 *      },
 *      dependsOn: [userIDState],
 * });
 *
 * profileCache.getStale(); // `true`, Caches start off stale
 * await profileCache.get();
 * profileCache.getStale(); // `false`, Data has now been cached
 * userIDState.set('new');
 * profileCache.getStale(); // `true`, One of the cache's dependencies has become stale
 *
 * @param {Object} config The configuration object
 * @param {string} config.id The ID to use for the FluxCache; should be unique among all other active Flux objects
 * @param {function} config.fetch The function to call to asynchronously fetch the data to store in the cache, if non-stale
 * data does not already exist in the cache
 * @param {Array<FluxCache | FluxState>} [config.dependsOn=[]] The array of Flux objects this cache depends on; if any of the
 * Flux objects' values change or become marked as stale, then this cache will also become marked as stale
 * @param {Number} [config.staleAfter] The amount of time to wait before declaring the data in the cache as stale; if this value is
 * not passed, then the cache will not be marked stale in response to the age of the data in the cache
 * @returns {FluxState | FluxCache} The created Flux object, or the old Flux object with the given ID
 */
function createFluxCache({
    id,
    fetch,
    dependsOn=[],
    staleAfter,
}) {
    return FluxManager.getOrCreateFluxObject(
        new FluxCache({
            id,
            fetch,
            staleAfter,
        }),
        dependsOn,
    );
}

//#endregion

//#region Exports

module.exports = {
    createFluxCache,
    FluxCache,
};

//#endregion