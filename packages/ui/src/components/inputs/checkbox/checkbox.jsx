import { useContext } from 'react';
import PropTypes from 'prop-types';
import Color from 'color';
import { motion } from 'framer-motion';
import { Theme } from '@contexts';
import Check from '@assets/check.svg';
import { getContrastingBWColor } from '@utils/colors';
import { useFormField } from '@hooks/forms';
import localStyles from './checkbox.module.scss';

/**
 * A checkbox that can be used in `@psionic/ui`'s `Form` component.
 */
function Checkbox({
    initialValue,
    label,
    fieldKey,
    required,
    requiredMessage,
    color,
    disabled,
    ariaLabel,
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

    // #region Misc Hooks

    /**
     * Use the form field hook.
     */
    const [
        formField,
        onChange,
    ] = useFormField({
        fieldKey,
        initialValue,
        type: 'checkbox',
        disabled,
        required,
        requiredMessage,
    });

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
    const currentValue = formField?.checked || false;

    /**
     * Helper message that is currently stored in the input's info.
     * @type {string | null}
     */
    const currentHelperMessage = formField?.unmodifiedSinceLastSubmission ? formField?.message : null;

    /**
     * Flag indicating whether the value currently stored in the input is valid.
     * @type {boolean}
     */
    const currentValidity = formField?.valid;

    /**
     * Flag indicating whether the field is unmodified since the last form submission or not.
     * @type {boolean}
     */
    const unmodifiedSinceLastSubmission = formField?.unmodifiedSinceLastSubmission;

    // #endregion

    // #region Functions

    // #endregion

    // #region Render Functions

    /**
     * Main render.
     */
    return (
        <motion.div
            data-display-error={!currentValidity && unmodifiedSinceLastSubmission}
            data-dark-mode={darkMode}
            data-disabled={disabled}
            {...passThruProps}
            className={`
                ${passThruProps?.className}
                ${localStyles.checkbox}
            `}
            animate={{ x: !currentValidity && unmodifiedSinceLastSubmission ? [0, 10, -10, 10, 0] : 0 }}
            transition={{ duration: 0.4 }}
        >
            <div
                className={localStyles.upperWrapper}
                data-checked={currentValue}
            >
                {
                    label
                        ? (
                            <label {...LabelProps} htmlFor={fieldKey}>
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
                    id={fieldKey}
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
                {currentHelperMessage}
            </p>
        </motion.div>
    );

    // #endregion
}

Checkbox.propTypes = {
    /**
     * The initial value of the checkbox.
     */
    initialValue:       PropTypes.bool,
    /**
     * The label to display for the checkbox.
     */
    label:              PropTypes.string,
    /**
     * The key to use to represent this checkbox in the parent form. This should be unique
     * among all fields in the individual form.
     */
    fieldKey:           PropTypes.string.isRequired,
    /**
     * Whether or not having this checkbox checked is required in order to submit the form.
     */
    required:           PropTypes.bool,
    /**
     * The message to display if the checkbox is required but not checked when the form is submitted.
     */
    requiredMessage:    PropTypes.string,
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
     * The aria label to use for the checkbox.
     */
    ariaLabel:          PropTypes.string,
    /**
     * Flag indicating whether the component should use dark mode colors.
     */
    darkMode:           PropTypes.bool,
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

Checkbox.defaultProps = {
    initialValue:    false,
    required:        false,
    requiredMessage: 'This field is required',
    color:           'primary',
    disabled:        false,
    darkMode:        false,
};

export default Checkbox;
