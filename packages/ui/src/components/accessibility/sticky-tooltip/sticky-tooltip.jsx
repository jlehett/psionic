import {
    useState, useRef, useMemo, useEffect,
} from 'react';
import PropTypes from 'prop-types';
import { useMousePos } from '@hooks/interactions';
import localStyles from './sticky-tooltip.module.scss';

/**
 * Used as a wrapper around React components to provide a tooltip that moves with the user's
 * cursor when the given React child components are hovered.
 *
 * As long as the tooltip's content is smaller than the dimensions of the viewport, the
 * tooltip will never extend beyond the viewport as the user's cursor moves, regardless
 * of the tooltip's offsets.
 */
function StickyTooltip({
    children,
    content,
    delay,
    yOffset,
    xOffset,
    marginX,
    marginY,
    // Pass-thru Props
    ...passThruProps
}) {
    // #region Constants

    // #endregion

    // #region Misc Hooks

    /**
     * Track the user's mouse position in state.
     */
    const [mouseX, mouseY] = useMousePos();

    // #endregion

    // #region Refs

    /**
     * Use a ref to the tooltip component.
     */
    const tooltipRef = useRef();

    /**
     * Use a ref to the delay timeout.
     */
    const delayTimeout = useRef();

    // #endregion

    // #region State

    /**
     * Track whether the component is being hovered or not.
     */
    const [isHovered, setIsHovered] = useState(false);

    /**
     * Track whether the tooltip is displayed or not.
     */
    const [tooltipDisplayed, setTooltipDisplayed] = useState(false);

    // #endregion

    // #region Effects

    /**
     * Whenever the `isHovered` state is set to `true`, create a timeout function
     * to set the `tooltipDisplayed` state to `true` after the delay occurs.
     */
    useEffect(() => {
        // If the element is not longer being hovered, immediately turn the tooltip display off
        if (!isHovered) {
            setTooltipDisplayed(false);
            // Clear the delay timeout if one exists as well
            clearDelayTimeout();
        }
        // Otherwise, create a timeout function to turn the display on after the set amount of time
        else {
            // Clear the existing timeout function first, if it exists
            clearDelayTimeout();
            // If a delay value has been provided, create the new timeout function
            if (delay) {
                delayTimeout.current = setTimeout(() => {
                    setTooltipDisplayed(true);
                }, delay);
            }
            // Otherwise, immediately set the tooltip display to `true`
            else {
                setTooltipDisplayed(true);
            }
        }
    }, [isHovered]);

    // #endregion

    // #region Memoized Values

    /**
     * Memoize the x position of the tooltip's left-hand side.
     */
    const tooltipLeftPos = useMemo(() => {
        if (
            mouseX + xOffset - (tooltipRef?.current?.offsetWidth || 0) / 2 >= marginX
            && mouseX + xOffset + (tooltipRef?.current?.offsetWidth || 0) / 2 <= window.innerWidth - marginX * 2
        ) {
            return mouseX + xOffset - (tooltipRef?.current?.offsetWidth || 0) / 2;
        } if (mouseX + xOffset - (tooltipRef?.current?.offsetWidth || 0) / 2 <= marginX) {
            return marginX;
        }
        return window.innerWidth - marginX * 2 - (tooltipRef?.current?.offsetWidth || 0);
    }, [mouseX, marginX]);

    /**
     * Memoize the y position of the tooltip's top side.
     */
    const tooltipTopPos = useMemo(() => {
        if (
            mouseY + yOffset >= marginY
            && mouseY + yOffset + (tooltipRef?.current?.offsetHeight || 0) <= window.innerHeight - marginY
        ) {
            return mouseY + yOffset;
        } if (mouseY + yOffset <= marginY) {
            return marginY;
        }
        return window.innerHeight - marginY - (tooltipRef?.current?.offsetHeight || 0);
    }, [mouseY, marginY]);

    // #endregion

    // #region Functions

    /**
     * Clears out the existing delay timeout function, if one exists.
     */
    const clearDelayTimeout = () => {
        if (delayTimeout.current) {
            clearTimeout(delayTimeout.current);
        }
    };

    // #endregion

    // #region Render Functions

    /**
     * Main render.
     */
    return (
        <>
            <div
                className={localStyles.wrapper}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
            >
                {children}
            </div>
            <div
                ref={tooltipRef}
                data-is-hovered={tooltipDisplayed}
                {...passThruProps}
                className={`
                    ${localStyles.tooltip}
                    ${passThruProps?.className}
                `}
                style={{
                    left: `${tooltipLeftPos}px`,
                    top:  `${tooltipTopPos}px`,
                    ...(passThruProps?.style || {}),
                }}
            >
                {content}
            </div>
        </>
    );

    // #endregion
}

StickyTooltip.propTypes = {
    /**
     * The React component(s) to render w/ the sticky tooltip attached.
     */
    children:           PropTypes.any.isRequired,
    /**
     * The content to render within the sticky tooltip itself. This could be a simple string
     * or a React component / fragment.
     */
    content:            PropTypes.any.isRequired,
    /**
     * Optionally specify the amount of time (in milliseconds) to delay before the sticky
     * tooltip is shown when the React children are hovered. Note that this does NOT add a
     * delay to hiding the tooltip when the React children are no longer hovered.
     */
    delay:              PropTypes.number,
    /**
     * Optionally specify a custom y-offset for where the sticky tooltip should be displayed
     * in relation to the user's cursor. As mentioned above, regardless of what this value is,
     * as long as the dimensions of the tooltip's content aren't larger than the size of the
     * user's viewport, the tooltip will never extend beyond the viewport.
     */
    yOffset:            PropTypes.number,
    /**
     * Optionally specify a custom x-offset for where the sticky tooltip should be displayed
     * in relation to the user's cursor. As mentioned above, regardless of what this value is,
     * as long as the dimensions of the tooltip's content aren't larger than the size of the
     * user's viewport, the tooltip will never extend beyond the viewport.
     */
    xOffset:            PropTypes.number,
    /**
     * The width of the viewport's horizontal margin in pixels to use. The tooltip will not extend past the viewport
     * w/ the given margin when the user moves their cursor, as long as the tooltip itself does not
     * exceed the viewport + margin dimensions.
     */
    marginX:            PropTypes.number,
    /**
     * The width of the viewport's vertical margin in pixels to use. The tooltip will not extend past the viewport
     * w/ the given margin when the user moves their cursor, as long as the tooltip itself does not
     * exceed the viewport + margin dimensions.
     */
    marginY:            PropTypes.number,
    /**
     * Any additional props to pass through to the internal div used for the
     * sticky tooltip itself. The `content` gets rendered as a direct child of the
     * HTML element these props are spread to.
     *
     * This is not a prop of `passThruProps` -- this is simply a representation of any
     * additional props passed to the `StickyTooltip` component that aren't covered above.
     */
    '...passThruProps': PropTypes.any,
};

StickyTooltip.defaultProps = {
    delay:   null,
    yOffset: 20,
    xOffset: 0,
    marginX: 8,
    marginY: 8,
};

export default StickyTooltip;
