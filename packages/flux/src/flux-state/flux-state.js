//#region Imports

import cloneDeep from 'lodash/cloneDeep';
import { emit } from '@psionic/emit';
import { FluxManager } from '../flux-manager/flux-manager';

//#endregion

//#region Protected Classes

/**
 * Class representing a state whose value can be set, read, and used as a dependency within the Flux framework.
 *
 * New `FluxState`s should be created with the `createFluxState` function -- NOT with a `new FluxState()`
 * constructor. Otherwise, the Flux object will not be instantiated in the general FluxManager singleton, and
 * functionality may break.
 *
 * @public
 * @memberof module:@psionic/flux
 * @alias module:@psionic/flux.FluxState
 */
class FluxState {

    //#region Public Variables

    //#endregion

    //#region Private Variables

    /**
     * The ID of the Flux object.
     * @private
     * @type {string}
     */
    #id;

    /**
     * The data to track in the Flux state.
     * @private
     * @type {*}
     */
    #data;

    //#endregion

    //#region Constructor

    /**
     * @constructor
     * @private
     *
     * @param {Object} config The configuration object
     * @param {string} config.id The ID to use for the FluxState; should be unique among all other active Flux objects
     * @param {*} config.value The initial value to set as data; this will be recursively cloned so that any changes to
     * this value (if it is an object) will not affect the `FluxState` instance's value
     */
    constructor({
        id,
        value,
    }) {
        this.#id = id;
        this.#data = cloneDeep(value);
    }

    //#endregion

    //#region Public Functions

    /**
     * Gets a deeply-cloned copy of the current data from the FluxState.
     * @public
     *
     * @example
     * // Create a FluxState object
     * const profileState = createFluxState({
     *      id: 'profileState',
     *      value: { name: 'John' },
     * });
     *
     * // Read the FluxState object's current value
     * const profile = profileState.get(); // { name: 'John' }
     *
     * @returns {*} A deeply-cloned copy of the current data from the FluxState.
     */
    get() {
        return cloneDeep(this.#data);
    }

    /**
     * Sets the new value for the FluxState.
     * @public
     *
     * @example
     * // Create a FluxState object
     * const profileState = createFluxState({
     *      id: 'profileState',
     *      value: null,
     * });
     *
     * // Set the FluxState object's new value
     * profileState.set({ name: 'John' });
     *
     * // The FluxState will now hold the new value
     * const profile = profileState.get(); // { name: 'John' }
     *
     * @param {*} newValue The new value to store in the FluxState
     */
    set(newValue) {
        this.#data = newValue;

        // Ask the manager to mark all Flux objects depending on this object as stale
        FluxManager.markAllObjectsRelyingOnObjAsStale(this.#id);

        // Emit the updated event
        this.#emitUpdatedEvent();
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

    //#endregion
}

//#endregion

//#region Public Functions

/**
 * Creates a new `FluxState` with the given ID. If the ID is already taken by another Flux object, that object will be returned instead of
 * a new Flux object being created.
 * @public
 * @memberof module:@psionic/flux
 * @alias module:@psionic/flux.createFluxState
 *
 * @example
 * // Create a new Flux State representing a user ID
 * const userIDState = createFluxState({
 *      id: 'userIDState',
 *      value: 'test-user',
 * });
 *
 * @example
 * // If you attempt to create another Flux object with the same ID, the existing Flux object with that ID will be returned instead of
 * // a new one being created:
 * const userIDState = createFluxState({
 *      id: 'userIDState',
 *      value: 'original',
 * });
 *
 * const newUserIDState = createFluxState({
 *      id: 'userIDState',
 *      value: 'new',
 * });
 *
 * await userIDState.get(); // 'original'
 * await newUserIDState.get(); // 'original' as well, because the `createFluxState` call simply returned the existing object with ID `userIDState`
 *
 * @param {Object} config The configuration object
 * @param {string} config.id The ID to use for the FluxState; should be unique among all other active Flux objects
 * @param {*} config.value The initial value to set as data; this will be recursively cloned so that any changes to
 * this value (if it is an object) will not affect the `FluxState` instance's value
 * @returns {FluxState | FluxCache} The created Flux object, or the old Flux object with the given ID
 */
function createFluxState({
    id,
    value
}) {
    return FluxManager.getOrCreateFluxObject(
        new FluxState({
            id,
            value,
        })
    );
}

//#endregion

//#region Exports

export {
    createFluxState,
    FluxState,
};

//#endregion