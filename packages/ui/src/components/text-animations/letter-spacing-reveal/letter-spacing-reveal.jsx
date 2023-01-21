import PropTypes from 'prop-types';
import { motion } from 'framer-motion';
import localStyles from './letter-spacing-reveal.module.scss';

/**
 * A text reveal component which will fade in while increasing or decreasing the letter spacing.
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
            initial="hidden"
            animate={activated ? 'visible' : 'hidden'}
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
    activated:          false,
    startLetterSpacing: -4,
    endLetterSpacing:   1,
};

export default LetterSpacingReveal;
