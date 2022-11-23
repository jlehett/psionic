import { useContext, useMemo, useEffect } from 'react';
import PropTypes from 'prop-types';
import Color from 'color';
import { motion } from 'framer-motion';
import Check from '@assets/check.svg';
import { FormData, SetFormData } from '@contexts';
import { getContrastingBWColor } from '@utils/colors';
import localStyles from './checkbox.module.scss';

/**
 * Replace this with a comment describing the component.
 */
const Checkbox = ({
    initialValue,
    label,
    fieldKey,
    required,
    requiredMessage,
    color,
    // Specific Component Props
    InputProps,
    LabelProps,
    // Pass Thru Props
    ...passThruProps
}) => {

    //#region Constants

    /**
     * Various colors for the checkbox.
     */
    const baseColor = Color(color);
    const iconColor = getContrastingBWColor(baseColor);

    //#endregion

    //#region Context

    /**
     * Use the Form Data from context.
     */
    const formData = useContext(FormData);

    /**
     * Use the Set Form Data API from context.
     */
    const setFormData = useContext(SetFormData);

    //#endregion

    //#region State

    //#endregion

    //#region Effects

    /**
     * When the component first mounts, add its data to the form data context.
     * When the component unmounts, remove its data from the form data context.
     */
    useEffect(() => {
        // On Mount
        setFieldValue(initialValue);

        // Before Unmount
        return () => deleteField();
    }, []);

    //#endregion

    //#region Memoized Values

    /**
     * Memoized value that is currently stored in the input.
     * @type {boolean}
     */
    const currentValue = useMemo(() => {
        return formData[fieldKey]?.checked || false;
    }, [formData, fieldKey]);

    /**
     * Memoized helper message that is currently stored in the input's info.
     * @type {string | null}
     */
    const currentHelperMessage = useMemo(() => {
        const formInfo = formData[fieldKey];
        return formInfo?.unmodifiedSinceLastSubmission ? formInfo?.message : null;
    }, [formData, fieldKey]);

    /**
     * Memoized flag indicating whether the value currently stored in the input is valid.
     * @type {boolean}
     */
    const currentValidity = useMemo(() => {
        return formData[fieldKey]?.valid;
    }, [formData, fieldKey]);

    /**
     * Memoized flag indicating whether the field is unmodified since the last form submission or not.
     * @type {boolean}
     */
    const unmodifiedSinceLastSubmission = useMemo(() => {
        return formData[fieldKey]?.unmodifiedSinceLastSubmission;
    }, [formData, fieldKey]);

    //#endregion

    //#region Functions

    /**
     * On Change handler.
     */
    const onChange = () => {
        setFieldValue(!currentValue);
    };

    /**
     * Sets the form's data for this field key to the specified value.
     *
     * @param {boolean} newValue The new value for this checkbox in the form
     */
    const setFieldValue = (newValue) => {
        const message = required && !newValue ? requiredMessage : null;

        const fieldInfo = {
            type: 'checkbox',
            required: Boolean(required),
            checked: newValue,
            message,
            valid: !Boolean(message),
            unmodifiedSinceLastSubmission: false,
            _requiredMessage: requiredMessage,
        };

        setFormData((prev) => ({
            ...prev,
            [fieldKey]: fieldInfo,
        }));
    };

    /**
     * Deletes the form's data for the key.
     */
    const deleteField = () => {
        setFormData((prev) => {
            delete prev[fieldKey];
            return prev;
        });
    };

    //#endregion

    //#region Render Functions

    /**
     * Main render.
     */
    return (
        <motion.div
            data-display-error={!currentValidity && unmodifiedSinceLastSubmission}
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
                onClick={onChange}
                data-checked={currentValue}
            >
                <label {...LabelProps}>
                    {label}{required ? ' *' : null}
                </label>
                <input
                    type="checkbox"
                    checked={currentValue}
                    onChange={onChange}
                    {...InputProps}
                />
                <div className={localStyles.customCheckbox}>
                    <div style={{ background: baseColor }}>
                        <Check style={{ fill: iconColor }}/>
                    </div>
                </div>
            </div>
            <p className={localStyles.helperMessage}>
                {currentHelperMessage}
            </p>
        </motion.div>
    );

    //#endregion
};

Checkbox.propTypes = {
    /**
     * The initial value of the checkbox.
     */
    initialValue: PropTypes.bool,
    /**
     * The label to display for the checkbox.
     */
    label: PropTypes.string.isRequired,
    /**
     * The key to use to represent this checkbox in the parent form. This should be unique
     * among all fields in the individual form.
     */
    fieldKey: PropTypes.string.isRequired,
    /**
     * Whether or not having this checkbox checked is required in order to submit the form.
     */
    required: PropTypes.bool,
    /**
     * The message to display if the checkbox is required but not checked when the form is submitted.
     */
    requiredMessage: PropTypes.string,
    /**
     * The color to use for the checkbox. Supports any of the formats listed here: https://www.npmjs.com/package/color-string.
     */
    color: PropTypes.string,
    /**
     * Any props to pass to the internal `input` HTML element.
     */
    InputProps: PropTypes.object,
    /**
     * Any props to pass to the internal `label` HTML element.
     */
    LabelProps: PropTypes.object,
    /**
     * The remaining props to spread to the internal `div` HTML element that acts as a
     * root container of the component.
     *
     * This is not a prop of `passThruProps` -- this is simply a representation of any additional props
     * passed to the `div` component that aren't covered above.
     */
    "...passThruProps": PropTypes.any,
};

Checkbox.defaultProps = {
    initialValue: false,
    required: false,
    requiredMessage: 'This field is required',
    color: '#0072E5',
};

export default Checkbox;