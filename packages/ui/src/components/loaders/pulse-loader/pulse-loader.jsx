import { useContext } from 'react';
import PropTypes from 'prop-types';
import Color from 'color';
import { motion } from 'framer-motion';
import { Theme } from '@contexts';
import localStyles from './pulse-loader.module.scss';

/**
 * A loader displaying 3 dots, pulsing in size.
 */
function PulseLoader({
    size,
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
     * Various colors for the pulse loader.
     */
    const baseColor = Color(theme[color] || color);

    /**
     * The size of the gap between each circle.
     */
    const gapSize = size / 2;

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
            className={localStyles.pulseLoader}
            style={{
                width: size * 3 + gapSize * 2,
                gap:   gapSize,
            }}
        >
            <motion.span
                initial={{
                    scale: 0,
                }}
                animate={{
                    scale: [0, 1],
                }}
                transition={{
                    duration:   speed,
                    repeat:     Infinity,
                    repeatType: 'reverse',
                    delay:      speed * 2 / 7 * 0,
                }}
                style={{
                    width:      size,
                    height:     size,
                    background: baseColor.string(),
                }}
            />
            <motion.span
                initial={{
                    scale: 0,
                }}
                animate={{
                    scale: [0, 1],
                }}
                transition={{
                    duration:   speed,
                    repeat:     Infinity,
                    repeatType: 'reverse',
                    delay:      speed * 2 / 7 * 1,
                }}
                style={{
                    width:      size,
                    height:     size,
                    background: baseColor.string(),
                }}
            />
            <motion.span
                initial={{
                    scale: 0,
                }}
                animate={{
                    scale: [0, 1],
                }}
                transition={{
                    duration:   speed,
                    repeat:     Infinity,
                    repeatType: 'reverse',
                    delay:      speed * 2 / 7 * 2,
                }}
                style={{
                    width:      size,
                    height:     size,
                    background: baseColor.string(),
                }}
            />
        </div>
    );

    // #endregion
}

PulseLoader.propTypes = {
    /**
     * The size of the loader in arbitrary units.
     */
    size:  PropTypes.number,
    /**
     * The color of the loader.
     * You can also specify a theme key, specified in the `StyleManager`'s `theme` prop, to use a theme color.
     */
    color: PropTypes.string,
    /**
     * The number of seconds it should take the loader to complete a cycle, in seconds.
     */
    speed: PropTypes.number,
};

PulseLoader.defaultProps = {
    color: 'primary',
    size:  16,
    speed: 0.4,
};

export default PulseLoader;
