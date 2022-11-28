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
                        pathLength: [0, 1],
                    }}
                    transition={{
                        duration: speed,
                        repeat: Infinity,
                        repeatType: 'reverse',
                        ease: 'easeInOut',
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
};

DrawLoader.defaultProps = {
    color: '#0072E5',
    size: 120,
    speed: 2.5,
};

export default DrawLoader;