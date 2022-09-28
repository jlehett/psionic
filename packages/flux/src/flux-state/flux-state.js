//#region Imports

import cloneDeep from 'lodash/cloneDeep';

//#endregion

//#region Classes

/**
 * Class representing a state whose value can be set, read, and used as a dependency within the Flux framework.
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
     * Variable tracking the data in state.
     * @private
     * @type {*}
     */
    #data;

    /**
     * Variable tracking the change listener callbacks by ID.
     * @private
     * @type {Map<string, function>}
     */
    #changeListenerCallbacksByID = new Map();

    //#endregion

    //#region Constructor

    /**
     * @constructor
     * @param {*} initialValue The initial value to set as data; this will be recursively cloned so that any changes
     * to this value (if it is an object) will not affect the `FluxState` instance's value
     */
    constructor(initialValue) {
        this.#data = cloneDeep(initialValue);
    }

    //#endregion

    //#region Public Functions

    /**
     * Sets the `FluxState` instance's new value.
     * @public
     *
     * @example
     * async () => {
     *      // Create the profile FluxState
     *      const profileState = new FluxState(null);
     *
     *      // Fetch the profile data
     *      const profile = await getProfileData();
     *
     *      // Set the profile FluxState's value
     *      profileState.set(profile);
     * }
     *
     * @param {*} value The new value to store in the `FluxState` instance
     */
    set(value) {
        this.#data = value;
        for (const callback of this.#changeListenerCallbacksByID) {
            callback();
        }
    }

    /**
     * Reads the `FluxState` instance's current value.
     * @public
     *
     * @example
     * async () => {
     *      // Create the profile FluxState
     *      const profileState = new FluxState({ name: 'John' });
     *
     *      // Read the profile FluxState's value
     *      return profileState.get(); // { name: 'John' }
     * }
     *
     * @returns {*} The recursively cloned copy of the `FluxState` instance's current value
     */
    get() {
        return this.#getClonedCopyOfLocalData();
    }

    //#endregion

    //#region Protected Functions

    /**
     * Add a change listener function to the change listener callbacks by ID.
     * @protected
     *
     * @param {string} id The ID to use for the callback
     * @param {function} callback The function to call whenever changes occur to this `FluxState` instance's
     * data
     */
    _addChangeListener(id, callback) {
        this.#changeListenerCallbacksByID.set(id, callback);
    }

    /**
     * Removes a change listener callback by ID.
     * @protected
     *
     * @param {string} id The ID of the change listener callback to remove
     */
    _removeChangeListener(id) {
        this.#changeListenerCallbacksByID.delete(id);
    }

    //#endregion

    //#region Private Functions

    /**
     * Returns a recursively cloned copy of the data currently stored in the `FluxState` instance.
     * @private
     *
     * @returns {*} The recursively cloned copy of the `FluxState` instance's current value
     */
    #getClonedCopyOfLocalData() {
        return cloneDeep(this.#data);
    }

    //#endregion
}

//#endregion

//#region Exports

export {
    FluxState
};

//#endregion