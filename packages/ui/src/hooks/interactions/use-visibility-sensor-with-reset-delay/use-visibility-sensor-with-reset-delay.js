import { useRef, useState } from 'react';

//#region Hook

/**
 * Hook for tracking whether the component is marked as visible, while considering
 * an optional reset delay for when the component is no longer visible.
 */
export default function(resetDelay) {
    // Ref to the reset delay timeout function
    const resetDelayTimeoutRef = useRef();

    // Track whether the component is visible or not
    const [markedAsVisible, setMarkedAsVisible] = useState(false);

    // Handle the visibility change of the component
    const onVisibilityChanged = (isVisible) => {
        if (isVisible) {
            if (resetDelayTimeoutRef.current) {
                clearTimeout(resetDelayTimeoutRef.current);
            }

            if (!markedAsVisible) {
                setMarkedAsVisible(true);
            }
        }

        if (!isVisible) {
            if (!resetDelay) {
                setMarkedAsVisible(false);
            } else {
                if (resetDelay !== Infinity) {
                    resetDelayTimeoutRef.current = setTimeout(() => {
                        setMarkedAsVisible(false);
                    }, resetDelay * 1000);
                }
            }
        }
    };

    // Return the hook API
    return [markedAsVisible, onVisibilityChanged];
}

//#endregion

//#region Helper Functions

//#endregion
