//#region Imports

import { useEffect, useRef, useState } from 'react';
import { onEmit } from '@psionic/emit';

//#endregion

//#region Typedefs

/**
 * Callback to start the listener created via `useOnEmit` if it hasn't already been started, or if it had been canceled.
 * This function has no effect if the listener has already been started.
 * @typedef {function} StartListenerCallback
 *
 * @memberof module:@psionic/emit-react
 * @alias module:@psionic/emit-react.StartListenerCallback
 */

/**
 * Callback to cancel the listener created via `useOnEmit` if it currently is listening. This function has no effect if
 * the listener is not actively listening.
 * @typedef {function} CancelListenerCallback
 *
 * @memberof module:@psionic/emit-react
 * @alias module:@psionic/emit-react.CancelListenerCallback
 */

/**
 * Boolean state value tracking whether the listener is currently active or not.
 * @typedef {boolean} ListenerIsActive
 *
 * @memberof module:@psionic/emit-react
 * @alias module:@psionic/emit-react.ListenerIsActive
 */

//#endregion

//#region Public Hooks

/**
 * React Hook that creates a new listener for a given event when the component mounts, and cancels the listener whenever the component
 * unmounts.
 * @public
 * @memberof module:@psionic/emit-react
 *
 * @example
 * // Use a "saved" event listener for the lifetime of the component
 * useOnEmit('saved', () => console.log('Something was saved!'));
 *
 * @example
 * // Create the "saved" event listener for the lifetime of the component
 * const [startSavedListener, cancelSavedListener, savedListenerIsActive] = useOnEmit('saved', () => console.log('Something was saved!'));
 *
 * // Cancel the "saved" event listener early
 * cancelSavedListener();
 *
 * // Start the "saved" event listener back up
 * startSavedListener();
 *
 * @param {string} eventName The name of the event to create the listener for
 * @param {function} callback The function to call whenever the given event is emitted; this function should take
 * in the additional data object as its only param
 * @returns {Array<StartListenerCallback, CancelListenerCallback, ListenerIsActive>} Hook API for interacting with the listener created via the hook
 */
function useOnEmit(eventName, callback) {
    // Create a reference to the listener that is currently working
    const listener = useRef(null);

    // Track whether the listener is active in state
    const [isActive, setIsActive] = useState(true);

    // Define a function that creates the listener if one does not currently exist
    function createListener() {
        listener.current = onEmit(eventName, callback);
        setIsActive(true);
    }

    // Define a function that cancels the current listener if it exists
    function cancelListener() {
        listener.current?.cancel?.();
        listener.current = null;
        setIsActive(false);
    }

    // When the component mounts, create the emit listener; when the component unmounts, cancel the emit listener
    useEffect(() => {
        createListener();
        return cancelListener;
    }, []);

    // Return the hook's API
    return [
        createListener,
        cancelListener,
        isActive,
    ];
}

//#endregion

//#region Exports

module.exports = {
    useOnEmit,
};

//#endregion