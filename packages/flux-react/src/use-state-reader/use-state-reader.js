//#region Imports

import { useState } from 'react';
import { useOnEmit } from '@psionic/emit-react';

//#endregion

//#region Typedefs

//#endregion

//#region Public Hooks

/**
 * React Hook that creates state values to interact with `@psionic/flux` `FluxState` objects
 * for the lifetime of the React component the hook is used in.
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
 * // In a React component, use the `useStateReader` hook to respond to changes to this `FluxState`
 * const profile = useStateReader(profileState);
 *
 * // The return value of the `useStateReader` will contain `null` since that is the current value in the profile state
 * console.log(profile); // null
 *
 * // Update the profile state from anywhere in your codebase
 * profileState.set({ name: 'John });
 *
 * // The return value of the `useStateReader` will contain the new value
 * console.log(profile); // { name: 'John' }
 *
 * @param {module:@psionic/flux.FluxState} fluxState The FluxState object to read data from as it changes
 * @returns {*} The data currently stored in the `FluxState` as a React state value
 */
function useStateReader(fluxState) {
    const [value, setValue] = useState(fluxState.get());

    useOnEmit(`_FLUX_${fluxState.getID()}-updated`, () => {
        setValue(fluxState.get());
    });

    return value;
}

//#endregion

//#region Exports

module.exports = {
    useStateReader,
}

//#endregion