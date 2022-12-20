import PropTypes from 'prop-types';
import localStyles from './style-manager.module.scss';

/**
 * A manager component that handles importing the styles for the package. Should likely be used as one
 * of the wrappers of the root of your app.
 */
const StyleManager = ({
    children,
}) => {

    //#region Constants

    //#endregion

    //#region State

    //#endregion

    //#region Effects

    //#endregion

    //#region Functions

    //#endregion

    //#region Render Functions

    /**
     * Main render.
     */
    return (
        <>
            <link rel="preconnect" href="https://fonts.googleapis.com"/>
            <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin/>
            <link href="https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,100;0,300;0,400;0,500;0,700;0,900;1,100;1,300;1,400;1,500;1,700;1,900&display=swap" rel="stylesheet"/>
            {children}
        </>
    );

    //#endregion
};

StyleManager.propTypes = {
    /**
     * The children to wrap with the style manager.
     */
    children: PropTypes.any,
};

StyleManager.defaultProps = {

};

export default StyleManager;