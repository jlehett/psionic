import { useContext } from 'react';
import PropTypes from 'prop-types';
import Color from 'color';
import { RadioGroupContext } from '@contexts';
import localStyles from './radio.module.scss';

/**
 * A radio button meant to be used as a child of the `RadioGroup` component.
 */
function Radio({
    value,
    children,
    id,
    // Pass-thru props
    ...passThruProps
}) {
    // #region Context

    /**
     * Use the radio group context.
     */
    const {
        formField,
        onChange,
        disabled,
        color,
        fieldKey,
    } = useContext(RadioGroupContext);

    // #endregion

    // #region Constants

    /**
     * Various colors for the radio button.
     */
    const baseColor = Color(color);

    // #endregion

    // #region State

    // #endregion

    // #region Effects

    // #endregion

    // #region Functions

    // #endregion

    // #region Variables

    /**
     * The value currently stored in the input.
     * @type {*}
     */
    const currentValue = formField?.value;

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

    // #endregion

    // #region Render Functions

    /**
     * Main render.
     */
    return (
        <div
            data-display-error={!currentValidity && unmodifiedSinceLastSubmission}
            data-disabled={disabled}
            data-selected={currentValue === value}
            {...passThruProps}
            className={`
                ${passThruProps?.className}
                ${localStyles.radio}
            `}
        >
            <div
                className={localStyles.customRadio}
                style={{
                    border: !currentValidity && unmodifiedSinceLastSubmission
                        ? '1px solid rgb(211, 47, 47)'
                        : currentValue === value
                            ? disabled
                                ? '2px solid rgba(0, 0, 0, 0.25)'
                                : `2px solid ${baseColor}`
                            : '1px solid rgba(0, 0, 0, 0.25)',
                    background: disabled ? '#ebebeb' : 'white',
                }}
            >
                <div style={{ background: disabled ? '#bbb' : baseColor }} />
            </div>
            <label
                style={{
                    color: disabled ? 'rgba(0, 0, 0, 0.4)' : 'black',
                }}
                htmlFor={id}
            >
                {children}
            </label>
            <input
                type="radio"
                value={value}
                checked={currentValue === value}
                onChange={onChange}
                name={fieldKey}
                id={id}
                tabIndex={disabled ? -1 : 0}
            />
        </div>
    );

    // #endregion
}

Radio.propTypes = {
    /**
     * The value of the radio button. This is not displayed in the UI -- this is simply the value that will
     * be set for the form field if this radio button is selected.
     */
    value:              PropTypes.any.isRequired,
    /**
     * The label for the radio button.
     */
    children:           PropTypes.any.isRequired,
    /**
     * The ID of the radio button. This is used to associate the radio button with its label.
     */
    id:                 PropTypes.string.isRequired,
    /**
     * The remaining props to spread to the internal `div` HTML element that acts as the
     * root container of the component.
     *
     * This is not a prop of `passThruProps` -- this is simply a representation of any
     * additional props passed to the `Radio` component that aren't covered above.
     */
    '...passThruProps': PropTypes.any,
};

Radio.defaultProps = {

};

export default Radio;
