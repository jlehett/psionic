import PropTypes from 'prop-types';
import { Theme } from '@contexts';
import localStyles from './style-manager.module.scss';

/**
 * A manager component that handles importing the styles for the package. Should likely be used as one
 * of the wrappers of the root of your app.
 */
function StyleManager({
    children,
    theme,
}) {
    // #region Constants

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
        <Theme.Provider value={theme}>
            <link rel="preconnect" href="https://fonts.googleapis.com" />
            <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true" />
            <link href="https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,100;0,300;0,400;0,500;0,700;0,900;1,100;1,300;1,400;1,500;1,700;1,900&display=swap" rel="stylesheet" />
            {children}
        </Theme.Provider>
    );

    // #endregion
}

StyleManager.propTypes = {
    /**
     * The children to wrap with the style manager.
     */
    children: PropTypes.any,
    /**
     * The theme to use for the app.
     */
    theme:    PropTypes.object,
};

StyleManager.defaultProps = {
    theme: {
        primary: '#0072E5',
    },
};

export default StyleManager;
