import { useEffect, useRef, useContext } from 'react';
import { FormData, SetFormData } from '@contexts';

// #region Typedefs

/**
 * The return value of the useFormField hook.
 * @typedef {Object} UseFormFieldAPI
 * @property {Object | undefined} formFieldInfo The current object representing the field in the form
 * @property {function} onChange The function to call when the field value changes; should take in the JS
 * event object generated by the change as the only argument
 */

// #endregion

// #region Hook

/**
 * Used to integrate a custom form field with the `@psionic/ui` Form flow.
 *
 * @param {Object} props The props for the hook, in a JS object
 * @param {string} props.fieldKey The field key for the form field
 * @param {string} props.type The type of the form field
 * @param {*} [props.initialValue] The initial value of the form field
 * @param {boolean} [props.disabled] Whether the form field is disabled or not
 * @param {function} [props.validator] The function to call to validate the form field's current value
 * @param {boolean} [props.required] Whether the form field is required to have a non-false-y value or not
 * @param {string} [props.requiredMessage] The message to display when the form field is required but has
 * a false-y value
 * @returns {}
 */
export default function (
    {
        fieldKey,
        type,
        initialValue,
        disabled,
        validator,
        required,
        requiredMessage,
    } = {},
) {
    // #region Refs

    /**
     * Track a reference to the disabled state of the form field, to ensure it stays up-to-date.
     */
    const disabledRef = useRef(disabled);

    // #endregion

    // #region Context

    /**
     * Use the Form Data from context.
     */
    const formData = useContext(FormData);

    /**
     * Use the Set Form Data API from context.
     */
    const setFormData = useContext(SetFormData);

    // #endregion

    // #region Effects

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

    /**
     * Whenever the `disabled` prop changes, we want to update that flag in the form data.
     */
    useEffect(() => {
        disabledRef.current = disabled;
        setFieldDisabled(disabled);
    }, [disabled]);

    // #endregion

    // #region Functions

    /**
     * On Change handler.
     *
     * @param {*} newValue The new value for the form field
     */
    const onChange = (newValue) => {
        if (disabledRef.current) return;

        switch (type) {
            case 'email':
            case 'password':
            case 'text':
            case 'url':
                setFieldValue(newValue);
                return;
            case 'radio':
                setFieldValue(newValue.currentTarget.value);
                return;
            case 'checkbox':
            case 'icon-checkbox':
            case 'switch':
                setFieldValue(!formData[fieldKey]?.checked);
                return;
            default:
                throw new Error(`Unsupported input of type, ${type}`);
        }
    };

    /**
     * Sets the form's data for the key to the specified value.
     *
     * @param {*} newValue The new value for this field in the form
     */
    const setFieldValue = (newValue) => {
        const message = getHelperMessageForValue(newValue);

        const fieldInfo = (() => {
            switch (type) {
                case 'email':
                case 'password':
                case 'text':
                case 'url':
                case 'radio':
                    return {
                        type,
                        required:                      Boolean(required),
                        value:                         newValue,
                        message:                       disabled ? null : message,
                        valid:                         disabled ? true : !message,
                        unmodifiedSinceLastSubmission: false,
                        disabled:                      disabledRef.current,
                    };
                case 'checkbox':
                    return {
                        type,
                        required:                      Boolean(required),
                        checked:                       newValue,
                        message:                       disabled ? null : message,
                        valid:                         disabled ? true : !message,
                        unmodifiedSinceLastSubmission: false,
                        disabled:                      disabledRef.current,
                        _requiredMessage:              requiredMessage,
                    };
                case 'icon-checkbox':
                case 'switch':
                    return {
                        type,
                        checked:  newValue,
                        valid:    true,
                        disabled: disabledRef.current,
                    };
                default:
                    throw new Error(`Unsupported input of type, ${type}`);
            }
        })();

        setFormData((prev) => ({
            ...prev,
            [fieldKey]: fieldInfo,
        }));
    };

    /**
     * Gets the helper message to display for the given value.
     *
     * @param {*} value The value to get the helper message for
     * @returns {string | null} The appropriate helper message to display, or `null`
     * if no helper message should be displayed
     */
    const getHelperMessageForValue = (value) => {
        if (required && !value) {
            return requiredMessage || 'This field is required';
        } if (validator) {
            return validator(value);
        }
        return null;
    };

    /**
     * Sets the field's `disabled` flag in the form's data to the specified value.
     *
     * @param {boolean} disabledValue The new value for the field's `disabled` flag
     */
    const setFieldDisabled = (disabledValue) => {
        setFormData((prev) => ({
            ...prev,
            [fieldKey]: {
                ...(prev[fieldKey] || {}),
                disabled: disabledValue,
            },
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

    // #endregion

    // #region API Return

    return [
        formData[fieldKey],
        onChange,
    ];

    // #endregion
}

// #endregion

// #region Helper Functions

// #endregion
