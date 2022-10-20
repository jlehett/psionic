//#region Imports

import { useState } from 'react';
import { useOnEmit } from '@psionic/emit-react';

//#endregion

//#region Typedefs

/**
 * The data currently in the cache, whether it is stale or not. If another piece of data is currently being loaded, the old
 * cached data will be represented here still.
 * @typedef {*} CachedValue
 *
 * @memberof module:@psionic/flux-react
 * @alias module:@psionic/flux-react.CachedData
 */

/**
 * Boolean state value tracking whether the data in the cache is currently stale or not.
 * @typedef {boolean} IsStaleFlag
 *
 * @memberof module:@psionic/flux-react
 * @alias module:@psionic/flux-react.IsStaleFlag
 */

/**
 * Boolean state value tracking whether the data in the cache is currently being loaded or not.
 * @typedef {boolean} IsLoadingFlag
 *
 * @memberof module:@psionic/flux-react
 * @alias module:@psionic/flux-react.IsLoadingFlag
 */

//#endregion

//#region Public Hooks

/**
 * React Hook that creates state values to interact with `@psionic/flux` objects for the lifetime of the
 * React component the hook is used in.
 * @public
 * @memberof module:@psionic/flux-react
 *
 * @example
 * // Create a FluxState object
 * const profileState = createFluxState({
 *      id: 'profileState',
 *      value: null,
 * });
 *
 * // In a React component, use the `useFluxReader` hook to respond to changes to this Flux object
 * const [
 *      profile,
 *      profileIsStale,
 *      profileIsLoading,
 * ] = useFluxReader(profileState);
 *
 * // The `profile` from the `useFluxReader` will contain `null` since that is the current value in the profile state
 * console.log(profile); // null
 *
 * // Update the profile state from anywhere in your codebase
 * profileState.set({ name: 'John' });
 *
 * // The `profile` from the `useFluxReader` will contain the new value
 * console.log(profile); // { name: 'John' };
 *
 * @example
 * // Create a FluxCache object
 * const profileCache = createFluxCache({
 *      id: 'profileCache',
 *      fetch: async () => {
 *          // Mock a network request delay
 *          await delay(500);
 *          return { name: 'John' };
 *      },
 * });
 *
 * // In a React component, use the `useFluxReader` hook to respond to changes to this Flux object
 * const [
 *      profile,
 *      profileIsStale,
 *      profileIsLoading,
 * ] = useFluxReader(profileCache);
 *
 * // The `profile` from the `useFluxReader` will contain `undefined` since that is the current value in the profile state
 * console.log(profile); // undefined
 *
 * // The `profileIsStale` value will be set to `true` since no data has been fetched yet
 * console.log(profileIsStale); // true
 *
 * // The `profileIsLoading` value will be set to `false` since the data is not loading currently
 * console.log(profileIsLoading); // false
 *
 * // Trigger a fetch operation from anywhere in your codebase
 * profileCache.get();
 *
 * // The `profile` will still contain the old data (in this case, undefined)
 * console.log(profile); // undefined
 *
 * // The `profileIsStale` value will still be set to `true` since the data has not been fetched yet
 * console.log(profileIsStale); // true
 *
 * // The `profileIsLoading` flag should now be set to `true` while the data is being fetched
 * console.log(profileIsLoading); // true
 *
 * // Wait for 500ms for the data to finish loading
 * await delay(delayTime);
 *
 * // The `profile` will now contain the new data
 * console.log(profile); // { name: 'John' }
 *
 * // The `profileIsStale` value will be set to `false` since the data was just fetched
 * console.log(profileIsStale); // false
 *
 * // The `profileIsLoading` value will be set to `false` since the data has finished loading
 * console.log(profileIsLoading); // false
 *
 * @param {module:@psionic/flux.FluxState | module:@psionic/flux.FluxCache} fluxObj The flux object to read data from as it changes
 * @returns {Array<CachedValue, IsStaleFlag, IsLoadingFlag>} Hook API for reading the Flux object's data as React state
 */
function useFluxReader(fluxObj) {
    // Define a function to get the synchronous data from the flux object
    const getSynchronousData = () => {
        if (fluxObj?.getCachedData) return fluxObj.getCachedData();
        if (fluxObj?.get) return fluxObj.get();
        return undefined;
    };
    // Define a function to get whether the flux object is stale or not
    const getStale = () => {
        if (fluxObj?.getStale) return fluxObj.getStale();
        return false;
    }
    // Define a function to get whether the flux object is actively loading data or not
    const getIsLoading = () => {
        if (fluxObj?.getIsLoading) return fluxObj.getIsLoading();
        return false;
    }

    // Track some flux object info in state
    const [cachedValue, setCachedValue] = useState(getSynchronousData());
    const [isStale, setIsStale] = useState(getStale());
    const [isLoading, setIsLoading] = useState(getIsLoading());

    // Use the `useOnEmit` hook to listen to updates for
    useOnEmit(`_FLUX_${fluxObj.getID()}-updated`, () => {
        setCachedValue(getSynchronousData());
        setIsStale(getStale());
        setIsLoading(getIsLoading());
    });

    return [
        cachedValue,
        isStale,
        isLoading,
    ];
}

//#endregion

//#region Exports

module.exports = {
    useFluxReader,
};

//#endregion