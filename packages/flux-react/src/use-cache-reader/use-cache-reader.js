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
 * React Hook that creates state values to interact with `@psionic/flux` `FluxCache` objects for the lifetime of the
 * React component the hook is used in.
 * @public
 * @memberof module:@psionic/flux-react
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
 * // In a React component, use the `useCacheReader` hook to respond to changes to this FluxCache
 * const [
 *      profile,
 *      profileIsStale,
 *      profileIsLoading,
 * ] = useCacheReader(profileCache);
 *
 * // The `profile` from the `useCacheReader` will contain `undefined` since that is the current value in the profile state
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
 * @param {module:@psionic/flux.FluxCache} fluxCache The `FluxCache` object to read data from as it changes
 * @returns {Array<CachedValue, IsStaleFlag, IsLoadingFlag>} Hook API for reading the FluxCache's data as React state
 */
function useCacheReader(fluxCache) {
    // Track some flux cache info in state
    const [cachedValue, setCachedValue] = useState(fluxCache.getCachedData());
    const [isStale, setIsStale] = useState(fluxCache.getStale());
    const [isLoading, setIsLoading] = useState(fluxCache.getIsLoading());

    // Use the `useOnEmit` hook to listen to updates for
    useOnEmit(`_FLUX_${fluxCache.getID()}-updated`, () => {
        setCachedValue(fluxCache.getCachedData());
        setIsStale(fluxCache.getStale());
        setIsLoading(fluxCache.getIsLoading());
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
    useCacheReader,
};

//#endregion