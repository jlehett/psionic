import PropTypes from 'prop-types';
import { motion } from 'framer-motion';
import localStyles from './letter-spacing-reveal.module.scss';

/**
 * A text reveal component which will fade in while increasing or decreasing the letter spacing.
 *
 * This component utilizes the following variant names: `visible` (for when the component should be visible on the
 * screen) and `hidden` (for when the component should be hidden off the screen). These variants can be used
 * in parent components to support orchestration such as staggered animations. If you are going to be using these
 * variants in parent components, you can simply leave the `activated` prop as `undefined` and the component will
 * automatically sync with the parent component's variants (as long as they are named the same).
 */
function LetterSpacingReveal({
    children,
    animationSpeed,
    activated,
    startLetterSpacing,
    endLetterSpacing,
    // Pass-thru props
    ...passThruProps
}) {
    // #region Constants

    /**
     * The variants for the animation.
     */
    const animationVariants = {
        hidden: {
            opacity:       0,
            letterSpacing: `${startLetterSpacing}px`,
            transition:    {
                duration: animationSpeed,
            },
        },
        visible: {
            opacity:       1,
            letterSpacing: `${endLetterSpacing}px`,
            transition:    {
                duration: animationSpeed,
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
        <motion.div
            {...passThruProps}
            className={`
                ${localStyles.letterSpacingReveal}
                ${passThruProps?.className}
            `}
            variants={animationVariants}
            initial={activated === undefined ? undefined : 'hidden'}
            animate={
                activated === undefined
                    ? undefined
                    : activated ? 'visible' : 'hidden'
            }
        >
            {children}
        </motion.div>
    );

    // #endregion
}

LetterSpacingReveal.propTypes = {
    /**
     * The children to render as part of the letter spacing reveal. Only text which doesn't have a letter spacing override
     * within children will be affected by the letter spacing reveal.
     */
    children:           PropTypes.any.isRequired,
    /**
     * The number of seconds it should take the animation to complete.
     */
    animationSpeed:     PropTypes.number,
    /**
     * Flag indicating whether the animation should be activated.
     */
    activated:          PropTypes.bool,
    /**
     * The starting letter spacing, in pixels, to use for the animation.
     */
    startLetterSpacing: PropTypes.number,
    /**
     * The ending letter spacing, in pixels, to use for the animation.
     */
    endLetterSpacing:   PropTypes.number,
    /**
     * Any additional props to pass through to the internal div used to wrap the children.
     *
     * This is not a prop of `passThruProps` -- this is simply a representation of any
     * additional props passed to the `LetterSpacingReveal` component that aren't covered above.
     */
    '...passThruProps': PropTypes.any,
};

LetterSpacingReveal.defaultProps = {
    animationSpeed:     0.75,
    activated:          undefined,
    startLetterSpacing: -4,
    endLetterSpacing:   1,
};

export default LetterSpacingReveal;
