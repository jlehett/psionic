import PropTypes from 'prop-types';
import { motion } from 'framer-motion';
import localStyles from './slide-up.module.scss';

/**
 * A wrapper that can be used to animate a slide up effect on a component. The `visible` and `hidden` Framer
 * Motion variants can be overridden with props to easily create other slide animations.
 *
 * This component utilizes the following variant names: `visible` (for when the component should be visible on the
 * screen) and `hidden` (for when the component should be hidden off the screen). These variants can be used
 * in parent components to support orchestration such as staggered animations. If you are going to be using these
 * variants in parent components, you can simply leave the `activated` prop as `undefined` and the component will
 * automatically sync with the parent component's variants (as long as they are named the same).
 */
function SlideUp({
    children,
    activated,
    hiddenVariantOverride,
    visibleVariantOverride,
    // Pass-thru props
    ...passThruProps
}) {
    // #region Constants

    /**
     * The variants for the animation.
     */
    const variants = {
        hidden: hiddenVariantOverride === undefined
            ? {
                y:          '100%',
                transition: {
                    duration: 0.65,
                    ease:     [0.25, 0.46, 0.45, 0.94],
                },
            }
            : hiddenVariantOverride,
        visible: visibleVariantOverride === undefined
            ? {
                y:          '0%',
                transition: {
                    duration: 0.65,
                    ease:     [0.25, 0.46, 0.45, 0.94],
                },
            }
            : visibleVariantOverride,
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
                initial={activated === undefined ? undefined : 'hidden'}
                animate={
                    activated === undefined
                        ? undefined
                        : activated ? 'visible' : 'hidden'
                }
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
    children:               PropTypes.any.isRequired,
    /**
     * Flag indicating whether the animation should be activated or not.
     */
    activated:              PropTypes.bool,
    /**
     * Override for the Framer Motion `hidden` variant that is used by this component.
     */
    hiddenVariantOverride:  PropTypes.object,
    /**
     * Override for the Framer Motion `visible` variant that is used by this component.
     */
    visibleVariantOverride: PropTypes.object,
    /**
     * Any additional props to pass through to the wrapping div.
     *
     * This is not a prop of `passThruProps` -- this is simply a representation of any additional props
     * passed to the `SlideUp` component that aren't covered above.
     */
    '...passThruProps':     PropTypes.any,
};

SlideUp.defaultProps = {
    activated:              undefined,
    hiddenVariantOverride:  undefined,
    visibleVariantOverride: undefined,
};

export default SlideUp;
