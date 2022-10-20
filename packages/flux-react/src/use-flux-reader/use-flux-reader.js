//#region Imports

import { useState } from 'react';
import { useOnEmit } from '@psionic/emit-react';

//#endregion

//#region Typedefs

//#endregion

//#region Public Hooks

/**
 * React Hook that creates state values to interact with `@psionic/flux` objects for the lifetime of the
 * React component the hook is used in.
 * @public
 * @memberof module:@psionic/flux-react
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
        console.log(`oh ${fluxObj.getID()}`);
        // Get the Flux object's current data
        const currentSynchronousData = getSynchronousData();
        const currentStale = getStale();
        const currentIsLoading = getIsLoading();

        console.log(currentSynchronousData, currentStale, currentIsLoading);

        // Update the necessary values in state
        if (cachedValue !== currentSynchronousData) {
            setCachedValue(currentSynchronousData);
        }
        if (isStale !== currentStale) {
            setIsStale(currentStale);
        }
        if (isLoading !== currentIsLoading) {
            setIsLoading(currentIsLoading);
        }
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