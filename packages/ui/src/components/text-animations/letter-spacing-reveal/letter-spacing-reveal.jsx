import PropTypes from 'prop-types';
import { motion } from 'framer-motion';
import VisibilitySensor from 'react-visibility-sensor';
import { useVisibilitySensorWithResetDelay } from '@hooks/interactions';
import localStyles from './letter-spacing-reveal.module.scss';

/**
 * A text reveal component which will fade in while increasing or decreasing the letter spacing.
 *
 * The text reveal will only occur once the component is visible in the viewport.
 */
const LetterSpacingReveal = ({
    children,
    animationSpeed,
    resetDelay,
    startLetterSpacing,
    endLetterSpacing,
    // Pass-thru props
    ...passThruProps
}) => {

    //#region Constants

    /**
     * The variants for the animation.
     */
    const animationVariants = {
        hidden: {
            opacity: 0,
            letterSpacing: `${startLetterSpacing}px`,
            transition: {
                duration: 0,
            },
        },
        visible: {
            opacity: 1,
            letterSpacing: `${endLetterSpacing}px`,
            transition: {
                duration: animationSpeed,
            },
        },
    };

    //#endregion

    //#region State

    /**
     * Track the visibility of the component with a reset delay.
     */
    const [isVisible, onVisibilityChanged] = useVisibilitySensorWithResetDelay(resetDelay);

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
        <VisibilitySensor onChange={onVisibilityChanged}>
            <motion.div
                {...passThruProps}
                className={`
                    ${localStyles.letterSpacingReveal}
                    ${passThruProps?.className}
                `}
                variants={animationVariants}
                initial="hidden"
                animate={isVisible ? 'visible' : 'hidden'}
            >
                {children}
            </motion.div>
        </VisibilitySensor>
    );

    //#endregion
};

LetterSpacingReveal.propTypes = {
    /**
     * The children to render as part of the letter spacing reveal. Only text which doesn't have a letter spacing override
     * within children will be affected by the letter spacing reveal.
     */
    children: PropTypes.any.isRequired,
    /**
     * The number of seconds it should take the animation to complete.
     */
    animationSpeed: PropTypes.number,
    /**
     * The number of seconds to delay the reset of the text reveal when it is no longer visible. If the text
     * is visible again before the reset delay has elapsed, then the reset will be canceled. If this is set to
     * `0`, then the reset will happen immediately. If this is set to `Infinity`, then the reset will never
     * happen.
     */
    resetDelay: PropTypes.number,
    /**
     * The starting letter spacing, in pixels, to use for the animation.
     */
    startLetterSpacing: PropTypes.number,
    /**
     * The ending letter spacing, in pixels, to use for the animation.
     */
    endLetterSpacing: PropTypes.number,
    /**
     * Any additional props to pass through to the internal div used to wrap the children.
     *
     * This is not a prop of `passThruProps` -- this is simply a representation of any
     * additional props passed to the `LetterSpacingReveal` component that aren't covered above.
     */
    "...passThruProps": PropTypes.any,
};

LetterSpacingReveal.defaultProps = {
    animationSpeed: 0.75,
    resetDelay: Infinity,
    startLetterSpacing: -4,
    endLetterSpacing: 1,
};

export default LetterSpacingReveal;