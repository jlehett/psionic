import { useMemo } from 'react';
import PropTypes from 'prop-types';
import { motion } from 'framer-motion';
import localStyles from './bouncing-text.module.scss';

/**
 * A text animation that will bounce the individual characters in the given lines of text in a
 * wave-like pattern.
 */
const BouncingText = ({
    lines,
    bounceSpeed,
    waveGranularity,
    amplitude,
    frequency,
    // Pass Thru Props
    ...passThruProps
}) => {

    //#region Constants

    /**
     * The variants for the individual letters in the sentence.
     */
    const letterVariants = {
        active: {
            y: ['0px', `-${amplitude}px`, '0px'],
            transition: {
                duration: bounceSpeed,
                repeat: Infinity,
                repeatDelay: waveGranularity * frequency,
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
        active: {
            transition: {
                staggerChildren: waveGranularity / totalCharacters,
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
                    className={char === ' ' ? localStyles.spaceChar : localStyles.nonSpaceChar}
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

    //#endregion

    //#region Render Functions

    /**
     * Main render.
     */
    return (
        <motion.span
            {...passThruProps}
            className={`
                ${localStyles.bouncingText}
                ${passThruProps?.className}
            `}
            style={{
                gap: `${amplitude}px`,
                ...passThruProps?.style,
            }}
            variants={sentenceVariants}
            initial="active"
            animate="active"
        >
            {lineSpans}
        </motion.span>
    );

    //#endregion
};

BouncingText.propTypes = {
    /**
     * The lines of text to display as part of the animation.
     */
    lines: PropTypes.arrayOf(PropTypes.string).isRequired,
    /**
     * The number of seconds it takes an individual letter to bounce up and down during a wave.
     */
    bounceSpeed: PropTypes.number,
    /**
     * The granularity of the wave -- the higher the number, the more granular the wave (i.e., the characters'
     * heights will have more variance between them).
     */
    waveGranularity: PropTypes.number,
    /**
     * The height at which the letters will bounce, in pixels.
     */
    amplitude: PropTypes.number,
    /**
     * The number of waves that will run at once.
     */
    frequency: PropTypes.number,
    /**
     * Any additional props to pass through to the internal span used to wrap the individual character
     * spans of the text.
     *
     * This is not a prop of `passThruProps` -- this is simply a representation of any
     * additional props passed to the `BouncingText` component that aren't covered above.
     */
    "...passThruProps": PropTypes.any,
};

BouncingText.defaultProps = {
    bounceSpeed: 0.5,
    waveGranularity: 0.75,
    amplitude: 8,
    frequency: 1.0,
};

export default BouncingText;