import { useContext, useMemo } from 'react';
import PropTypes from 'prop-types';
import { motion } from 'framer-motion';
import { FormData } from '@contexts';
import { Input } from '@components/inputs';
import localStyles from './checkbox.module.scss';

/**
 * Replace this with a comment describing the component.
 */
const Checkbox = ({
    initialValue,
    label,
    fieldKey,
    required,
}) => {

    //#region Constants

    //#endregion

    //#region Context

    /**
     * Use the Form Data from context.
     */
    const formData = useContext(FormData);

    //#endregion

    //#region State

    //#endregion

    //#region Effects

    //#endregion

    //#region Memoized Values

    /**
     * Memoized value that is currently stored in the input.
     * @type {boolean}
     */
    const currentValue = useMemo(() => {
        return formData[fieldKey]?.value;
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

    //#endregion

    //#region Render Functions

    /**
     * Main render.
     */
    return (
        <Input
            className={localStyles.checkbox}
            type="checkbox"
            initialValue={initialValue}
            fieldKey={fieldKey}
            required={required}
        />
    );

    //#endregion
};

Checkbox.propTypes = {

};

Checkbox.defaultProps = {

};

export default Checkbox;