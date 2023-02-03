import { useContext } from 'react';
import PropTypes from 'prop-types';
import Color from 'color';
import { Theme } from '@contexts';
import { usePseudoSelectors } from '@hooks/interactions';
import localStyles from './labeled-icon-button.module.scss';

/**
 * Replace this with a comment describing the component.
 */
function LabeledIconButton({
    SvgIcon,
    label,
    onClick,
    color,
    inactiveColor,
    // Pass-thru props
    ...passThruProps
}) {
    // #region Context

    /**
     * Use the theme from context.
     */
    const theme = useContext(Theme);

    // #endregion

    // #region Constants

    /**
     * Various colors for the icon button.
     */
    const baseColor = Color(theme[color] || color);
    const baseInactiveColor = Color(theme[inactiveColor] || inactiveColor);

    // #endregion

    // #region State

    /**
     * Use the pseudo selectors for the icon button.
     */
    const [pseudoSelectorProps, pseudoSelectorStates] = usePseudoSelectors();

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
        <button
            type="button"
            onClick={onClick}
            {...passThruProps}
            {...pseudoSelectorProps}
            className={`
                ${localStyles.labeledIconButton}
                ${passThruProps?.className}
            `}
        >
            <SvgIcon
                style={{
                    fill: pseudoSelectorStates.isHovered || pseudoSelectorStates.isFocused ? baseColor : baseInactiveColor,
                }}
            />
            <span
                style={{
                    color: pseudoSelectorStates.isHovered || pseudoSelectorStates.isFocused ? baseColor : baseInactiveColor,
                }}
            >
                {label}
            </span>
        </button>
    );

    // #endregion
}

LabeledIconButton.propTypes = {
    /**
     * The SVG icon to use for the labeled icon button.
     */
    SvgIcon:            PropTypes.func.isRequired,
    /**
     * The label to display for the labeled icon button.
     */
    label:              PropTypes.string.isRequired,
    /**
     * The color to use for the labeled icon button. Supports any of the formats listed here: https://www.npmjs.com/package/color-string.
     * You can also specify a theme key, specified in the `StyleManager`'s `theme` prop, to use a theme color.
     */
    color:              PropTypes.string,
    /**
     * The callback function to call when the labeled icon button is clicked.
     */
    onClick:            PropTypes.func.isRequired,
    /**
     * The color to use for the labeled icon button when it is inactive.
     * Supports any of the formats listed here: https://www.npmjs.com/package/color-string.
     * You can also specify a theme key, specified in the `StyleManager`'s `theme` prop, to use a theme color.
     */
    inactiveColor:      PropTypes.string,
    /**
     * Any additional props to pass to the internal `button` element.
     *
     * This is not a prop of `passThruProps` -- this is simply a representation of any additional props spread to
     * the `LabeledIconButton` component.
     */
    '...passThruProps': PropTypes.any,
};

LabeledIconButton.defaultProps = {
    color:         'primary',
    inactiveColor: '#757575',
};

export default LabeledIconButton;
