import PropTypes from 'prop-types';
import Color from 'color';
import localStyles from './indent-spinner.module.scss';

/**
 * A spinner that appears to be indented into the element it is positioned on top of.
 */
const IndentSpinner = ({
    color,
    backgroundColor,
    coloredIndent,
    size,
    speed,
}) => {

    //#region Constants

    /**
     * Various colors for the indent spinner
     */
    const baseColor = Color(color);
    const baseColorOpacity60 = baseColor.fade(0.6);
    const baseColorOpacity70 = baseColor.fade(0.7);
    const baseColorOpacity80 = baseColor.fade(0.9);

    const baseBackgroundColor = Color(backgroundColor);

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
            className={localStyles.outerCircle}
            style={{
                background: `linear-gradient(145deg, ${coloredIndent ? baseColorOpacity70.string() : '#00000020'}, ${coloredIndent ? baseColorOpacity80.string() : '#00000010'})`,
                boxShadow: `inset 2px 2px 4px 0px ${coloredIndent ? baseColorOpacity60.string() : '#00000030'}`,
                width: `${size}px`,
                height: `${size}px`,
            }}
        >
            <div
                className={localStyles.innerCircle}
                style={{
                    boxShadow: coloredIndent
                        ? `${baseColorOpacity60.string()} 2px 2px 4px 0`
                        : `rgba(0, 0, 0, 0.145) 2px 2px 4px 0px`,
                    background: baseBackgroundColor.string(),
                }}
            />
            <div
                className={localStyles.rotator}
                style={{ animationDuration: `${speed}s` }}
            >
                <div
                    className={localStyles.spinner}
                    style={{ background: baseColor.string() }}
                />
            </div>
        </div>
    );

    //#endregion
};

IndentSpinner.propTypes = {
    /**
     * The color of the spinner. Supports any of the formats listed here: https://www.npmjs.com/package/color-string.
     */
    color: PropTypes.string,
    /**
     * The background color of the element this spinner will be displayed on.
     * Supports any of the formats listed here: https://www.npmjs.com/package/color-string.
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
     * The speed at which the spinner makes a full rotation in seconds.
     */
    speed: PropTypes.number,
};

IndentSpinner.defaultProps = {
    backgroundColor: '#fff',
    color: '#878787',
    coloredIndent: false,
    size: 60,
    speed: 1,
};

export default IndentSpinner;