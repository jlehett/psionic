//#region Imports

import cloneDeep from 'lodash/cloneDeep';

//#endregion

//#region Classes

/**
 * Class representing a singular cache of data. DataCache`s store cache-able data which can be marked as stale
 * after a set amount of time, and set to auto-renew after a set amount of time, if desired.
 *
 * `DataCache`s are initialized with a function that can be used to fetch the data it is intended to hold. These
 * fetching functions can depend on other `DataCache`s, and can optionally be configured to be marked as stale whenever
 * a `DataCache` it depends on becomes marked as stale.
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
     * Variable tracking the last data fetched.
     * @private
     * @type {*}
     */
    #data;

    /**
     * Tracker for the function to call to fetch the data from outside the cache.
     * @private
     * @type {function}
     */
    #fetchFn;

    /**
     * Tracker for the active loading promise. Starts off `null` since no loading promise is active.
     * @private
     * @type {Promise<null> | null}
     */
    #loadingPromise = null;

    /**
     * Tracker for whether the current loading promise has resolved or not yet.
     * @private
     * @type {boolean}
     */
    #currentLoadingPromiseResolved = true;

    /**
     * Tracker for whether the data in the data cache is stale or not. Starts off `true`, since no data has been
     * fetched yet, which means we can't rely on the cache.
     * @private
     * @type {boolean}
     */
    #stale = true;

    /**
     * Tracker for the timeout function ID that sets the cache as stale after a set amount of time. Starts off
     * `null` since no timeout function has been defined yet.
     * @private
     * @type {number}
     */
    #staleTimeoutID = null;

    /**
     * Tracker for the amount of time in milliseconds to wait before marking the data cache as stale.
     * @private
     * @type {number}
     */
    #staleAfterTime = null;

    /**
     * Tracker for whether the stale timer should start when the last fetch resolves, or when the last fetch begins.
     * @private
     * @type {boolean}
     */
    #startStaleTimerOnLastFetchResolve = false;

    /**
     * Array of dependencies for the FluxCache; if any of the dependencies becomes stale, then this cache also becomes stale.
     * @private
     * @type {Array<FluxCache | FluxState>}
     */
    #dependencies = [];

    //#endregion

    //#region Constructor

    /**
     * @constructor
     * @param {function} fetchFn The function to call to fetch the data represented by this
     * cache
     */
    constructor(
        fetchFn,
        {
            staleAfter,
            autoRefreshWhenStale,
            dependencies,
            fetchOnInit,
            startStaleTimerOnLastFetchResolve,
        }={}
    ) {
        // Force the fetching function to be asynchronous for consistency
        this.#fetchFn = async () => {
            return await fetchFn();
        };

        this.#staleAfterTime = staleAfter || null;
        this.#startStaleTimerOnLastFetchResolve = startStaleTimerOnLastFetchResolve;
        this.#dependencies = dependencies;

        if (fetchOnInit) {
            this.fetch();
        }
    }

    //#endregion

    //#region Public Functions

    /**
     * Gets the data for the `FluxCache`. If the data in the cache is not marked as stale, the data from the cache will be used.
     * Otherwise, the data will be fetched with the `fetchFn` from the constructor, stored in the cache, and returned.
     * @public
     *
     * @example
     * async () => {
     *      // Create the friends FluxCache
     *      const friendsCache = new FluxCache(
     *          () => {
     *              return [
     *                  { name: 'John' },
     *                  { name: 'Roni' },
     *              ];
     *          }
     *      );
     *
     *      // Get the friends data from the friends FluxCache (will call the fetch function, since it hasn't been fetched yet
     *      // and is thus currently stale)
     *      let friends = await friendsCache.get();
     *
     *      // Get the friends data from the friends FluxCache (will use local cache, since it has been fetched in the line above,
     *      // and it has not been marked as stale yet)
     *      friends = await friendsCache.get();
     * }
     *
     * @returns {Promise<*>} Resolves with the data from either the cache if it wasn't stale, or from the result of the fetching function,
     * if the cache was stale
     */
    get() {
        // If the data is not marked as stale, use whatever is in the cache
        if (!this.#stale) {
            return this.#getCopyOfDataFromCache();
        }
        // If there is an active loading promise waiting to be resolved, just wait for it to resolve and return the result
        if (!this.#currentLoadingPromiseResolved) {
            return this.#loadingPromise;
        }
        // Otherwise, perform an external fetching operation and return the result
        return this.#performExternalFetch();
    }

    /**
     * Sets the stale state manually. If the stale state would transition from !stale -> stale and a stale timer callback was active,
     * then the stale timer callback will be canceled to prevent errors. If the stale state would transition from stale -> !stale
     * and cache has been configured to automatically be marked as stale after a set amount of time, then a new stale timer callback
     * will start running.
     * @public
     *
     * @example
     * async () => {
     *      // Create the friends FluxCache
     *      const friendsCache = new FluxCache(
     *          () => {
     *              return [
     *                  { name: 'John' },
     *                  { name: 'Roni' },
     *              ];
     *          }
     *      );
     *
     *      // Manually set the friends cache to not be stale
     *      friendsCache.setStale(false);
     *
     *      // Manually set the friends cache to be stale
     *      friendsCache.setStale(true);
     * }
     *
     * @param {boolean} isStale Flag indicating whether the cache should be marked as stale or not
     */
    setStale(isStale) {
        // If transitioning from !stale -> stale
        if (!this.#stale && isStale) {
            // If there is an active stale timer, cancel it
            if (this.#staleTimeoutID) {
                this.#cancelStaleTimer();
            }
        }
        // If transitioning from stale -> !stale
        if (this.#stale && !isStale) {
            // If the `staleAfterTime` value is set, start the stale timer
            if (this.#staleAfterTime) {
                this.#startStaleTimer();
            }
        }

        // Set the stale state
        this.#stale = isStale;
    }

    /**
     * Gets the flag indicating whether the cache is stale or not.
     * @public
     *
     * @example
     * async () => {
     *      // Create the friends FluxCache
     *      const friendsCache = new FluxCache(
     *          () => {
     *              return [
     *                  { name: 'John' },
     *                  { name: 'Roni' },
     *              ];
     *          }
     *      );
     *
     *      // Determine whether the cache is stale
     *      let isStale = friendsCache.getStale(); // true, since no data has been fetched yet
     *
     *      // Fetch the data
     *      let friends = await friendsCache.get();
     *
     *      // Determine whether the cache is stale
     *      isStale = friendsCache.getStale(); // false, since the data has been fetched and there is no stale timer set
     * }
     *
     * @returns {boolean} The flag indicating whether the cache is stale or not
     */
    getStale() {
        return this.#stale;
    }

    //#endregion

    //#region Private Functions

    /**
     * Performs an external fetching operation using the `fetchFn` from the constructor.
     * @private
     *
     * @returns {Promise<*>} Resolves with the result from the `fetchFn` call
     */
    #performExternalFetch() {
        // If a stale timer exists, cancel it
        if (this.#staleTimeoutID) {
            this.#cancelStaleTimer();
        }

        // Start the fetch and store the promise in the private loading promise tracker
        this.#loadingPromise = this.#fetchFn();
        this.#currentLoadingPromiseResolved = false;

        // When the fetching operation resolves, store the result in the cache
        this.#loadingPromise.then((result) => {
            this.#data = result;
            this.#currentLoadingPromiseResolved = true;
            this.#stale = false;
        });

        // Start the stale timer if/when appropriate
        this.#handleStaleTimerStart(this.#loadingPromise);

        // Return the loading promise
        return this.#loadingPromise;
    }

    /**
     * Gets a recursively cloned copy of the data from the cache, whether it is stale or not.
     * @private
     *
     * @returns {*} A recursively cloned copy of the data from the cache.
     */
    #getCopyOfDataFromCache() {
        return cloneDeep(this.#data);
    }

    /**
     * Handles starting the stale timer at the appropriate time, if at all.
     * @private
     *
     * @param {Promise<*>} loadingPromise The loading promise to consider when starting the stale timer
     */
    #handleStaleTimerStart(loadingPromise) {
        // If the staleAfterTime value is not defined, don't do anything
        if (!this.#staleAfterTime) return;

        // If the `startStaleTimerOnLastFetchResolve` flag is set to true, then start the timer after the loading promise resolves
        if (this.#startStaleTimerOnLastFetchResolve) {
            loadingPromise.then(this.#startStaleTimer);
            return;
        }

        // Otherwise, start the timer immediately
        this.#startStaleTimer();
    }

    /**
     * Starts the stale timer, only if a `staleAfterTime` value is provided, and only if a `staleTimeout` function isn't already
     * active.
     * @private
     */
    #startStaleTimer() {
        if (!this.#staleAfterTime) {
            throw {
                message: `Tried to start a stale timer, but the \`staleAfterTime\` value was set to ${this.#staleAfterTime}.`,
                code: 'INVALID_STALE_AFTER_TIME_VALUE_DURING_START',
            };
        }
        if (this.#staleTimeoutID) {
            throw {
                message: `Tried to start a stale timer, but a stale timeout function already exists.`,
                code: 'TRIED_TO_CREATE_DUPLICATE_STALE_TIMER',
            }
        }

        this.#staleTimeoutID = setTimeout(
            () => this.setStale(true),
            this.#staleAfterTime,
        );
    }

    /**
     * Cancels the active stale timer.
     * @private
     */
    #cancelStaleTimer() {
        if (!this.#staleTimeoutID) {
            throw {
                message: `Tried to cancel a stale timer, but no stale timeout function exists.`,
                code: 'TRIED_TO_CANCEL_NON_EXISTENT_STALE_TIMER',
            };
        }

        clearTimeout(this.#staleTimeoutID);
        this.#staleTimeoutID = null;
    }

    //#endregion
}

//#endregion

//#region

export {
    FluxCache
}

//#endregion