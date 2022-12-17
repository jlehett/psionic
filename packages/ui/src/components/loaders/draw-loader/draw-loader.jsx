import PropTypes from 'prop-types';
import { motion } from 'framer-motion';
import Color from 'color';
import localStyles from './draw-loader.module.scss';

/**
 * Loader which draws and then undraws a given SVG.
 */
const DrawLoader = ({
    size,
    color,
    speed,
    svg,
    paths,
    progress,
}) => {

    //#region Constants

    /**
     * Various colors for the draw loader.
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
     * Render all of the paths in the SVG.
     */
    const renderDrawnPaths = () => {
        const pathRenders = [];
        for (const [index, path] of paths.entries()) {
            pathRenders.push(
                <motion.path
                    key={`path-${index}`}
                    {...path}
                    fill={baseColor.fade(0.75).string()}
                    stroke={baseColor.string()}
                    initial={{
                        opacity: 0.15,
                        pathLength: 0,
                    }}
                    animate={{
                        opacity: [0.15, 1],
                        pathLength: progress === undefined ? [0, 1] : progress,
                    }}
                    transition={{
                        duration: speed,
                        repeat: progress === undefined ? Infinity : 0,
                        repeatType: 'reverse',
                        ease: progress === undefined ? 'easeInOut' : 'linear',
                    }}
                />
            );
        }
        return pathRenders;
    };

    /**
     * Main render.
     */
    return (
        <div
            className={localStyles.drawLoader}
            style={{
                width: size,
                height: size,
            }}
        >
            <motion.svg {...svg}>
                {renderDrawnPaths()}
            </motion.svg>
        </div>
    );

    //#endregion
};

DrawLoader.propTypes = {
    /**
     * The size of the loader, in pixels.
     */
    size: PropTypes.number,
    /**
     * The color of the loader.
     */
    color: PropTypes.string,
    /**
     * The speed of the animation, in seconds.
     */
    speed: PropTypes.number,
    /**
     * The props to pass to the internal SVG element.
     */
    svg: PropTypes.object.isRequired,
    /**
     * An array containing the props to pass to each individual internal `path` element.
     */
    paths: PropTypes.arrayOf(PropTypes.object).isRequired,
    /**
     * If specified, this loader will display the given portion of the path. Can be used
     * to make the `DrawLoader` act as a definite progress indicator instead of an indefinite progress
     * indicator.
     *
     * Should be a number between 0-1.
     */
    progress: PropTypes.number,
};

DrawLoader.defaultProps = {
    color: '#0072E5',
    size: 120,
    speed: 2.5,
};

export default DrawLoader;