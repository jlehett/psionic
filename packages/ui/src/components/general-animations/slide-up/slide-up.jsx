import PropTypes from 'prop-types';
import { motion } from 'framer-motion';
import localStyles from './slide-up.module.scss';

/**
 * A wrapper that can be used to animate a slide up effect on a component.
 */
function SlideUp({
    children,
    activated,
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
            {...passThruProps}
            className={`
                ${localStyles.slideUp}
                ${passThruProps?.className}
            `}
        >
            <motion.div
                variants={variants}
                initial="hidden"
                animate={activated ? 'visible' : 'hidden'}
            >
                {children}
            </motion.div>
        </div>
    );

    // #endregion
}

SlideUp.propTypes = {
    /**
     * The children to render with the animation.
     */
    children:           PropTypes.any.isRequired,
    /**
     * Flag indicating whether the animation should be activated or not.
     */
    activated:          PropTypes.bool,
    /**
     * Any additional props to pass through to the wrapping div.
     *
     * This is not a prop of `passThruProps` -- this is simply a representation of any additional props
     * passed to the `SlideUp` component that aren't covered above.
     */
    '...passThruProps': PropTypes.any,
};

SlideUp.defaultProps = {
    activated: false,
};

export default SlideUp;
