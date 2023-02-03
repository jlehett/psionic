import { useState } from 'react';
import { useFocusVisible } from 'react-aria';

// #region Typedefs

/**
 * The props to spread to an HTML element to track its pseudo selector states.
 * @typedef {Object} PseudoSelectorProps
 */

/**
 * Flag tracking whether the HTML element is currently hovered.
 * @typedef {boolean} IsHovered
 */

/**
 * Flag tracking whether the HTML element is currently focused.
 * @typedef {boolean} IsFocused
 */

/**
 * Flag tracking whether the HTML element is currently pressed.
 * @typedef {boolean} IsPressed
 */

/**
 * Object tracking the pseudo selector states.
 * @typedef {Object} PseudoSelectorStates
 * @property {IsHovered} isHovered Flag tracking whether the HTML element is currently hovered
 * @property {IsFocused} isFocused Flag tracking whether the HTML element is currently focused
 * @property {IsPressed} isPressed Flag tracking whether the HTML element is currently pressed
 */

// #endregion

// #region Hook

/**
 * Hook for tracking the pseudo selector states of an HTML element.
 * @param {boolean} isTextInput Flag indicating whether the HTML element is a text input
 * @returns {[PseudoSelectorProps, PseudoSelectorStates]} The hook API
 */
export default function (isTextInput) {
    // Track all of the pseudo selector states in React state
    const [isHovered, setIsHovered] = useState(false);
    const [isPressed, setIsPressed] = useState(false);
    const [isFocused, setIsFocused] = useState(false);
    const { isFocusVisible } = useFocusVisible(isTextInput);

    // Return the hook API
    return [
        {
            onMouseEnter: () => setIsHovered(true),
            onMouseLeave: () => {
                setIsHovered(false);
                setIsPressed(false);
            },
            onMouseDown: () => setIsPressed(true),
            onMouseUp:   () => setIsPressed(false),
            onFocus:     () => setIsFocused(true),
            onBlur:      () => setIsFocused(false),
        },
        {
            isHovered,
            isFocused: isTextInput ? isFocused : isFocusVisible && isFocused,
            isPressed,
        },
    ];
}

// #endregion

// #region Helper Functions

// #endregion
