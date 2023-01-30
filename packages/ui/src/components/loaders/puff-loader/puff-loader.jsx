import { useContext } from 'react';
import PropTypes from 'prop-types';
import Color from 'color';
import { motion } from 'framer-motion';
import { Theme } from '@contexts';
import localStyles from './puff-loader.module.scss';

/**
 * A loader displaying rings that expand outward while fading out.
 */
function PuffLoader({
    size,
    color,
    speed,
    borderWidthMultiplier,
}) {
    // #region Context

    /**
     * Use the theme from context.
     */
    const theme = useContext(Theme);

    // #endregion

    // #region Constants

    /**
     * Various colors for the puff loader.
     */
    const baseColor = Color(theme[color] || color);

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
            className={localStyles.puffLoader}
            style={{
                width:  size,
                height: size,
            }}
        >
            <motion.span
                initial={{
                    width:   size / 8,
                    height:  size / 8,
                    opacity: 0,
                }}
                animate={{
                    width:   [0, size],
                    height:  [0, size],
                    opacity: [0, 0.75, 0],
                }}
                transition={{
                    duration:   speed,
                    repeat:     Infinity,
                    repeatType: 'loop',
                    ease:       'easeOut',
                }}
                style={{
                    borderColor: baseColor.string(),
                    borderWidth: size / 30 * borderWidthMultiplier,
                }}
            />
            <motion.span
                initial={{
                    width:   size / 8,
                    height:  size / 8,
                    opacity: 0,
                }}
                animate={{
                    width:   [0, size],
                    height:  [0, size],
                    opacity: [0, 0.75, 0],
                }}
                transition={{
                    duration:   speed,
                    repeat:     Infinity,
                    repeatType: 'loop',
                    delay:      speed / 2,
                    ease:       'easeOut',
                }}
                style={{
                    borderColor: baseColor.string(),
                    borderWidth: size / 30 * borderWidthMultiplier,
                }}
            />
        </div>
    );

    // #endregion
}

PuffLoader.propTypes = {
    /**
     * The size of the loader in pixels.
     */
    size:                  PropTypes.number,
    /**
     * The color of the loader.
     * You can also specify a theme key, specified in the `StyleManager`'s `theme` prop, to use a theme color.
     */
    color:                 PropTypes.string,
    /**
     * The speed of the loader animation in seconds.
     */
    speed:                 PropTypes.number,
    /**
     * The multiplier for the thickness of the rings in the loader.
     */
    borderWidthMultiplier: PropTypes.number,
};

PuffLoader.defaultProps = {
    color:                 'primary',
    size:                  60,
    speed:                 2.5,
    borderWidthMultiplier: 1,
};

export default PuffLoader;
