import { useContext } from 'react';
import PropTypes from 'prop-types';
import Color from 'color';
import { ControlledRadioGroupContext, Theme } from '@contexts';
import localStyles from './controlled-radio.module.scss';

/**
 * A manually controlled radio button meant to be used as a child of the `ControlledRadioGroup` component.
 */
function ControlledRadio({
    value,
    children,
    id,
    // Pass-thru props
    ...passThruProps
}) {
    // #region Context

    /**
     * Use the theme from context.
     */
    const theme = useContext(Theme);

    /**
     * Use the radio group context.
     */
    const {
        selectedValue,
        onChange,
        hasError,
        disabled,
        color,
        radioGroupID,
    } = useContext(ControlledRadioGroupContext);

    // #endregion

    // #region Constants

    /**
     * Various colors for the radio button.
     */
    const baseColor = Color(theme[color] || color);

    // #endregion

    // #region State

    // #endregion

    // #region Effects

    // #endregion

    // #region Functions

    // #endregion

    // #region Render Functions

    /**
     * Main render.
     */
    return (
        <div
            data-display-error={hasError}
            data-disabled={disabled}
            data-selected={selectedValue === value}
            {...passThruProps}
            className={`
                ${passThruProps?.className}
                ${localStyles.radio}
            `}
        >
            <div
                className={localStyles.customRadio}
                style={{
                    border: hasError
                        ? '1px solid rgb(211, 47, 47)'
                        : selectedValue === value
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
                checked={selectedValue === value}
                disabled={disabled}
                onChange={onChange}
                name={radioGroupID}
                id={id}
                tabIndex={disabled ? -1 : 0}
            />
        </div>
    );

    // #endregion
}

ControlledRadio.propTypes = {
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

ControlledRadio.defaultProps = {

};

export default ControlledRadio;
