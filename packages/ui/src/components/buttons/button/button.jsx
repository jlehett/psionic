import { useState } from 'react';
import PropTypes from 'prop-types';
import localStyles from './button.module.scss';

/**
 * Replace this with a comment describing the component.
 */
const Button = ({
    type,
    onClick,
    disabled,
    children,
    allowMultipleClicks,
    // Pass-thru Props
    ...passThruProps
}) => {

    //#region Constants

    //#endregion

    //#region State

    /**
     * Track whether the button's `onClick` function is running or not.
     */
    const [onClickRunning, setOnClickRunning] = useState(false);

    //#endregion

    //#region Effects

    //#endregion

    //#region Functions

    /**
     * Augment the `onClick` function
     */

    //#endregion

    //#region Render Functions

    /**
     * Main render.
     */
    return (
        <button
            type={type}
            onClick={onClick}
            disabled={disabled}
            {...passThruProps}
            className={`
                ${localStyles.button}
                ${passThruProps?.className}
            `}
        >
            {children}
        </button>
    );

    //#endregion
};

Button.propTypes = {

};

Button.defaultProps = {

};

export default Button;