import { useContext, useEffect, useMemo, useState } from 'react';
import PropTypes from 'prop-types';
import { motion } from 'framer-motion';
import { FormData } from '@contexts';
import { StickyTooltip } from '@components/accessibility';
import { Input } from '@components/inputs';
import Visibility from '@assets/visibility.svg';
import VisibilityOff from '@assets/visibility-off.svg';
import localStyles from './text-field.module.scss';

/**
 * A general text field with a label that can be used in `@psionic/ui`'s `Form`
 * component.
 */
const TextField = ({
    initialValue,
    label,
    fieldKey,
    type,
    required,
    validator,
    // Specific Component Props
    InputProps,
    LabelProps,
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

    //#endregion

    //#region State

    /**
     * Control whether any hidden text is being shown or not.
     */
    const [showHiddenText, setShowHiddenText] = useState(false);

    /**
     * Track whether the input is focused.
     */
    const [isFocused, setIsFocused] = useState(false);

    //#endregion

    //#region Effects

    //#endregion

    //#region Memoized Values

    /**
     * Memoized value that is currently stored in the input.
     * @type {string}
     */
    const currentValue = useMemo(() => {
        return formData[fieldKey]?.value;
    }, [formData, fieldKey]);

    /**
     * Memoized string representing the type to use for the internal input element. If the
     * given input type is a password, we may want to represent it with a text input if the
     * show password button has been clicked.
     * @type {string}
     */
    const inputTypeToUse = useMemo(() => {
        if (type !== 'password') return type;

        return showHiddenText ? 'text' : 'password';
    }, [type, showHiddenText]);

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
        <div
            data-display-error={!currentValidity && unmodifiedSinceLastSubmission}
            data-is-focused={isFocused}
            {...passThruProps}
            className={`
                ${passThruProps?.className}
                ${localStyles.textField}
            `}
        >
            <motion.div
                initial={{ top: currentValue ? '0px' : '37x' }}
                animate={{ top: currentValue ? '0px' : '37px' }}
                className={localStyles.labelWrapper}
            >
                <label {...LabelProps}>
                    {label}{required ? ' *' : null}</label>
            </motion.div>
            <div className={localStyles.inputWrapper}>
                <Input
                    type={inputTypeToUse}
                    initialValue={initialValue}
                    fieldKey={fieldKey}
                    required={required}
                    validator={validator}
                    onFocus={() => setIsFocused(true)}
                    onBlur={() => setIsFocused(false)}
                    {...InputProps}
                />
                {
                    type !== 'password'
                        ? null
                        : (
                            <StickyTooltip
                                content={showHiddenText ? 'Hide Password' : 'Show Password'}
                                delay={1000}
                            >
                                <button type="button" onClick={() => setShowHiddenText(prev => !prev)}>
                                    { showHiddenText ? <Visibility/> : <VisibilityOff/> }
                                </button>
                            </StickyTooltip>
                        )
                }
            </div>
            <p className={localStyles.helperMessage}>
                {currentHelperMessage}
            </p>
        </div>
    );

    //#endregion
};

TextField.propTypes = {
    /**
     * The initial value for the text field.
     */
    initialValue: PropTypes.string,
    /**
     * The label to display above the text field.
     */
    label: PropTypes.string.isRequired,
    /**
     * The key to use to represent the field in the parent form. This should be unique
     * among all fields in the individual form.
     */
    fieldKey: PropTypes.string.isRequired,
    /**
     * The type of text field this is.
     */
    type: PropTypes.oneOf([
        'email',
        'password',
        'text',
        'url',
    ]),
    /**
     * Flag indicating whether the text field is required or not.
     */
    required: PropTypes.bool,
    /**
     * Custom validation function that runs anytime the field updates, and displays
     * the returned string as a helper message underneath the text field.
     */
    validator: PropTypes.func,
    /**
     * Any props to pass to the internal `input` HTML element.
     */
    InputProps: PropTypes.object,
    /**
     * Any props to pass to the internal `label` HTML element.
     */
    LabelProps: PropTypes.object,
    /**
     * The remaining props to spread to the internal `div` HTML element that acts as the
     * root container of the component.
     *
     * this is not a prop of `passThruProps` -- this is simply a representation of any
     * additional props passed to the `Form` component that aren't covered above.
     */
    "...passThruProps": PropTypes.object,
};

TextField.defaultProps = {
    initialValue: '',
    type: 'text',
    required: false,
};

export default TextField;