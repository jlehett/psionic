//#region Imports

import { EmitManager } from '../emit-manager/emit-manager';

//#endregion

//#region Public Functions

/**
 * Emits the given event for all listeners to respond to with some optional additional data provided.
 * @public
 * @memberof module:@psionic/emit
 *
 * @example
 * // Emit a "saved" event with no additional data added
 * emit('saved');
 *
 * @example
 * // Emit a "saved" event with profile data attached
 * emit('saved', { name: 'John' });
 *
 * @param {string} eventName The name of the event to emit
 * @param {Object | *} [data={}] The additional data to emit with the event; this will be passed as the only param to each
 * listener's callback function
 */
function emit(eventName, data={}) {
    EmitManager.emitEvent(eventName, data);
}

//#endregion

//#region Private Functions

//#endregion

//#region Exports

module.exports = {
    emit,
};

//#endregion