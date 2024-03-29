import {
    useContext, useEffect, useState, useImperativeHandle, forwardRef,
} from 'react';
import PropTypes from 'prop-types';
import { cloneDeep, initial } from 'lodash';
import {
    FormData, SetFormData, FormSubmitting, SetFormSubmitting,
} from '@contexts';
import {
    CircularSpinner,
} from '@components/loaders';
import localStyles from './form.module.scss';

/**
 * A wrapper for the native HTML `form` element, which makes it easier to use
 * uncontrolled inputs from the `@psionic/ui` library.
 *
 * This works like a normal React HTML form with the following exception:
 *
 *  - The `onSubmit` callback function should take in an object that maps the keys
 * of input fields within the form to the data they held at the time the form was
 * submitted.
 *
 * The form can be submitted like a normal React HTML form with a
 * `<button type="submit">` HTML element.
 */
export const Form = forwardRef(({
    children,
    onSubmit,
    onChange,
    initialFormData,
    // Pass-thru Props
    ...passThruProps
}, ref) => {
    // #region Constants

    // #endregion

    // #region Context

    /**
     * Use the form data from context.
     */
    const formData = useContext(FormData);

    /**
     * Use the set form data API from context.
     */
    const setFormData = useContext(SetFormData);

    /**
     * Use the set form submitting API from context.
     */
    const setFormSubmitting = useContext(SetFormSubmitting);

    // #endregion

    // #region State

    /**
     * Track whether the form's initial data has loaded yet.
     */
    const [initialDataLoaded, setInitialDataLoaded] = useState(false);

    // #endregion

    // #region Effects

    /**
     * When the component first mounts, load the initial form data.
     */
    useEffect(() => {
        if (initialFormData) {
            setFormData(initialFormData);
        }
        setInitialDataLoaded(true);
    }, []);

    /**
     * Whenever the form data changes, call the `onChange` callback, if one was provided.
     */
    useEffect(() => {
        // If the initial data hasn't loaded yet, don't do anything
        if (!initialDataLoaded) return;

        onChange?.(cloneDeep(formData));
    }, [formData, initialDataLoaded]);

    // #endregion

    // #region Imperative Handle

    /**
     * Create an imperative handle for updating the form data directly.
     */
    useImperativeHandle(
        ref,
        () => ({
            // Function for updating the form data
            setFormData,
        }),
    );

    // #endregion

    // #region Functions

    /**
     * Handle the `onSubmit` event for the form.
     *
     * @param {Event} event The DOM Event from the submit event
     */
    const submitHandler = async (event) => {
        // Prevent whatever default logic the event has
        event.preventDefault();

        // Mark the form as submitting
        setFormSubmitting(true);

        // Mark all of the fields in the form as unmodified since last submission
        setFormData((prev) => {
            const newData = cloneDeep(prev);

            for (const fieldInfo of Object.values(newData)) {
                fieldInfo.unmodifiedSinceLastSubmission = true;
            }

            return newData;
        });

        // If any of the fields in the form are marked as invalid (and are not disabled) don't continue with the submission
        for (const [fieldKey, fieldInfo] of Object.entries(formData)) {
            if (!fieldInfo.valid && !fieldInfo.disabled) {
                setFormSubmitting(false);
                return;
            }
        }

        // Call the passed-in `onSubmit` callback while passing through the form's data from context.
        // We have to deep clone the form data to ensure that modifications to the form don't affect the handler.
        await onSubmit(cloneDeep(formData));

        // Mark the form as no longer submitting
        setFormSubmitting(false);
    };

    /**
     * Handle the `onReset` event for the form.
     *
     * @param {Event} event The DOM Event from the reset event
     */
    const resetHandler = (event) => {
        // Prevent whatever default logic the event has
        event.preventDefault();

        // Reset the data in the form
        setFormData((prev) => {
            const newData = cloneDeep(prev);

            for (const [fieldKey, fieldInfo] of Object.entries(newData)) {
                // If the field is disabled, skip this
                if (fieldInfo.disabled) continue;

                // Type-specific updates
                switch (fieldInfo.type) {
                    case 'text':
                    case 'password':
                    case 'email':
                    case 'url':
                        fieldInfo.value = '';
                        break;
                    case 'checkbox':
                    case 'icon-checkbox':
                    case 'switch':
                        fieldInfo.checked = false;
                        break;
                    case 'radio':
                        fieldInfo.value = null;
                        break;
                    default:
                        throw new Error(`Unsupported form field type of ${fieldInfo?.type} found!`);
                }

                // General updates
                if (fieldInfo.required) {
                    fieldInfo.message = fieldInfo._requiredMessage || 'This field is required';
                    fieldInfo.valid = false;
                }
                fieldInfo.unmodifiedSinceLastSubmission = false;
            }

            return newData;
        });
    };

    // #endregion

    // #region Render Functions

    /**
     * Main render.
     */
    return (
        <form
            onSubmit={submitHandler}
            onReset={resetHandler}
            {...passThruProps}
        >
            {children}
        </form>
    );

    // #endregion
});

Form.propTypes = {
    /**
     * The children to render as part of the form.
     */
    children:           PropTypes.any,
    /**
     * The callback for when the form is submitted. This callback should take in an Object
     * that maps field keys (from inputs in this library, such as TextField) to the values
     * they held at the time the form was submitted.
     *
     * The submission of the form can be done through a `<button type="submit">` component
     * like a normal HTML form element.
     *
     * If any of the fields in the form are marked as invalid (either through an empty field
     * with a `required` prop, or due to a `validator` prop for the field), the `onSubmit`
     * callback will NOT be called.
     */
    onSubmit:           PropTypes.func,
    /**
     * Optionally pass a callback to the form which will be called everytime any of the form's
     * data changes. This callback should take in an Object that maps field keys (from inputs in
     * this library, such as TextField) to the values they held at the time the form updated.
     */
    onChange:           PropTypes.func,
    /**
     * The initial data to populate the form with. This should be of the same format as the argument that
     * the `onChange` prop takes in.
     */
    initialFormData:    PropTypes.object,
    /**
     * The remaining props to spread to the internal `form` HTML element.
     *
     * This is not a prop of `passThruProps` -- this is simply a representation of any
     * additional props passed to the `Form` component that aren't covered above.
     */
    '...passThruProps': PropTypes.any,
};

Form.defaultProps = {

};

/**
 * Wraps the Form component in the necessary context providers to handle the form values internally.
 */
const FormWrapper = forwardRef((props, ref) => {
    const [formData, setFormData] = useState({});
    const [formSubmitting, setFormSubmitting] = useState(false);

    return (
        <FormSubmitting.Provider value={formSubmitting}>
            <SetFormSubmitting.Provider value={setFormSubmitting}>
                <FormData.Provider value={formData}>
                    <SetFormData.Provider value={setFormData}>
                        <Form ref={ref} {...props} />
                    </SetFormData.Provider>
                </FormData.Provider>
            </SetFormSubmitting.Provider>
        </FormSubmitting.Provider>
    );
});

export default FormWrapper;
