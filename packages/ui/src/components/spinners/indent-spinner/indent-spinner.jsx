import PropTypes from 'prop-types';
import localStyles from './indent-spinner.module.scss';

/**
 * A spinner that appears to be indented into the element it is positioned on top of.
 */
const IndentSpinner = ({
    color,
    backgroundColor,
    coloredIndent,
    size,
    // Pass-thru Props
    ...passThruProps
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
        <div
            {...passThruProps}
            className={`
                ${passThruProps?.className}
                ${localStyles.outerCircle}
            `}
            style={{
                background: `linear-gradient(145deg, ${coloredIndent ? `${color}4C` : '#00000010'}, ${coloredIndent ? `${color}1A` : '#00000005'})`,
                boxShadow: `inset 2px 2px 4px 0px ${coloredIndent ? `${color}55` : '#00000015'}`,
                width: `${size}px`,
                height: `${size}px`,
                ...(passThruProps?.style || {})
            }}
        >
            <div
                className={localStyles.innerCircle}
                style={{
                    boxShadow: coloredIndent
                        ? `${color}55 2px 2px 4px 0`
                        : `rgba(0, 0, 0, 0.145) 2px 2px 4px 0px`,
                    background: backgroundColor,
                }}
            />
            <div className={localStyles.rotator}>
                <div
                    className={localStyles.spinner}
                    style={{ background: color }}
                />
            </div>
        </div>
    );

    //#endregion
};

IndentSpinner.propTypes = {
    /**
     * The color of the spinner. Should be in 6 character hexadecimal format.
     */
    color: PropTypes.string,
    /**
     * The background color of the element this spinner will be displayed on. Should be in 6 character hexadecimal format.
     */
    backgroundColor: PropTypes.string,
    /**
     * Flag indicating whether the indent should be colored with the same color as
     * the `color` prop, or if it should be simple grayscale.
     */
    coloredIndent: PropTypes.bool,
    /**
     * The size, in pixels, that the spinner should be.
     */
    size: PropTypes.number,
    /**
     * Any additional props to pass through to the internal div wrapping the entire
     * spinner.
     *
     * This is not a prop of `passThruProps` -- this is simply a representation of any
     * additional props passed to the `IndentSpinner` component that aren't covered above.
     *
     * To change the size of the spinner, you can pass a `className` or `style` prop which
     * changes both the `width` and `height` of the component.
     */
    "...passThruProps": PropTypes.object,
};

IndentSpinner.defaultProps = {
    backgroundColor: '#fff',
    color: '#878787',
    coloredIndent: false,
    size: 60,
};

export default IndentSpinner;