import { useEffect, useMemo, useContext } from 'react';
import PropTypes from 'prop-types';
import { FormData, SetFormData } from '@contexts';
import localStyles from './input.module.scss';

/**
 * An unstyled input element that can interface with the `@psionic/ui` Form flow.
 */
const Input = ({
    initialValue,
    fieldKey,
    type,
    required,
    validator,
    // Pass Thru Props
    ...passThruProps
}) => {

    //#region Constants

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
     * @type {string}
     */
    const currentValue = useMemo(() => {
        return formData[fieldKey]?.value || '';
    }, [formData, fieldKey]);

    //#region Functions

    /**
     * On Change handler.
     *
     * @param {Event} event The DOM Event sent through the `onChange` handler
     */
    const onChange = (event) => {
        // Update the form data with the new value
        setFieldValue(event.target.value);
    };

    /**
     * Gets the helper message to display for the given value.
     *
     * @param {string} value The value to get the helper message for
     * @returns {string | null} The appropriate helper message to display, or `null`
     * if no helper message should be displayed
     */
    const getHelperMessageForValue = (value) => {
        if (required && !value) {
            return 'This field is required';
        } else if (validator) {
            return validator(value);
        } else {
            return null;
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
                    return {
                        type,
                        required: Boolean(required),
                        value: newValue,
                        message,
                        valid: !Boolean(message),
                        unmodifiedSinceLastSubmission: false,
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
        <input
            type={type}
            value={currentValue}
            onChange={onChange}
            {...passThruProps}
        />
    );

    //#endregion
};

Input.propTypes = {
    /**
     * The initial value that the input should hold.
     */
    initialValue: PropTypes.any,
    /**
     * The key to use to represent the field in the parent form. This should be unique
     * among all fields in the individual form.
     */
    fieldKey: PropTypes.string.isRequired,
    /**
     * The type of input field this is.
     */
    type: PropTypes.oneOf([
        'button',
        'checkbox',
        'color',
        'date',
        'datetime-local',
        'email',
        'file',
        'hidden',
        'image',
        'month',
        'number',
        'password',
        'radio',
        'range',
        'reset',
        'search',
        'submit',
        'tel',
        'text',
        'time',
        'url',
        'week'
    ]),
    /**
     * Flag indicating whether this input field is required or not.
     */
    required: PropTypes.bool,
    /**
     * Custom validation function that runs anytime the field updates. The return of
     * this validator will be stored as the `message` value in the field's info on the
     * Form's `onSubmit` callback param.
     */
    validator: PropTypes.func,
    /**
     * The remaining props to spread to the internal `input` HTML element.
     *
     * This is not a prop of `passThruProps` -- this is simply a representation of any
     * additional props passed to the `Input` component that aren't covered above.
     */
    "...passThruProps": PropTypes.any,
};

Input.defaultProps = {
    required: false,
};

export default Input;