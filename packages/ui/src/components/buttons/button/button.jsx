import { useState, useLayoutEffect, useRef, useMemo } from 'react';
import PropTypes from 'prop-types';
import { QuarterSpinner } from '@components/spinners';
import localStyles from './button.module.scss';

/**
 * Replace this with a comment describing the component.
 */
const Button = ({
    type,
    onClick,
    disabled,
    children,
    allowMultipleClicks,
    color,
    // Pass-thru Props
    ...passThruProps
}) => {

    //#region Constants

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

    //#endregion

    //#region Effects

    /**
     * Use a layout effect to determine the width of both of the button's children.
     */
    useLayoutEffect(() => {
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
    });

    //#endregion

    //#region Functions

    /**
     * Augment the `onClick` function
     */
    const augmentedOnClick = async () => {
        setOnClickRunning(true);
        await onClick();
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
            onMouseLeave={() => setIsHovered(false)}
            {...passThruProps}
            className={`
                ${localStyles.button}
                ${passThruProps?.className}
            `}
            style={{
                width: `${buttonMaxWidth + 24}px` || '1px',
                height: `${buttonMaxHeight + 8}px` || '1px',
                borderColor: colorToUse,
                color: colorToUse,
                background: isHovered && !(disabled || onClickRunning) ? `${colorToUse}20` : null,
                ...(passThruProps?.style || {})
            }}
            data-running={onClickRunning}
            data-disabled={onClickRunning || disabled}
        >
            {/* RUNNING STATE */}
            <div
                className={localStyles.running}
                ref={runningChildRef}
            >
                <QuarterSpinner
                    size={24}
                    color={colorToUse}
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
    color: PropTypes.string,
};

Button.defaultProps = {
    color: '#0072E5',
    disabled: false,
    allowMultipleClicks: false,
};

export default Button;