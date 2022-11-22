import { useState, useEffect, useRef, useMemo } from 'react';
import PropTypes from 'prop-types';
import Color from 'color';
import { getContrastingBWColor } from '@utils/colors';
import { QuarterSpinner } from '@components/spinners';
import localStyles from './button.module.scss';

/**
 * Replace this with a comment describing the component.
 */
const Button = ({
    width,
    height,
    type,
    onClick,
    disabled,
    children,
    allowMultipleClicks,
    color,
    variant,
    rounded,
    // Pass-thru Props
    ...passThruProps
}) => {

    //#region Constants

    /**
     * Various colors for the button.
     */
    const baseColor = Color(color);
    const baseColorDark = baseColor.darken(0.15);
    const baseColorDarker = baseColor.darken(0.25);
    const baseColorOpacity80 = baseColor.fade(0.8);
    const baseColorOpacity90 = baseColor.fade(0.9);
    const textColor = getContrastingBWColor(baseColor);

    //#endregion

    //#region Refs

    /**
     * Running children reference.
     */
    const runningChildRef = useRef();

    /**
     * Ready children reference.
     */
    const readyChildRef = useRef();

    //#endregion

    //#region State

    /**
     * Track whether the button's `onClick` function is running or not.
     */
    const [onClickRunning, setOnClickRunning] = useState(false);

    /**
     * Track whether the button is being hovered or not.
     */
    const [isHovered, setIsHovered] = useState(false);

    /**
     * Track whether the button is being pressed or not.
     */
    const [isPressed, setIsPressed] = useState(false);

    /**
     * Track the max height of the button's children.
     */
    const [buttonMaxHeight, setButtonMaxHeight] = useState(null);

    /**
     * Track the max width of the button's children.
     */
    const [buttonMaxWidth, setButtonMaxWidth] = useState(null);

    //#endregion

    //#region Memoized Values

    /**
     * Memoized color to use in the SCSS, factoring in disabled and running states.
     */
    const colorToUse = useMemo(() => {
        return onClickRunning || disabled ? '#888888' : color;
    }, [onClickRunning, disabled, color]);

    /**
     * Memoized color to use for the spinner, depending on the `variant` of the button.
     */
    const spinnerColorToUse = useMemo(() => {
        switch (variant) {
            case 'text':
                return baseColor.string();
            case 'contained':
                return '#444444';
            case 'outlined':
                return '#888888';
            default:
                throw new Error(`Button variant, ${variant}, is unsupported.`);
        }
    }, [variant, colorToUse]);

    /**
     * Memoized styles to use, based on the `variant` of the button and the current state of the button.
     */
    const stylesToUse = useMemo(() => {
        let background;

        switch (variant) {
            case 'text':
                background = (() => {
                    if (onClickRunning || disabled) {
                        return 'none';
                    }

                    if (!isHovered) {
                        return 'none';
                    }

                    if (isPressed && isHovered) {
                        return baseColorOpacity80;
                    }

                    return baseColorOpacity90;
                })();

                return {
                    outline: 'none',
                    border: 'none',
                    background,
                    color: colorToUse,
                };
            case 'contained':
                background = (() => {
                    if (onClickRunning || disabled) {
                        return '#cccccc';
                    }

                    if (!isHovered) {
                        return colorToUse;
                    }

                    if (isPressed && isHovered) {
                        return baseColorDarker;
                    }

                    return baseColorDark;
                })();

                return {
                    outline: 'none',
                    border: 'none',
                    background,
                    color: textColor,
                };
            case 'outlined':
                background = (() => {
                    if (onClickRunning || disabled || !isHovered) {
                        return 'none';
                    }

                    if (isPressed && isHovered) {
                        return baseColorOpacity80;
                    }

                    return baseColorOpacity90;
                })();

                return {
                    outline: 'none',
                    borderWidth: '1px',
                    borderStyle: 'solid',
                    borderColor: colorToUse,
                    color: colorToUse,
                    background,
                };
            default:
                throw new Error(`Button variant, ${variant}, is unsupported.`);
        }
    }, [variant, disabled, isHovered, isPressed, colorToUse, onClickRunning]);

    //#endregion

    //#region Effects

    /**
     * Use a layout effect to determine the width of both of the button's children.
     */
    useEffect(() => {
        // If the child references aren't created yet, return early
        if (!readyChildRef.current || !runningChildRef.current) return;

        // Get the widths and heights of both of the children
        const readyWidth = readyChildRef.current.offsetWidth;
        const readyHeight = readyChildRef.current.offsetHeight;
        const runningWidth = runningChildRef.current.offsetWidth;
        const runningHeight = runningChildRef.current.offsetHeight;

        // Set the max width and max height of the button
        setButtonMaxHeight(Math.max(readyHeight, runningHeight));
        setButtonMaxWidth(Math.max(readyWidth, runningWidth));
    }, []);

    //#endregion

    //#region Functions

    /**
     * Augment the `onClick` function
     */
    const augmentedOnClick = async () => {
        setOnClickRunning(true);
        await onClick?.();
        setOnClickRunning(false);
    };

    //#endregion

    //#region Render Functions

    /**
     * Main render.
     */
    return (
        <button
            type={type}
            onClick={allowMultipleClicks ? onClick : augmentedOnClick}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => {
                setIsHovered(false);
                setIsPressed(false);
            }}
            onMouseDown={() => setIsPressed(true)}
            onMouseUp={() => setIsPressed(false)}
            {...passThruProps}
            className={`
                ${localStyles.button}
                ${passThruProps?.className}
            `}
            style={{
                width: width || `${buttonMaxWidth + 24}px`,
                height: height || `${buttonMaxHeight + 8}px`,
                borderRadius: rounded ? '500px' : '4px',
                ...(stylesToUse || {}),
                ...(passThruProps?.style || {})
            }}
            data-running={onClickRunning}
            disabled={onClickRunning || disabled}
        >
            {/* RUNNING STATE */}
            <div
                className={localStyles.running}
                ref={runningChildRef}
            >
                <QuarterSpinner
                    size={24}
                    color={spinnerColorToUse}
                />
            </div>
            {/* READY STATE */}
            <div
                className={localStyles.ready}
                ref={readyChildRef}
            >
                {children}
            </div>
        </button>
    );

    //#endregion
};

Button.propTypes = {
    /**
     * The fixed height to set for the button (as a value to pass to the button's `style` prop). If this
     * property is given, then the logic to automatically calculate the button's height based on its content
     * will be ignored.
     */
    height: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number,
    ]),
    /**
     * The fixed width to set for the button (as a value to pass to the button's `style` prop). If this property
     * is given, then the logic to automatically calculate the button's width based on its content will be ignored.
     */
    width: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number,
    ]),
    /**
     * The internal `button` element's `type` attribute.
     */
    type: PropTypes.string,
    /**
     * The callback to run when the button is clicked.
     */
    onClick: PropTypes.func,
    /**
     * Flag indicating whether the button is in a disabled state. Will prevent `onClick` events
     * from being fired.
     */
    disabled: PropTypes.bool,
    /**
     * Any children to render within the button.
     */
    children: PropTypes.any.isRequired,
    /**
     * Flag indicating if the button should enter a "running" state that prevents another `onClick` event
     * from being fired until the current `onClick` callback has finished running (if it is async).
     */
    allowMultipleClicks: PropTypes.bool,
    /**
     * The color to use for the button. Supports any of the formats listed here: https://www.npmjs.com/package/color-string.
     */
    color: PropTypes.string,
    /**
     * The variant of the button to render. Only impacts the visual appearance of the button.
     */
    variant: PropTypes.oneOf([
        'outlined',
        'contained',
        'text',
    ]),
    /**
     * Flag indicating whether the button should have fully rounded corners or not. Frequently used when displaying a
     * button on a mobile device or a smaller screen size.
     */
    rounded: PropTypes.bool,
    /**
     * Any additional props to pass through to the internal `button` element.
     *
     * This is not a prop of `passThruProps` -- this is simply a representation of any additional props passed to
     * the `Button` component that aren't covered above.
     */
    '...passThruProps': PropTypes.any,
};

Button.defaultProps = {
    type: 'button',
    color: '#0072E5',
    disabled: false,
    allowMultipleClicks: false,
    variant: 'outlined',
    rounded: false,
    onClick: () => {},
};

export default Button;