import PropTypes from 'prop-types';
import Color from 'color';
import Close from '@assets/close.svg';
import { IconButton } from '@components/buttons';
import localStyles from './snackbar.module.scss';

/**
 * Replace this with a comment describing the component.
 */
const Snackbar = ({
    color,
    SvgIcon,
    text,
    // Pass Thru Props
    ...passThruProps
}) => {

    //#region Constants

    /**
     * Various colors for the snackbar.
     */
    const baseColor = Color(color);

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
        <div
            {...passThruProps}
            className={`
                ${localStyles.snackbar}
                ${passThruProps?.className}
            `}
            style={{
                boxShadow: `rgba(0, 0, 0, 0.2) 0px 2px 1px -1px, rgba(0, 0, 0, 0.14) 0px 1px 1px 0px, rgba(0, 0, 0, 0.12) 0px 1px 3px 0px`,
                borderLeft: `6px solid ${baseColor.string()}`,
                ...(passThruProps?.style || {}),
            }}
        >
            <div className={localStyles.left}>
                <SvgIcon style={{ fill: baseColor.string() }}/>
                <p>
                    {text}
                </p>
            </div>
            <div className={localStyles.right}>
                <IconButton
                    onClick={() => {}}
                    SvgIcon={Close}
                    color={baseColor}
                    size={24}
                    paddingRatio={0.35}
                />
            </div>
        </div>
    );

    //#endregion
};

Snackbar.propTypes = {
    /**
     * The accent color of the snackbar.
     */
    color: PropTypes.string,
    /**
     * The icon to display on the left side of the snackbar.
     */
    SvgIcon: PropTypes.func.isRequired,
    /**
     * The text to display on the snackbar.
     */
    text: PropTypes.string.isRequired,
    /**
     * Any additional props to pass through to the internal `button` element.
     *
     * This is not a prop of `passThruProps` -- this is simply a representation of any additional props passed to
     * the `Snackbar` component that aren't covered above.
     */
    '...passThruProps': PropTypes.any,
};

Snackbar.defaultProps = {
    color: '#0072E5',
};

export default Snackbar;