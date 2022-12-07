import { useState } from 'react';
import PropTypes from 'prop-types';
import Color, { rgb } from 'color';
import { motion } from 'framer-motion';
import { RadioGroupContext } from '@contexts';
import { useFormField } from '@hooks/forms';
import localStyles from './radio-group.module.scss';

/**
 * Replace this with a comment describing the component.
 */
const RadioGroup = ({
    initialValue,
    fieldKey,
    disabled,
    color,
    label,
    required,
    requiredMessage,
    children,
    // Pass-thru props
    ...passThruProps
}) => {

    //#region Constants

    /**
     * Various colors for the radio group.
     */
    const baseColor = Color(color);

    //#endregion

    //#region State

    /**
     * Track whether the component is being hovered.
     */
    const [isHovered, setIsHovered] = useState(false);

    //#endregion

    //#region Effects

    //#endregion

    //#region Misc Hooks

    /**
     * Use the form field hook.
     */
    const [
        formField,
        onChange
    ] = useFormField({
        fieldKey,
        type: 'radio',
        initialValue,
        required,
        requiredMessage,
        disabled,
    });

    //#endregion

    //#region Functions

    //#endregion

    //#region Variables

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

    //#endregion

    //#region Render Functions

    /**
     * Main render.
     */
    return (
        <RadioGroupContext.Provider
            value={{
                formField,
                onChange,
                disabled,
                color,
            }}
        >
            <motion.div
                data-display-error={!currentValidity && unmodifiedSinceLastSubmission}
                data-disabled={disabled}
                {...passThruProps}
                className={`
                    ${localStyles.radioGroup}
                    ${passThruProps?.className}
                `}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
                animate={{ x: !currentValidity && unmodifiedSinceLastSubmission ? [0, 10, -10, 10, 0] : 0 }}
                transition={{ duration: 0.4 }}
            >
                {
                    label
                        ? (
                            <label
                                style={{
                                    color: !currentValidity && unmodifiedSinceLastSubmission
                                        ? 'rgb(211, 47, 47)'
                                        : disabled
                                        ? 'rgba(0, 0, 0, 0.4)'
                                        : isHovered
                                        ? baseColor
                                        : 'rgba(0, 0, 0, 0.6)'
                                }}
                            >
                                {label}{required ? ' *' : null}
                            </label>
                        )
                        : null
                }
                <ul className={localStyles.radioGroup}>
                    {children}
                </ul>
                {
                    required
                        ? (
                            <p className={localStyles.helperMessage}>
                                {currentHelperMessage}
                            </p>
                        )
                        : null
                }
            </motion.div>
        </RadioGroupContext.Provider>
    );

    //#endregion
};

RadioGroup.propTypes = {
    /**
     * The initial value of the radio group. If set, it should correspond to one of the radio group's `Radio`
     * childrens' values.
     */
    initialValue: PropTypes.any,
    /**
     * The key to use for the field in the form.
     */
    fieldKey: PropTypes.string.isRequired,
    /**
     * Flag indicating whether the radio group is disabled or not.
     */
    disabled: PropTypes.bool,
    /**
     * The color to use for the radio group. Supports any of the formats listed here: https://www.npmjs.com/package/color-string.
     */
    color: PropTypes.string,
    /**
     * The label to use for the radio group.
     */
    label: PropTypes.string,
    /**
     * Flag indicating whether the radio group is required or not.
     */
    required: PropTypes.bool,
    /**
     * The message to display if the radio group is required and the user does not have a value selected after attempting
     * to submit the form.
     */
    requiredMessage: PropTypes.string,
    /**
     * Any children to render inside the radio group. Should have at least one `Radio` child.
     */
    children: PropTypes.any.isRequired,
    /**
     * The remaining props to spread to the internal `div` HTML element that acts as a root container
     * of the component.
     *
     * This is not a prop of `passThruProps` -- this is simply a representation of any additional props
     * passed to the `RadioGroup` component that aren't covered above.
     */
    "...passThruProps": PropTypes.any,
};

RadioGroup.defaultProps = {
    color: '#0072E5',
    disabled: false,
    required: false,
};

export default RadioGroup;