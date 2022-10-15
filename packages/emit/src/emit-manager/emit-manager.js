//#region Imports

import { v4 as uuidv4 } from 'uuid';
import remove from 'lodash/remove';

//#endregion

//#region Classes

/**
 * Class representing the manager responsible for handling all Emit listeners and emissions.
 *
 * @private
 * @memberof module:@psionic/emit
 * @alias module:@psionic/emit.EmitManager
 */
class EmitManager {

    //#region Public Variables

    //#endregion

    //#region Private Variables

    /**
     * A map of listeners by the names of the event they are listening to.
     * @private
     * @type {Map<string, Object>}
     */
    #activeListenersByEventName = new Map();

    //#endregion

    //#region Public Functions

    /**
     * Adds the given listener to the manager and returns an interface for interacting with the created listener.
     * @public
     *
     * @param {string} eventName The name of the event the listener is listening for
     * @param {function} listenerFn The callback to call whenever the listener detects an emission of the event it is tracking
     * @returns {Object} The object to interface with the created listener
     */
    addListener(eventName, listenerFn) {
        // Generate a uuid to store the listener under
        const listenerID = uuidv4();

        // Add the listener to the `activeListenersByEventName` map
        let listenersArray = this.#activeListenersByEventName.get(eventName);
        if (!listenersArray) {
            listenersArray = [];
            this.#activeListenersByEventName.set(eventName, listenersArray);
        }
        listenersArray.push({
            id: listenerID,
            fn: listenerFn,
        });

        // Return an interface to interact with the created listener
        return this.#createListenerObject(eventName, listenerID);
    }

    /**
     * Emits the given event for all listeners to respond to with some optional additional data provided.
     * @public
     *
     * @param {string} eventName The name of the event to emit
     * @param {Object | *} [data={}] The additional data to emit with the event; this will be passed as the only param to each
     * listener's callback function
     */
    emitEvent(eventName, data={}) {
        // Get all of the listeners subscribed to the given event
        const listenersForEvent = this.#activeListenersByEventName.get(eventName) || [];

        // For all of the listeners for the event, call the given callback function
        for (const listener of listenersForEvent) {
            listener.fn(data);
        }
    }

    //#endregion

    //#region Protected Functions

    /**
     * Nukes the Emit Manager's data. Useful for testing... not much else.
     * @protected
     */
    _UNSAFE_nuke() {
        this.#activeListenersByEventName = new Map();
    }

    //#endregion

    //#region Private Functions

    /**
     * Creates the listener object that can be used to interact with the instantiated listener in the manager.
     * @private
     *
     * @param {string} eventName The name of the event the listener is on
     * @param {string} listenerID The ID of the listener to create the object for
     * @returns {Object} An interface to the listener in the manager
     */
    #createListenerObject(eventName, listenerID) {
        return {
            // The cancel method should remove the listener from the manager
            cancel: () => {
                const listenersOnEvent = this.#activeListenersByEventName.get(eventName);
                if (listenersOnEvent) {
                    remove(listenersOnEvent, (item) => item.id === listenerID);
                }
            }
        }
    }

    //#endregion
}

//#endregion

//#region Exports

const emitManagerSingleton = new EmitManager();

module.exports = {
    EmitManager: emitManagerSingleton,
    _UNSAFE_nukeEmitManager: () => emitManagerSingleton._UNSAFE_nuke(),
};

//#endregion