import PropTypes from 'prop-types';
import { motion } from 'framer-motion';
import VisibilitySensor from 'react-visibility-sensor';
import { useVisibilitySensorWithResetDelay } from '@hooks/interactions';
import localStyles from './slide-up.module.scss';

/**
 * A wrapper that can be used to animate a slide up effect on a component whenever it becomes
 * visible in the viewport.
 */
function SlideUp({
    children,
    resetDelay,
    // Pass-thru props
    ...passThruProps
}) {
    // #region Constants

    /**
     * The variants for the animation.
     */
    const variants = {
        hidden: {
            y:          '100%',
            transition: {
                duration: 0.65,
                ease:     [0.25, 0.46, 0.45, 0.94],
            },
        },
        visible: {
            y:          '0%',
            transition: {
                duration: 0.65,
                ease:     [0.25, 0.46, 0.45, 0.94],
            },
        },
    };

    // #endregion

    // #region State

    /**
     * Track the visibility of the component with a reset delay.
     */
    const [isVisible, onVisibilityChanged] = useVisibilitySensorWithResetDelay(resetDelay);

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
        <VisibilitySensor onChange={onVisibilityChanged}>
            <div
                {...passThruProps}
                className={`
                    ${localStyles.slideUp}
                    ${passThruProps?.className}
                `}
            >
                <motion.div
                    variants={variants}
                    initial="hidden"
                    animate={isVisible ? 'visible' : 'hidden'}
                >
                    {children}
                </motion.div>
            </div>
        </VisibilitySensor>
    );

    // #endregion
}

SlideUp.propTypes = {
    /**
     * The children to render with the animation.
     */
    children:           PropTypes.any.isRequired,
    /**
     * The number of seconds to delay the reset of the text reveal when it is no longer visible. If the content
     * is visible again before the reset delay has elapsed, then the reset will be canceled. If this is set to
     * `0`, then the reset will happen immediately. If this is set to `Infinity`, then the reset will never
     * happen.
     */
    resetDelay:         PropTypes.number,
    /**
     * Any additional props to pass through to the wrapping div.
     *
     * This is not a prop of `passThruProps` -- this is simply a representation of any additional props
     * passed to the `SlideUp` component that aren't covered above.
     */
    '...passThruProps': PropTypes.any,
};

SlideUp.defaultProps = {

};

export default SlideUp;
