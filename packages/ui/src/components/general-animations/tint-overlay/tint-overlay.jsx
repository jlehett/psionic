import PropTypes from 'prop-types';
import Color from 'color';
import localStyles from './tint-overlay.module.scss';

/**
 * A wrapper that can be used to animate a tint overlay effect on a component.
 */
function TintOverlay({
    children,
    color,
    activated,
    animationSpeed,
    // Pass-thru props
    ...passThruProps
}) {
    // #region Constants

    /**
     * Various colors for the tint overlay.
     */
    const baseColor = Color(color);

    // #endregion

    // #region State

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
            data-activated={activated}
            {...passThruProps}
            className={`
                ${localStyles.tintOverlay}
                ${passThruProps?.className}
            `}
        >
            <span
                className={localStyles.overlay}
                style={{
                    background: baseColor.string(),
                    transition: `transform ${animationSpeed}s cubic-bezier(.215, .61, .355, 1)`,
                }}
            />
            {children}
        </div>
    );

    // #endregion
}

TintOverlay.propTypes = {
    /**
     * The children to render with the tint overlay animation.
     */
    children:           PropTypes.any.isRequired,
    /**
     * The color of the tint overlay. Supports any of the formats listed here: https://www.npmjs.com/package/color-string.
     */
    color:              PropTypes.string,
    /**
     * Flag indicating whether the tint overlay should be activated.
     */
    activated:          PropTypes.bool,
    /**
     * The number of seconds it should take the animation to complete.
     */
    animationSpeed:     PropTypes.number,
    /**
     * Any additional props to pass through to the wrapping div.
     *
     * This is not a prop of `passThruProps` -- this is simply a representation of any additional props
     * passed to the `TintOverlay` component that aren't covered above.
     */
    '...passThruProps': PropTypes.any,
};

TintOverlay.defaultProps = {
    color:          '#0072E5',
    activated:      false,
    animationSpeed: 0.6,
};

export default TintOverlay;
