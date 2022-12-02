import { useMemo, useState } from 'react';
import PropTypes from 'prop-types';
import VisibilitySensor from 'react-visibility-sensor';
import { motion } from 'framer-motion';
import localStyles from './typing-reveal.module.scss';

/**
 * Replace this with a comment describing the component.
 */
const TypingReveal = ({
    lines,
    typingSpeed,
    fadeSpeed,
    resetWhenNotVisible,
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

    /**
     * Track whether the text should be displayed or not.
     */
    const [textDisplayed, setTextDisplayed] = useState(false);

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
                <div key={`line-${lineIndex}`}>
                    {charSpans}
                    <br/>
                </div>
            );
        });
    }, [lines]);

    //#endregion

    //#region Functions

    /**
     * Handle the visibility change of the component.
     */
    const onVisibilityChanged = (isVisible) => {
        if (!textDisplayed && isVisible) {
            setTextDisplayed(true);
        } else if (textDisplayed && !isVisible && resetWhenNotVisible) {
            setTextDisplayed(false);
        }
    };

    //#endregion

    //#region Render Functions

    /**
     * Main render.
     */
    return (
        <VisibilitySensor onChange={onVisibilityChanged}>
            <motion.span
                {...passThruProps}
                className={`
                    ${localStyles.typingReveal}
                    ${passThruProps?.className}
                `}
                variants={sentenceVariants}
                initial="hidden"
                animate={textDisplayed ? "visible" : "hidden"}
            >
                {lineSpans}
            </motion.span>
        </VisibilitySensor>
    );

    //#endregion
};

TypingReveal.propTypes = {

};

TypingReveal.defaultProps = {
    typingSpeed: 2.5,
    fadeSpeed: 0.5,
    resetWhenNotVisible: true,
};

export default TypingReveal;