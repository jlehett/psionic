import { useContext } from 'react';
import PropTypes from 'prop-types';
import Color from 'color';
import { motion } from 'framer-motion';
import { Theme } from '@contexts';
import localStyles from './circular-spinner.module.scss';

/**
 * Loader which displays a circular spinner.
 */
function CircularSpinner({
    size,
    innerWidthRatio,
    color,
    speed,
    hideBackground,
    progress,
}) {
    // #region Context

    /**
     * Use the theme from context.
     */
    const theme = useContext(Theme);

    // #endregion

    // #region Constants

    /**
     * Various colors for the circular spinner.
     */
    const baseColor = Color(theme[color] || color);
    const baseColorOpacity80 = baseColor.fade(0.80);

    /**
     * The stroke width of the spinner, given the innerWidthRatio.
     */
    const strokeWidth = innerWidthRatio * size / 2;

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
            className={localStyles.circularSpinner}
            style={{
                width:  size,
                height: size,
            }}
        >
            <motion.svg
                style={{
                    originX: `${size / 2}px`,
                    originY: `${size / 2}px`,
                }}
                initial={{
                    rotate: 0,
                }}
                animate={{
                    rotate: progress === undefined ? 360 : 0,
                }}
                transition={{
                    duration:   speed / 1.851,
                    repeat:     Infinity,
                    repeatType: 'loop',
                    ease:       'linear',
                }}
            >
                {
                    hideBackground
                        ? null
                        : (
                            <circle
                                fill="none"
                                stroke={baseColorOpacity80.string()}
                                strokeWidth={strokeWidth}
                                r={(size / 2) - (strokeWidth / 2)}
                                cx={size / 2}
                                cy={size / 2}
                            />
                        )
                }
                <motion.circle
                    fill="none"
                    stroke={baseColor.string()}
                    strokeWidth={strokeWidth}
                    r={(size / 2) - (strokeWidth / 2)}
                    cx={size / 2}
                    cy={size / 2}
                    initial={{
                        pathLength: 0,
                    }}
                    animate={{
                        pathLength: progress === undefined ? [0.1, 0.9] : progress,
                    }}
                    transition={{
                        duration:   speed,
                        repeat:     progress === undefined ? Infinity : 0,
                        repeatType: 'reverse',
                        ease:       'linear',
                    }}
                />
            </motion.svg>
        </div>
    );

    // #endregion
}

CircularSpinner.propTypes = {
    /**
     * The size of the spinner, in pixels.
     */
    size:            PropTypes.number,
    /**
     * The size of the ring, as a ratio of the size of the spinner.
     */
    innerWidthRatio: PropTypes.number,
    /**
     * The color of the spinner.
     * You can also specify a theme key, specified in the `StyleManager`'s `theme` prop, to use a theme color.
     */
    color:           PropTypes.string,
    /**
     * The speed at which the spinner animates, in seconds.
     */
    speed:           PropTypes.number,
    /**
     * If set to true, the outer full ring of a lighter opacity will not be displayed.
     */
    hideBackground:  PropTypes.bool,
    /**
     * If specified, this loader will display the progress of the specified value. Can be used
     * to make the `CircularSpinner` act as a definite progress indicator instead of an indefinite
     * progress indicator.
     *
     * Should be a number between 0-1.
     */
    progress:        PropTypes.number,
};

CircularSpinner.defaultProps = {
    color:           'primary',
    size:            60,
    speed:           1.5,
    innerWidthRatio: 0.15,
    hideBackground:  false,
};

export default CircularSpinner;
