//#region Imports

//#endregion

//#region Classes

/**
 * Class representing the manager responsible for handling all of the Flux caches, states, engines, etc.
 *
 * @protected
 * @memberof module:@psionic/flux
 * @alias module:@psionic/flux.FluxManager
 */
class FluxManager {

    //#region Public Variables

    //#endregion

    //#region Private Variables

    /**
     * A map of active Flux objects -- FluxCaches, FluxStates, FluxEngines, etc. -- with keys of the Flux objects' IDs.
     * @private
     * @type {Map<string, Object>}
     */
    #activeFluxObjectsInfo = new Map();

    //#endregion

    //#region Public Functions

    /**
     * Retrieves the existing Flux object with a matching ID if it exists, or creates / adds the Flux object to the Manager
     * and returns it if an existing Flux object did not exist for that ID.
     * @public
     *
     * @param {FluxCache | FluxState | FluxEngine} fluxObj The Flux object to add if an existing Flux object with a matching
     * ID does not exist
     * @returns {FluxCache | FluxState | FluxEngine} The existing Flux object with the matching ID, if it exists; otherwise, returns
     * the Flux object that was added to the Flux Manager
     */
    getOrCreateFluxObject(fluxObj) {
        return this.getFluxObject(fluxObj.getID()) || this.addFluxObject(fluxObj);
    }

    /**
     * Adds the given Flux object to be managed by the Flux Manager.
     * @public
     *
     * @param {FluxCache | FluxState | FluxEngine} fluxObj The Flux object to add to the manager
     * @returns {FluxCache | FluxState | FluxEngine} The added Flux object
     */
    addFluxObject(fluxObj) {
        // If the key is already in the active flux obejcts info map, then do nothing
        if (this.#activeFluxObjectsInfo.has(fluxObj.getID())) return;

        // Otherwise, add the object to the active flux objects info map
        this.#activeFluxObjectsInfo.set(
            fluxObj.getID(),
            {
                fluxObj,
                dependedBy: new Map(),
            }
        );

        // Return the Flux object back
        return fluxObj;
    }

    /**
     * Gets the existing Flux object for the given ID if one exists.
     * @public
     *
     * @param {string} id The ID of the existing Flux object to fetch
     * @returns {FluxCache | FluxState | FluxEngine} The existing Flux object for the given ID
     */
    getFluxObject(fluxObjID) {
        return this.#activeFluxObjectsInfo.get(fluxObjID)?.fluxObj;
    }

    //#endregion

    //#region Protected Functions

    /**
     * Nukes the Flux Manager's data. Useful for testing... not much else.
     * @protected
     */
    _UNSAFE_nuke() {
        this.#activeFluxObjectsInfo = new Map();
    }

    //#endregion

    //#region Private Functions

    //#endregion
}

//#endregion

//#region Exports

const fluxManagerSingleton = new FluxManager();

module.exports = {
    FluxManager: fluxManagerSingleton,
    _UNSAFE_nukeFluxManager: () => fluxManagerSingleton._UNSAFE_nuke(),
};

//#endregion