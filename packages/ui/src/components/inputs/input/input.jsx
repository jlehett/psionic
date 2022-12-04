import { useEffect, useMemo, useContext } from 'react';
import PropTypes from 'prop-types';
import { FormData, SetFormData } from '@contexts';
import { useFormField } from '@hooks/forms';
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
    disabled,
    // Pass Thru Props
    ...passThruProps
}) => {

    //#region Constants

    //#endregion

    //#region Misc Hooks

    const [
        formField,
        onChange
    ] = useFormField({
        fieldKey,
        type,
        initialValue,
        disabled,
        validator,
        required,
    });

    //#endregion

    //#region State

    //#endregion

    //#region Effects

    //#endregion

    //#region Memoized Values

    //#endregion

    //#region Functions

    //#endregion

    //#region Render Functions

    /**
     * Main render.
     */
    return (
        <input
            type={type}
            value={formField?.value}
            onChange={onChange}
            disabled={disabled}
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
     * Flag indicating whether the input is disabled.
     */
    disabled: PropTypes.bool,
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
    disabled: false,
};

export default Input;