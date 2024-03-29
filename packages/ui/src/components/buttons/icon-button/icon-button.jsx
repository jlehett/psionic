import { useState, useContext, forwardRef } from 'react';
import PropTypes from 'prop-types';
import Color from 'color';
import { Theme, FormSubmitting } from '@contexts';
import { usePseudoSelectors } from '@hooks/interactions';
import { QuarterSpinner } from '@components/loaders';
import localStyles from './icon-button.module.scss';

/**
 * A button that is represented by a single SVG icon instead of text.
 */
const IconButton = forwardRef(({
    size,
    type,
    onClick,
    disabled,
    SvgIcon,
    allowMultipleClicks,
    color,
    paddingRatio,
    disabledOnFormSubmitting,
    // Pass-thru Props
    ...passThruProps
}, ref) => {
// #region Context

    /**
     * Use the theme from context.
     */
    const theme = useContext(Theme);

    /**
     * Use the form submitting flag from context.
     */
    const formSubmitting = useContext(FormSubmitting);

    // #endregion

    // #region Constants

    /**
     * Various colors for the button.
     */
    const baseColor = Color(theme[color] || color);
    const baseColorOpacity80 = baseColor.fade(0.8);
    const baseColorOpacity90 = baseColor.fade(0.9);

    // #endregion

    // #region State

    /**
     * Track whether the button's `onClick` function is running or not.
     */
    const [onClickRunning, setOnClickRunning] = useState(false);

    /**
     * Track the pseudo selectors for the button.
     */
    const [pseudoSelectorProps, pseudoSelectorStates] = usePseudoSelectors();

    // #endregion

    // #region Effects

    // #endregion

    // #region Functions

    /**
     * Augment the `onClick` function.
     */
    const augmentedOnClick = async (event) => {
        setOnClickRunning(true);
        await onClick?.(event);
        setOnClickRunning(false);
    };

    /**
     * Get whether the button is a submit button and the form is submitting.
     */
    const getIsSubmitAndRunning = () => Boolean(!allowMultipleClicks && type === 'submit' && formSubmitting);

    /**
     * Get whether the form is submitting and the button should be disabled.
     */
    const getIsDisabledBecauseFormSubmitting = () => Boolean(disabledOnFormSubmitting && formSubmitting);

    // #endregion

    // #region Variables

    /**
     * Color to use for the background of the button, factoring in disabled and running states.
     */
    const buttonBgColor = (() => {
        if (onClickRunning || disabled) {
            return 'none';
        }

        if (!pseudoSelectorStates.isHovered) {
            return 'none';
        }

        if (pseudoSelectorStates.isPressed && pseudoSelectorStates.isHovered) {
            return baseColorOpacity80;
        }

        return baseColorOpacity90;
    })();

    // #endregion

    // #region Render Functions

    /**
     * Main render.
     */
    return (
        <button
            type={type}
            ref={ref}
            onClick={allowMultipleClicks ? onClick : augmentedOnClick}
            {...pseudoSelectorProps}
            {...passThruProps}
            className={`
                ${localStyles.button}
                ${passThruProps?.className}
            `}
            style={{
                width:      size + size * paddingRatio,
                height:     size + size * paddingRatio,
                background: buttonBgColor,
                ...(passThruProps?.style || {}),
            }}
            disabled={onClickRunning || disabled || getIsSubmitAndRunning() || getIsDisabledBecauseFormSubmitting()}
        >
            {/* RUNNING STATE */}
            <div className={onClickRunning || getIsSubmitAndRunning() ? localStyles.running : localStyles.hidden}>
                <QuarterSpinner
                    size={size}
                    color={disabled ? '#888888' : baseColor.string()}
                />
            </div>
            {/* READY STATE */}
            <div className={onClickRunning || getIsSubmitAndRunning() ? localStyles.hidden : localStyles.ready}>
                <SvgIcon
                    style={{
                        width:  size,
                        height: size,
                        fill:   disabled ? '#888888' : baseColor.string(),
                    }}
                />
            </div>
        </button>
    );

    // #endregion
});

IconButton.propTypes = {
    /**
     * The size of the button.
     */
    size:                     PropTypes.number,
    /**
     * The type of the button.
     */
    type:                     PropTypes.string,
    /**
     * The function to call when the button is clicked.
     */
    onClick:                  PropTypes.func,
    /**
     * Whether the button is disabled or not.
     */
    disabled:                 PropTypes.bool,
    /**
     * The SVG icon to use for the button.
     */
    SvgIcon:                  PropTypes.oneOfType([PropTypes.func, PropTypes.object]).isRequired,
    /**
     * Flag indicating if the button should enter a "running" state that prevents another `onClick` event
     * from being fired until the current `onClick` callback has finished running (if it is async).
     */
    allowMultipleClicks:      PropTypes.bool,
    /**
     * Flag indicating whether the button should be disabled while the parent `Form` component is submitting or not.
     * If this is the "submit" button on the `Form`, then this flag will be ignored, and the condition will be based on
     * whether the `allowMultipleClicks` flag is set to `true` or not.
     */
    disabledOnFormSubmitting: PropTypes.bool,
    /**
     * The color to use for the button. Supports any of the formats listed here: https://www.npmjs.com/package/color-string.
     * You can also specify a theme key, specified in the `StyleManager`'s `theme` prop, to use a theme color.
     */
    color:                    PropTypes.string,
    /**
     * The amount of padding to add, as a ratio of the button's size.
     */
    paddingRatio:             PropTypes.number,
    /**
     * Any additional props to pass through to the internal `button` element.
     *
     * This is not a prop of `passThruProps` -- this is simply a representation of any additional props passed to
     * the `IconButton` component that aren't covered above.
     */
    '...passThruProps':       PropTypes.any,
};

IconButton.defaultProps = {
    size:                     24,
    type:                     'button',
    color:                    'primary',
    allowMultipleClicks:      false,
    paddingRatio:             0.75,
    disabledOnFormSubmitting: false,
};

export default IconButton;
