import { useContext, useState } from 'react';
import PropTypes from 'prop-types';
import { cloneDeep } from 'lodash';
import { FormData, SetFormData } from '@contexts';
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
export const Form = ({
    children,
    onSubmit,
    // Pass-thru Props
    ...passThruProps
}) => {

    //#region Constants

    //#endregion

    //#region Context

    /**
     * Use the form data from context.
     */
    const formData = useContext(FormData);

    //#endregion

    //#region State

    //#endregion

    //#region Effects

    //#endregion

    //#region Functions

    /**
     * Handle the `onSubmit` event for the form.
     */
    const submitHandler = (event) => {
        // Prevent whatever default logic the event has
        event.preventDefault();

        // Call the passed-in `onSubmit` callback while passing through the form's data from context.
        // We have to deep clone the form data to ensure that modifications to the form don't affect the handler.
        onSubmit(cloneDeep(formData));
    }

    //#endregion

    //#region Render Functions

    /**
     * Main render.
     */
    return (
        <form
            onSubmit={submitHandler}
            {...passThruProps}
        >
            {children}
        </form>
    );

    //#endregion
};

Form.propTypes = {
    /**
     * The children to render as part of the form.
     */
    children: PropTypes.any,
    /**
     * The callback for when the form is submitted. This callback should take in an Object
     * that maps field keys (from inputs in this library, such as TextField) to the values
     * they held at the time the form was submitted.
     *
     * The submission of the form can be done through a `<button type="submit">` component
     * like a normal HTML form element.
     */
    onSubmit: PropTypes.func.isRequired,
    /**
     * The remaining props to spread to the internal `form` HTML element.
     */
    passThruProps: PropTypes.object,
};

Form.defaultProps = {

};

/**
 * Wraps the Form component in the necessary context providers to handle the form values internally.
 */
const FormWrapper = (props) => {
    const [formData, setFormData] = useState({});

    return (
        <FormData.Provider value={formData}>
            <SetFormData.Provider value={setFormData}>
                <Form {...props}/>
            </SetFormData.Provider>
        </FormData.Provider>
    );
};

export default FormWrapper;