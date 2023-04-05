import { useContext } from 'react';
import PropTypes from 'prop-types';
import Color from 'color';
import { motion } from 'framer-motion';
import { Theme } from '@contexts';
import Check from '@assets/check.svg';
import { getContrastingBWColor } from '@utils/colors';
import localStyles from './controlled-checkbox.module.scss';

/**
 * A manually controlled checkbox.
 */
function ControlledCheckbox({
    checked,
    onChange,
    label,
    required,
    helperMessage,
    hasError,
    color,
    disabled,
    ariaLabel,
    id,
    darkMode,
    // Specific Component Props
    InputProps,
    LabelProps,
    // Pass Thru Props
    ...passThruProps
}) {
    // #region Context

    /**
     * Use the theme from context.
     */
    const theme = useContext(Theme);

    // #endregion

    // #region Constants

    /**
     * Various colors for the checkbox.
     */
    const baseColor = Color(theme[color] || color);
    const iconColor = getContrastingBWColor(baseColor);

    // #endregion

    // #region State

    // #endregion

    // #region Effects

    // #endregion

    // #region Variables

    /**
     * The value currently stored in the input.
     * @type {boolean}
     */
    const currentValue = checked || false;

    // #endregion

    // #region Functions

    // #endregion

    // #region Render Functions

    /**
     * Main render.
     */
    return (
        <motion.div
            data-display-error={hasError}
            data-disabled={disabled}
            data-dark-mode={darkMode}
            {...passThruProps}
            className={`
                ${passThruProps?.className}
                ${localStyles.checkbox}
            `}
            animate={{ x: hasError ? [0, 10, -10, 10, 0] : 0 }}
            transition={{ duration: 0.4 }}
        >
            <div
                className={localStyles.upperWrapper}
                data-checked={currentValue}
            >
                {
                    label
                        ? (
                            <label {...LabelProps} htmlFor={id}>
                                {label}
                                {required ? ' *' : null}
                            </label>
                        )
                        : null
                }
                <input
                    type="checkbox"
                    checked={currentValue}
                    onChange={onChange}
                    disabled={disabled}
                    id={id}
                    aria-label={ariaLabel}
                    {...InputProps}
                />
                <div className={localStyles.customCheckbox}>
                    <div style={{ background: disabled ? '#bbb' : baseColor }}>
                        <Check style={{ fill: iconColor }} />
                    </div>
                </div>
            </div>
            <p className={localStyles.helperMessage}>
                {helperMessage}
            </p>
        </motion.div>
    );

    // #endregion
}

ControlledCheckbox.propTypes = {
    /**
     * Whether the checkbox is checked or not.
     */
    checked:            PropTypes.bool,
    /**
     * The function to call when the checkbox is checked or unchecked.
     */
    onChange:           PropTypes.func.isRequired,
    /**
     * The label to display for the checkbox.
     */
    label:              PropTypes.string,
    /**
     * Whether or not having this checkbox checked is required in order to submit the form.
     */
    required:           PropTypes.bool,
    /**
     * The helper message to display below the checkbox.
     */
    helperMessage:      PropTypes.string,
    /**
     * Flag indicating if the checkbox has an error.
     */
    hasError:           PropTypes.bool,
    /**
     * The ID to use for the checkbox.
     */
    id:                 PropTypes.string,
    /**
     * The color to use for the checkbox. Supports any of the formats listed here: https://www.npmjs.com/package/color-string.
     * You can also specify a theme key, specified in the `StyleManager`'s `theme` prop, to use a theme color.
     */
    color:              PropTypes.string,
    /**
     * Flag indicating whether the checkbox is disabled.
     */
    disabled:           PropTypes.bool,
    /**
     * Flag indicating whether the checkbox is in dark mode.
     */
    darkMode:           PropTypes.bool,
    /**
     * The aria label to use for the checkbox.
     */
    ariaLabel:          PropTypes.string,
    /**
     * Any props to pass to the internal `input` HTML element.
     */
    InputProps:         PropTypes.object,
    /**
     * Any props to pass to the internal `label` HTML element.
     */
    LabelProps:         PropTypes.object,
    /**
     * The remaining props to spread to the internal `div` HTML element that acts as a
     * root container of the component.
     *
     * This is not a prop of `passThruProps` -- this is simply a representation of any additional props
     * passed to the `div` component that aren't covered above.
     */
    '...passThruProps': PropTypes.any,
};

ControlledCheckbox.defaultProps = {
    required: false,
    color:    'primary',
    disabled: false,
    darkMode: false,
};

export default ControlledCheckbox;
