import { useMemo, useContext } from 'react';
import PropTypes from 'prop-types';
import Color from 'color';
import { motion } from 'framer-motion';
import { ControlledRadioGroupContext, Theme } from '@contexts';
import { useFormField } from '@hooks/forms';
import { usePseudoSelectors } from '@hooks/interactions';
import localStyles from './controlled-radio-group.module.scss';

/**
 * A manually controlled wrapper for a group of radio buttons.
 */
function ControlledRadioGroup({
    value,
    onChange,
    disabled,
    color,
    label,
    required,
    helperMessage,
    hasError,
    children,
    id,
    // Pass-thru props
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
     * Various colors for the radio group.
     */
    const baseColor = Color(theme[color] || color);

    // #endregion

    // #region State

    /**
     * Track the pseudo selectors for the radio group.
     */
    const [pseudoSelectorProps, pseudoSelectorStates] = usePseudoSelectors();

    // #endregion

    // #region Effects

    // #endregion

    // #region Memoized Values

    const radioGroupContextValue = useMemo(() => ({
        selectedValue: value,
        onChange,
        hasError,
        disabled,
        color,
        radioGroupID:  id,
    }), [value, onChange, hasError, disabled, color]);

    // #endregion

    // #region Functions

    // #endregion

    // #region Render Functions

    /**
     * Main render.
     */
    return (
        <ControlledRadioGroupContext.Provider
            value={radioGroupContextValue}
        >
            <motion.fieldset
                data-display-error={hasError}
                data-disabled={disabled}
                {...passThruProps}
                className={`
                    ${localStyles.fieldSet}
                    ${passThruProps?.className}
                `}
                {...pseudoSelectorProps}
                animate={{ x: hasError ? [0, 10, -10, 10, 0] : 0 }}
                transition={{ duration: 0.4 }}
            >
                {
                    label
                        ? (
                            <legend
                                style={{
                                    color: hasError
                                        ? 'rgb(211, 47, 47)'
                                        : disabled
                                            ? 'rgba(0, 0, 0, 0.4)'
                                            : pseudoSelectorStates.isHovered
                                                ? baseColor
                                                : 'rgba(0, 0, 0, 0.6)',
                                }}
                            >
                                {label}
                                {required ? ' *' : null}
                            </legend>
                        )
                        : null
                }
                <div className={localStyles.radioGroup}>
                    {children}
                </div>
                {
                    helperMessage
                        ? (
                            <p className={localStyles.helperMessage}>
                                {helperMessage}
                            </p>
                        )
                        : null
                }
            </motion.fieldset>
        </ControlledRadioGroupContext.Provider>
    );

    // #endregion
}

ControlledRadioGroup.propTypes = {
    /**
     * The current value of the radio group.
     */
    value:              PropTypes.any,
    /**
     * The callback to call when the value of the radio group changes.
     */
    onChange:           PropTypes.func.isRequired,
    /**
     * Flag indicating whether the radio group is disabled or not.
     */
    disabled:           PropTypes.bool,
    /**
     * The color to use for the radio group. Supports any of the formats listed here: https://www.npmjs.com/package/color-string.
     * You can also specify a theme key, specified in the `StyleManager`'s `theme` prop, to use a theme color.
     */
    color:              PropTypes.string,
    /**
     * The label to use for the radio group.
     */
    label:              PropTypes.string,
    /**
     * Flag indicating whether the radio group is required or not.
     */
    required:           PropTypes.bool,
    /**
     * The helper message to display below the radio group.
     */
    helperMessage:      PropTypes.string,
    /**
     * Flag indicating whether the radio group has an error or not.
     */
    hasError:           PropTypes.bool,
    /**
     * Any children to render inside the radio group. Should have at least one `Radio` child.
     */
    children:           PropTypes.any.isRequired,
    /**
     * The ID to use for the radio group; should be unique, as it will also define the "name"
     * to group the radio buttons under.
     */
    id:                 PropTypes.string.isRequired,
    /**
     * The remaining props to spread to the internal `div` HTML element that acts as a root container
     * of the component.
     *
     * This is not a prop of `passThruProps` -- this is simply a representation of any additional props
     * passed to the `RadioGroup` component that aren't covered above.
     */
    '...passThruProps': PropTypes.any,
};

ControlledRadioGroup.defaultProps = {
    color:    'primary',
    disabled: false,
    required: false,
};

export default ControlledRadioGroup;
