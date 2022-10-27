import { useContext, useEffect } from 'react';
import PropTypes from 'prop-types';
import { FormData, SetFormData } from '@contexts';
import localStyles from './text-field.module.scss';

/**
 * Replace this with a comment describing the component.
 */
const TextField = ({
    initialValue,
    label,
    fieldKey,
    type,
    // Specific Component Props
    InputProps,
    LabelProps,
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

    //#region Functions

    /**
     * On Change handler.
     *
     * @param {Event} event The DOM Event sent through the `onChange` handler
     */
    const onChange = (event) => {
        console.log('OHHH', event.target.value);
        // Update the form data with the new value
        setFieldValue(event.target.value);
    };

    /**
     * Sets the form's data for the key to the specified value.
     *
     * @param {*} newValue The new value form this field in the form
     */
    const setFieldValue = (newValue) => {
        setFormData((prev) => ({
            ...prev,
            [fieldKey]: {
                value: newValue,
                message: null,
                valid: true,
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

    //#endregion

    //#region Render Functions

    /**
     * Main render.
     */
    return (
        <input
            type={type}
            value={formData[fieldKey]?.value || initialValue}
            onChange={onChange}
            {...InputProps}
        />
    );

    //#endregion
};

TextField.propTypes = {

};

TextField.defaultProps = {
    initialValue: '',
};

export default TextField;