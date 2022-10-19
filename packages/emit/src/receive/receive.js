//#region Imports

import { EmitManager } from '../emit-manager/emit-manager';

//#endregion

//#region Typedefs

/**
 * An object for interfacing with a create listener.
 * @typedef {Object} EmitListener
 * @property {function} cancel The function to call to cancel the given listener
 *
 * @memberof module:@psionic/emit
 * @alias module:@psionic/emit.EmitListener
 */

//#endregion

//#region Public Functions

/**
 * Creates a new listener for a given event.
 * @public
 * @memberof module:@psionic/emit
 *
 * @example
 * // Create a listener for when the "saved" event is fired
 * const savedListener = onEmit('saved', () => console.log('Saved!'));
 *
 * // In order to cancel it, call the returned object's `cancel` method
 * savedListener.cancel();
 *
 * @param {string} eventName The name of the event to create the listener for
 * @param {function} callback The function to call whenever the given event is emitted; this function should
 * take in the additional data object as its only param
 * @returns {EmitListener} The object to interface with the created listener
 */
function onEmit(eventName, callback) {
    return EmitManager.addListener(eventName, callback);
}

//#endregion

//#region Private Functions

//#endregion

//#region Exports

module.exports = {
    onEmit,
};

//#endregion