/** @module @psionic/loading */

/**
 * Class representing a singular cache of data.
 */
class DataCache {

    //#region Public Variables

    //#endregion

    //#region Constructor

    /**
     * @constructor
     * @param {function} fetchFn The function to call to fetch the data represented by this
     * cache
     */
    constructor(fetchFn) {
        this.fetchFn = fetchFn;
    }

    //#endregion

    //#region Public Functions

    /**
     * Attempts to fetch the data for the cache.
     *
     * @returns {Promise<*>} Resolves with the data to store in the cache
     */
    fetch() {
        this.#fetchHelper();
        return this.fetchFn();
    }

    //#endregion

    //#region Private Functions

    /**
     * Attempts to help with the fetch.
     * @private
     *
     * @returns {null} Doesn't return anything
     */
    #fetchHelper() {
        return null;
    }

    //#endregion
}