import { useMemo } from 'react';
import PropTypes from 'prop-types';
import { motion } from 'framer-motion';
import localStyles from './typing-reveal.module.scss';

/**
 * Replace this with a comment describing the component.
 */
const TypingReveal = ({
    lines,
    typingSpeed,
    fadeSpeed,
    // Pass-thru props
    ...passThruProps
}) => {

    //#region Constants

    /**
     * The variants for the individual letters in the sentence.
     */
    const letterVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                duration: fadeSpeed,
            },
        },
    };

    //#endregion

    //#region State

    //#endregion

    //#region Effects

    //#endregion

    //#region Memoized Values

    /**
     * Memoized total length of the text.
     */
    const totalCharacters = useMemo(() => {
        return lines.reduce(
            (total, line) => total + line.length,
            0
        );
    }, [lines]);

    /**
     * The variants for the sentence as a whole.
     */
    const sentenceVariants = {
        hidden: { opacity: 1 },
        visible: {
            opacity: 1,
            transition: {
                delay: 0.5,
                staggerChildren: typingSpeed / totalCharacters,
            },
        },
    };

    /**
     * Memoized map of each letter in each line to its own `span` element to be animated.
     */
    const lineSpans = useMemo(() => {
        return lines.map((line, lineIndex) => {
            const charSpans = line.split("").map((char, charIndex) => (
                <motion.span
                    key={`line-${lineIndex}-char-${charIndex}`}
                    variants={letterVariants}
                >
                    {char}
                </motion.span>
            ));

            return (
                <>
                    {charSpans}
                    <br/>
                </>
            );
        });
    }, [lines]);

    //#endregion

    //#region Functions

    //#endregion

    //#region Render Functions

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
            animate="visible"
        >
            {lineSpans}
        </motion.span>
    );

    //#endregion
};

TypingReveal.propTypes = {

};

TypingReveal.defaultProps = {
    typingSpeed: 2.5,
    fadeSpeed: 0.5,
};

export default TypingReveal;