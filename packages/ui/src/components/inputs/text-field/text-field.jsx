import { useState } from 'react';
import PropTypes from 'prop-types';
import { motion } from 'framer-motion';
import { StickyTooltip } from '@components/accessibility';
import Visibility from '@assets/visibility.svg';
import VisibilityOff from '@assets/visibility-off.svg';
import { useFormField } from '@hooks/forms';
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
    disabled,
    // Specific Component Props
    InputProps,
    LabelProps,
    // Pass Thru Props
    ...passThruProps
}) => {

    //#region Constants

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
        type,
        initialValue,
        disabled,
        validator,
        required,
    });

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

    //#region Variables

    /**
     * Value that is currently stored in the input.
     * @type {string}
     */
    const currentValue = formField?.value;

    /**
     * String representing the type to use for the internal input element. If the given
     * input type is a password, we may want to represent it with a text input if the show
     * password button has been clicked.
     * @type {string}
     */
    const inputTypeToUse = type !== 'password' ? type : showHiddenText ? 'text' : 'password';

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

    //#region Functions

    //#endregion

    //#region Render Functions

    /**
     * Main render.
     */
    return (
        <motion.div
            data-display-error={!currentValidity && unmodifiedSinceLastSubmission}
            data-is-focused={isFocused}
            data-disabled={disabled}
            {...passThruProps}
            className={`
                ${passThruProps?.className}
                ${localStyles.textField}
            `}
            animate={{ x: !currentValidity && unmodifiedSinceLastSubmission ? [0, 10, -10, 10, 0] : 0 }}
            transition={{ duration: 0.4 }}
        >
            <motion.div
                initial={{ top: initialValue ? '0px' : '37x' }}
                animate={{ top: currentValue ? '0px' : '37px' }}
                className={localStyles.labelWrapper}
            >
                <label {...LabelProps}>
                    {label}{required ? ' *' : null}
                </label>
            </motion.div>
            <div className={localStyles.inputWrapper}>
                <textarea
                    rows="1"
                    type={inputTypeToUse}
                    value={currentValue}
                    onChange={onChange}
                    disabled={disabled}
                    onFocus={() => setIsFocused(true)}
                    onBlur={() => setIsFocused(false)}
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
        </motion.div>
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
     * Flag indicating whether the text field is disabled.
     */
    disabled: PropTypes.bool,
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
     * This is not a prop of `passThruProps` -- this is simply a representation of any
     * additional props passed to the `div` component that aren't covered above.
     */
    "...passThruProps": PropTypes.any,
};

TextField.defaultProps = {
    initialValue: '',
    type: 'text',
    required: false,
    disabled: false,
};

export default TextField;