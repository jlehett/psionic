import PropTypes from 'prop-types';
import localStyles from './quarter-spinner.module.scss';

/**
 * A basic spinner that displays as a quarter circle ring, spinning around a lower
 * opacity full ring.
 */
const QuarterSpinner = ({
    size,
    innerWidthRatio,
    color,
    speed,
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
                ${localStyles.quarterSpinner}
            `}
            style={{
                width: size,
                height: size,
                border: `${innerWidthRatio / 2 * size}px solid ${color}40`,
                borderTop: `${innerWidthRatio / 2 * size}px solid ${color}FF`,
                animationDuration: `${speed}s`,
                ...(passThruProps?.style || {})
            }}
        />
    );

    //#endregion
};

QuarterSpinner.propTypes = {
    /**
     * The size, in pixels, that the spinner should be.
     */
    size: PropTypes.number,
    /**
     * The ratio of the ring's size to the spinner's size.
     */
    innerWidthRatio: PropTypes.number,
    /**
     * The color of the spinner. Should be in 6 character hexadecimal format.
     */
    color: PropTypes.string,
    /**
     * The speed at which the spinner makes a full rotation in seconds.
     */
    speed: PropTypes.number,
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

QuarterSpinner.defaultProps = {
    size: 60,
    innerWidthRatio: 0.25,
    color: '#000000',
    speed: 1,
};

export default QuarterSpinner;