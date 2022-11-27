import PropTypes from 'prop-types';
import Color from 'color';
import { motion } from 'framer-motion';
import { getHoveredColor } from '@utils/colors';
import localStyles from './sync-loader.module.scss';

/**
 * A loader displaying 3 dots, bouncing up and down.
 */
const SyncLoader = ({
    size,
    color,
    speed,
}) => {

    //#region Constants

    /**
     * Various colors for the sync loader.
     */
    const baseColor = Color(color);
    const baseColorLighter = getHoveredColor(baseColor, 0.1, 0.05);

    /**
     * The size of the gap between each circle.
     */
    const gapSize = size / 2;

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
            className={localStyles.syncLoader}
            style={{
                width: size * 3 + gapSize * 2,
                gap: gapSize,
            }}
        >
            <motion.span
                initial={{
                    y: 0,
                    background: baseColor.string(),
                }}
                animate={{
                    y: [size / 2, size * 3 / 10, -size / 2],
                    background: [baseColor.string(), baseColorLighter.string()],
                }}
                transition={{
                    duration: speed,
                    repeat: Infinity,
                    repeatType: 'reverse',
                    delay: speed * 2 / 5 * 0,
                }}
                style={{
                    width: size,
                    height: size,
                }}
            />
            <motion.span
                initial={{
                    y: 0,
                    background: baseColor.string(),
                }}
                animate={{
                    y: [size / 2, size * 3 / 10, -size / 2],
                    background: [baseColor.string(), baseColorLighter.string()],
                }}
                transition={{
                    duration: speed,
                    repeat: Infinity,
                    repeatType: 'reverse',
                    delay: speed * 2 / 5 * 1,
                }}
                style={{
                    width: size,
                    height: size,
                }}
            />
            <motion.span
                initial={{
                    y: 0,
                    background: baseColor.string(),
                }}
                animate={{
                    y: [size / 2, size * 3 / 10, -size / 2],
                    background: [baseColor.string(), baseColorLighter.string()],
                }}
                transition={{
                    duration: speed,
                    repeat: Infinity,
                    repeatType: 'reverse',
                    delay: speed * 2 / 5 * 2,
                }}
                style={{
                    width: size,
                    height: size,
                }}
            />
        </div>
    );

    //#endregion
};

SyncLoader.propTypes = {
    /**
     * The size of the loader in arbitrary units.
     */
    size: PropTypes.number,
    /**
     * The color of the loader.
     */
    color: PropTypes.string,
    /**
     * The number of seconds it should take the loader to complete a cycle, in seconds.
     */
    speed: PropTypes.number,
};

SyncLoader.defaultProps = {
    color: '#0072E5',
    size: 16,
    speed: 0.4,
};

export default SyncLoader;