import { useContext } from 'react';
import PropTypes from 'prop-types';
import Color from 'color';
import { Theme } from '@contexts';
import localStyles from './quarter-spinner.module.scss';

/**
 * A basic spinner that displays as a quarter circle ring, spinning around a lower
 * opacity full ring.
 */
function QuarterSpinner({
    size,
    innerWidthRatio,
    color,
    speed,
}) {
    // #region Context

    /**
     * Use the theme from context.
     */
    const theme = useContext(Theme);

    // #endregion

    // #region Constants

    /**
     * Various colors for the quarter spinner.
     */
    const baseColor = Color(theme[color] || color);
    const baseColorOpacity80 = baseColor.fade(0.80);

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
            className={localStyles.quarterSpinner}
            style={{
                width:             size,
                height:            size,
                border:            `${innerWidthRatio / 2 * size}px solid ${baseColorOpacity80.string()}`,
                borderTop:         `${innerWidthRatio / 2 * size}px solid ${baseColor.string()}`,
                animationDuration: `${speed}s`,
            }}
        />
    );

    // #endregion
}

QuarterSpinner.propTypes = {
    /**
     * The size, in pixels, that the spinner should be.
     */
    size:            PropTypes.number,
    /**
     * The ratio of the ring's size to the spinner's size.
     */
    innerWidthRatio: PropTypes.number,
    /**
     * The color of the spinner. Supports any of the formats listed here: https://www.npmjs.com/package/color-string.
     * You can also specify a theme key, specified in the `StyleManager`'s `theme` prop, to use a theme color.
     */
    color:           PropTypes.string,
    /**
     * The speed at which the spinner makes a full rotation in seconds.
     */
    speed:           PropTypes.number,
};

QuarterSpinner.defaultProps = {
    size:            60,
    innerWidthRatio: 0.25,
    color:           'primary',
    speed:           1,
};

export default QuarterSpinner;
