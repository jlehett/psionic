import { useState, useEffect } from 'react';

//#region Hook

/**
 * Hook for tracking the user's mouse position in React state.
 */
export default function() {
    /**
     * Track the user's mouse position in state.
     */
    const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

    /**
     * Create the necessary tracking events with an effect.
     */
    useEffect(() => {
        const setFromEvent = (event) => setMousePos({ x: event.clientX, y: event.clientY });
        window.addEventListener('mousemove', setFromEvent);

        return () => {
            window.removeEventListener('mousemove', setFromEvent);
        };
    });

    /**
     * Return the API.
     */
    return [mousePos.x, mousePos.y];
}

//#endregion

//#region Helper Functions

//#endregion
