import { useContext } from 'react';
import PropTypes from 'prop-types';
import Color from 'color';
import { Theme } from '@contexts';
import Close from '@assets/close.svg';
import { IconButton } from '@components/buttons';
import localStyles from './snackbar.module.scss';

/**
 * A pre-built Snackbar component that can be used to display alert messages to users.
 * Built to be easily used with the `SnackbarManager` component + `useSnackbar` hook.
 */
function Snackbar({
    color,
    SvgIcon,
    text,
    removeSnackbar,
    // Pass Thru Props
    ...passThruProps
}) {
    // #region Context

    /**
     * Use the theme from context.
     */
    const theme = useContext(Theme);

    // #endregion

    // #region Constants

    /**
     * Various colors for the snackbar.
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
            {...passThruProps}
            className={`
                ${localStyles.snackbar}
                ${passThruProps?.className}
            `}
            style={{
                boxShadow:  'rgba(0, 0, 0, 0.2) 0px 2px 1px -1px, rgba(0, 0, 0, 0.14) 0px 1px 1px 0px, rgba(0, 0, 0, 0.12) 0px 1px 3px 0px',
                borderLeft: `6px solid ${baseColor.string()}`,
                ...(passThruProps?.style || {}),
            }}
        >
            <div className={localStyles.left}>
                <SvgIcon style={{ fill: baseColor.string() }} />
                <p aria-live="polite">
                    {text}
                </p>
            </div>
            <div className={localStyles.right}>
                <IconButton
                    onClick={removeSnackbar}
                    SvgIcon={Close}
                    color={baseColor.string()}
                    size={24}
                    paddingRatio={0.35}
                    aria-label="close notification"
                />
            </div>
        </div>
    );

    // #endregion
}

Snackbar.propTypes = {
    /**
     * The accent color of the snackbar.
     * You can also specify a theme key, specified in the `StyleManager`'s `theme` prop, to use a theme color.
     */
    color:              PropTypes.string,
    /**
     * The icon to display on the left side of the snackbar.
     */
    SvgIcon:            PropTypes.func.isRequired,
    /**
     * The text to display on the snackbar.
     */
    text:               PropTypes.string.isRequired,
    /**
     * Function to call to remove the snackbar from the DOM.
     */
    removeSnackbar:     PropTypes.func.isRequired,
    /**
     * Any additional props to pass through to the internal `button` element.
     *
     * This is not a prop of `passThruProps` -- this is simply a representation of any additional props passed to
     * the `Snackbar` component that aren't covered above.
     */
    '...passThruProps': PropTypes.any,
};

Snackbar.defaultProps = {
    color: 'primary',
};

export default Snackbar;
