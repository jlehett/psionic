import { useContext } from 'react';
import PropTypes from 'prop-types';
import Color from 'color';
import { motion } from 'framer-motion';
import { Theme } from '@contexts';
import localStyles from './bar-loader.module.scss';

/**
 * A loader that displays a bar moving from left to right.
 */
function BarLoader({
    color,
    speed,
    width,
    height,
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
     * Various colors for the bar loader.
     */
    const baseColor = Color(theme[color] || color);
    const baseColorFaded = baseColor.fade(0.75);

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
            className={localStyles.barLoader}
            style={{
                width,
                height,
                background: baseColorFaded,
            }}
        >
            <motion.div
                initial={{
                    x:     progress === undefined ? -width : '0%',
                    width: progress === undefined ? width : '0%',
                }}
                animate={{
                    x:     progress === undefined ? [-width, width] : '0%',
                    width: progress === undefined ? width : `${progress * 100}%`,
                }}
                transition={{
                    duration:   speed,
                    repeat:     progress === undefined ? Infinity : 0,
                    repeatType: 'loop',
                    delay:      speed / 2,
                    ease:       progress === undefined ? 'easeInOut' : 'linear',
                    times:      progress === undefined ? [0, 0.6] : undefined,
                }}
                style={{
                    background: baseColor,
                }}
            />
        </div>
    );

    // #endregion
}

BarLoader.propTypes = {
    /**
     * The color of the bar loader.
     * You can also specify a theme key, specified in the `StyleManager`'s `theme` prop, to use a theme color.
     */
    color:    PropTypes.string,
    /**
     * The speed of the bar loader animation, in seconds.
     */
    speed:    PropTypes.number,
    /**
     * The width of the bar loader.
     */
    width:    PropTypes.number,
    /**
     * The height of the bar loader.
     */
    height:   PropTypes.number,
    /**
     * If specified, this loader will display the given portion of the bar. Can be used to make
     * the `BarLoader` act as a definite progress indicator instead of an indefinite progress
     * indicator.
     *
     * Should be a number between 0-1.
     */
    progress: PropTypes.number,
};

BarLoader.defaultProps = {
    speed:  2.5,
    width:  100,
    height: 4,
    color:  'primary',
};

export default BarLoader;
