import React, { useContext } from 'react';
import { SnackbarAPI } from '@contexts';

//#region Typedefs

/**
 * The function to call to add a snackbar to the snackbar manager.
 * @typedef {function} AddSnackbarFn
 * @param {React.FunctionComponent} component The component to render as a snackbar
 * in the snackbar manager; this component will automatically be animated in and out via
 * the manager; This component will be passed a `removeSnackbar` prop which can be used to
 * internally remove the snackbar from the manager
 * @param {number} [duration=3000] The duration, in milliseconds, to display the snackbar
 * before it is automatically removed from the manager
 */

//#endregion

//#region Hook

/**
 * Used to add a snackbar to the snackbar manager, if it is in use.
 *
 * @returns {AddSnackbarFn} The function to call to add a snackbar to the snackbar manager
 */
export default function() {
    const snackbarAPI = useContext(SnackbarAPI);

    return snackbarAPI.addSnackbar;
};

//#endregion

//#region Helper Functions

//#endregion
