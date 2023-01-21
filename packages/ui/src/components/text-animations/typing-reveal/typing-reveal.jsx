import { useMemo } from 'react';
import PropTypes from 'prop-types';
import { motion } from 'framer-motion';
import localStyles from './typing-reveal.module.scss';

/**
 * A text reveal component which will slowly type out the individual characters in the
 * given lines of text while fading them into view.
 */
function TypingReveal({
    lines,
    typingSpeed,
    fadeSpeed,
    activated,
    // Pass-thru props
    ...passThruProps
}) {
    // #region Constants

    /**
     * The variants for the individual letters in the sentence.
     */
    const letterVariants = {
        hidden: {
            opacity:    0,
            transition: {
                duration: fadeSpeed,
            },
        },
        visible: {
            opacity:    1,
            transition: {
                duration: fadeSpeed,
            },
        },
    };

    // #endregion

    // #region State

    // #endregion

    // #region Effects

    // #endregion

    // #region Memoized Values

    /**
     * Memoized total length of the text.
     */
    const totalCharacters = useMemo(() => lines.reduce(
        (total, line) => total + line.length,
        0,
    ), [lines]);

    /**
     * The variants for the sentence as a whole.
     */
    const sentenceVariants = {
        hidden: {
            transition: {
                delay:           0.5,
                staggerChildren: typingSpeed / totalCharacters,
            },
        },
        visible: {
            transition: {
                delay:           0.5,
                staggerChildren: typingSpeed / totalCharacters,
            },
        },
    };

    /**
     * Memoized map of each letter in each line to its own `span` element to be animated.
     */
    const lineSpans = useMemo(() => lines.map((line, lineIndex) => {
        const charSpans = line.split('').map((char, charIndex) => (
            <motion.span
                key={`line-${lineIndex}-char-${charIndex}`}
                variants={letterVariants}
            >
                {char}
            </motion.span>
        ));

        return (
            <div key={`line-${lineIndex}`}>
                {charSpans}
                <br />
            </div>
        );
    }), [lines]);

    // #endregion

    // #region Functions

    // #endregion

    // #region Render Functions

    /**
     * Main render.
     */
    return (
        <motion.span
            {...passThruProps}
            className={`
                ${localStyles.typingReveal}
                ${passThruProps?.className}
            `}
            variants={sentenceVariants}
            initial="hidden"
            animate={activated ? 'visible' : 'hidden'}
        >
            {lineSpans}
        </motion.span>
    );

    // #endregion
}

TypingReveal.propTypes = {
    /**
     * The lines of text to display.
     */
    lines:              PropTypes.arrayOf(PropTypes.string).isRequired,
    /**
     * The number of seconds it should take to fully type out all of the lines.
     */
    typingSpeed:        PropTypes.number,
    /**
     * The number of seconds it should take for each individual letter to fade in.
     */
    fadeSpeed:          PropTypes.number,
    /**
     * Flag indicating whether the animation should be activated.
     */
    activated:          PropTypes.bool,
    /**
     * Any additional props to pass through to the internal span used to wrap the individual character
     * spans of the text.
     *
     * This is not a prop of `passThruProps` -- this is simply a representation of any
     * additional props passed to the `TypingReveal` component that aren't covered above.
     */
    '...passThruProps': PropTypes.any,
};

TypingReveal.defaultProps = {
    typingSpeed: 2.5,
    fadeSpeed:   0.5,
    activated:   false,
};

export default TypingReveal;
