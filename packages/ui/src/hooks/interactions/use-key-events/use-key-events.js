import { useEffect } from 'react';

// #region Hook

/**
 * Adds a listener that will trigger events whenever specified keys are pressed.
 *
 * @param {Object} eventsByKey Map of events to trigger keyed by the key that triggers them
 */
export default function (eventsByKey) {
    /**
     * Define the event handler.
     */
    const eventHandler = (event) => {
        if (eventsByKey[event.key]) {
            eventsByKey[event.key](event);
        }
    };

    /**
     * On mount, add the event listener. On unmount, remove the event listener.
     */
    useEffect(() => {
        document.addEventListener(
            'keydown',
            eventHandler,
            false,
        );

        return () => {
            document.removeEventListener(
                'keydown',
                eventHandler,
                false,
            );
        };
    }, []);
}

// #endregion

// #region Helper Functions

// #endregion
