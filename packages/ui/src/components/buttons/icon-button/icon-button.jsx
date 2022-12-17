import { useState } from 'react';
import PropTypes from 'prop-types';
import Color from 'color';
import { QuarterSpinner } from '@components/loaders';
import localStyles from './icon-button.module.scss';

/**
 * A button that is represented by a single SVG icon instead of text.
 */
const IconButton = ({
    size,
    type,
    onClick,
    disabled,
    SvgIcon,
    allowMultipleClicks,
    color,
    paddingRatio,
    // Pass-thru Props
    ...passThruProps
}) => {

    //#region Constants

    /**
     * Various colors for the button.
     */
    const baseColor = Color(color);
    const baseColorOpacity80 = baseColor.fade(0.8);
    const baseColorOpacity90 = baseColor.fade(0.9);

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

    //#endregion

    //#region Effects

    //#endregion

    //#region Functions

    /**
     * Augment the `onClick` function.
     */
    const augmentedOnClick = async () => {
        setOnClickRunning(true);
        await onClick?.();
        setOnClickRunning(false);
    };

    //#endregion

    //#region Variables

    /**
     * Color to use for the background of the button, factoring in disabled and running states.
     */
    const buttonBgColor = (() => {
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
                width: size + size * paddingRatio,
                height: size + size * paddingRatio,
                background: buttonBgColor,
                ...(passThruProps?.style || {}),
            }}
            disabled={onClickRunning || disabled}
        >
            {/* RUNNING STATE */}
            <div className={onClickRunning ? localStyles.running : localStyles.hidden}>
                <QuarterSpinner
                    size={size}
                    color={disabled ? '#888888' : baseColor.string()}
                />
            </div>
            {/* READY STATE */}
            <div className={onClickRunning ? localStyles.hidden : localStyles.ready}>
                <SvgIcon
                    style={{
                        width: size,
                        height: size,
                        fill: disabled ? '#888888' : baseColor.string(),
                    }}
                />
            </div>
        </button>
    );

    //#endregion
};

IconButton.propTypes = {
    /**
     * The size of the button.
     */
    size: PropTypes.number,
    /**
     * The type of the button.
     */
    type: PropTypes.string,
    /**
     * The function to call when the button is clicked.
     */
    onClick: PropTypes.func,
    /**
     * Whether the button is disabled or not.
     */
    disabled: PropTypes.bool,
    /**
     * The SVG icon to use for the button.
     */
    SvgIcon: PropTypes.func.isRequired,
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
     * The amount of padding to add, as a ratio of the button's size.
     */
    paddingRatio: PropTypes.number,
    /**
     * Any additional props to pass through to the internal `button` element.
     *
     * This is not a prop of `passThruProps` -- this is simply a representation of any additional props passed to
     * the `IconButton` component that aren't covered above.
     */
    '...passThruProps': PropTypes.any,
};

IconButton.defaultProps = {
    size: 24,
    type: 'button',
    color: '#0072E5',
    allowMultipleClicks: false,
    paddingRatio: 0.75,
};

export default IconButton;