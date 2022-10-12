//#region Imports

import cloneDeep from 'lodash/cloneDeep';
import { FluxManager } from '../flux-manager/flux-manager';

//#endregion

//#region Protected Classes

/**
 * Class representing a state whose value can be set, read, and used as a dependency within the Flux framework.
 *
 * @protected
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
    }

    //#endregion

    //#region Protected Functions

    /**
     * Get the Flux object's ID.
     * @protected
     *
     * @return {string} The Flux object's ID
     */
    getID() {
        return this.#id;
    }

    //#region

    //#region Private Functions

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
 * @param {Object} config The configuration object
 * @param {string} config.id The ID to use for the FluxState; should be unique among all other active Flux objects
 * @param {*} config.value The initial value to set as data; this will be recursively cloned so that any changes to
 * this value (if it is an object) will not affect the `FluxState` instance's value
 * @returns {FluxState | FluxCache | FluxEngine} The created Flux object, or the old Flux object with the given ID
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