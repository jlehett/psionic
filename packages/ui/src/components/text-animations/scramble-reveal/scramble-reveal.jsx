import { useMemo, useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import map from 'lodash/map';
import range from 'lodash/range';
import localStyles from './scramble-reveal.module.scss';

/**
 * A text reveal component which will scramble or unscramble the individual characters in the given lines of text.
 */
function ScrambleReveal({
    lines,
    iterationSpeed,
    iterationsPerCharacter,
    activated,
    // Pass-thru props
    ...passThruProps
}) {
    // #region Refs

    /**
     * Track a ref to the wrapper element.
     */
    const wrapperRef = useRef(null);

    /**
     * Track a ref to the iteraction count.
     */
    const iterationsRef = useRef(
        activated
            ? 0
            : lines.reduce(
                (total, line) => total + line.length,
                0,
            ) * iterationsPerCharacter,
    );

    /**
     * Track a ref to the activated flag.
     */
    const activatedRef = useRef(activated);

    // #endregion

    // #region Constants

    /**
     * The letters to use for the scramble.
     */
    const LETTERS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';

    // #endregion

    // #region State

    // #endregion

    // #region Effects

    /**
     * When the component mounts, start an interval that will start tracking iterations.
     * When the component unmounts, clear the interval.
     */
    useEffect(() => {
        iterate();

        const interval = setInterval(
            iterate,
            iterationSpeed,
        );

        return () => clearInterval(interval);
    }, []);

    /**
     * Whenever the `activated` prop updates, update the ref.
     */
    useEffect(() => {
        activatedRef.current = activated;
    }, [activated]);

    // #endregion

    // #region Memoized Values

    /**
     * Memoized total length of each line of text.
     */
    const totalCharactersPerLine = useMemo(() => map(
        lines,
        (line) => line.length,
    ), [lines]);

    /**
     * Memoized total length of the text.
     */
    const totalCharacters = useMemo(() => totalCharactersPerLine.reduce(
        (total, lineLength) => total + lineLength,
        0,
    ), [totalCharactersPerLine]);

    // #endregion

    // #region Functions

    /**
     * Get the current character and line index for the current iteration.
     */
    const getCurrentCharacterIndex = () => {
        const totalIndexNumber = Math.floor(iterationsRef.current / iterationsPerCharacter);
        let indexRemainder = totalIndexNumber;
        for (let lineIndex = 0; lineIndex < lines.length; lineIndex++) {
            if (indexRemainder <= totalCharactersPerLine[lineIndex]) {
                return {
                    line:      lineIndex,
                    character: indexRemainder,
                };
            }
            indexRemainder -= totalCharactersPerLine[lineIndex];
        }
    };

    /**
     * Perform a forward iteraction if activated, or a backward iteration if not.
     */
    const iterate = () => {
        if (activatedRef.current) {
            if (iterationsRef.current < totalCharacters * iterationsPerCharacter) {
                iterationsRef.current += 1;
            }
        } else if (iterationsRef.current > 0) {
            iterationsRef.current -= 1;
        }

        const { line, character } = getCurrentCharacterIndex();
        if (wrapperRef.current) {
            for (let lineRunner = 0; lineRunner < lines.length; lineRunner++) {
                const lineElement = wrapperRef.current.children[lineRunner];
                const numCharactersToReveal = lineRunner === line
                    ? character
                    : lineRunner < line
                        ? totalCharactersPerLine[lineRunner]
                        : 0;
                const revealedSubstring = lines[lineRunner].substring(0, numCharactersToReveal);
                const scrambledSubstring = map(range(totalCharactersPerLine[lineRunner] - numCharactersToReveal), () => LETTERS[Math.floor(Math.random() * LETTERS.length)]).join('');
                lineElement.innerText = `${revealedSubstring}${scrambledSubstring}`;
            }
        }
    };

    // #endregion

    // #region Render Functions

    /**
     * Render the lines of text.
     */
    const lineElements = () => {
        const elements = [];

        for (const [lineNum, line] of lines.entries()) {
            elements.push(
                <div key={`line-${lineNum}`}>
                    {line}
                </div>,
            );
        }

        return elements;
    };

    /**
     * Main render.
     */
    return (
        <span
            {...passThruProps}
            className={`
                ${localStyles.scrambleReveal}
                ${passThruProps?.className}
            `}
            ref={wrapperRef}
        >
            {lineElements()}
        </span>
    );

    // #endregion
}

ScrambleReveal.propTypes = {
    /**
     * The lines of text to display.
     */
    lines:                  PropTypes.arrayOf(PropTypes.string).isRequired,
    /**
     * The number of seconds it takes to complete a single iteration of the animation. During an iteration, each unrevealed character
     * in the text will be randomized.
     */
    iterationSpeed:         PropTypes.number,
    /**
     * The number of iterations to perform before revealing each character.
     */
    iterationsPerCharacter: PropTypes.number,
    /**
     * Flag indicating whether the animation should be activated.
     */
    activated:              PropTypes.bool,
    /**
     * Any additional props to pass through to the internal span used to wrap the individual divs of text.
     *
     * This is not a prop of `passThruProps` -- this is simply a representation of any additional props passed
     * to the `ScrambleReveal` component that aren't covered above.
     */
    '...passThruProps':     PropTypes.any,
};

ScrambleReveal.defaultProps = {
    activated:              false,
    iterationSpeed:         30,
    iterationsPerCharacter: 3,
};

export default ScrambleReveal;
