import { useMemo, useContext } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Color from 'color';
import { Theme } from '@contexts';
import { usePseudoSelectors } from '@hooks/interactions';
import localStyles from './icon-link.module.scss';

/**
 * A link that is represented by both an SVG icon and a label. This link
 * can be used in either a relative router link or an absolute link.
 */
function IconLink({
    SvgIcon,
    label,
    to,
    href,
    color,
    inactiveColor,
    disabledColor,
    disabled,
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
     * Various colors for the icon link.
     */
    const baseColor = Color(theme[color] || color);
    const baseInactiveColor = Color(theme[inactiveColor] || inactiveColor);
    const baseDisabledColor = Color(theme[disabledColor] || disabledColor);

    // #endregion

    // #region State

    /**
     * Use the pseudo selectors for the icon link.
     */
    const [pseudoSelectorProps, pseudoSelectorStates] = usePseudoSelectors();

    // #endregion

    // #region Effects

    // #endregion

    // #region Memoized Values

    /**
     * Memoize the link component to use, and the nav prop to pass to it, based on whether a `to` prop was
     * passed or an `href` prop was passed.
     */
    const [LinkComponent, linkComponentProps] = useMemo(() => {
        if (to) {
            return [Link, { to }];
        } if (href) {
            return ['a', { href }];
        }
        throw new Error('Either a `to` or `href` prop must be passed to the `IconLink` component.');
    }, [to, href]);

    // #endregion

    // #region Functions

    // #endregion

    // #region Render Functions

    /**
     * If the `disabled` prop is set, we don't want to render a link component.
     */
    if (disabled) {
        return (
            <span className={localStyles.disabledIconLink}>
                <SvgIcon
                    style={{
                        fill: baseDisabledColor,
                    }}
                />
                <span
                    style={{
                        color: baseDisabledColor,
                    }}
                >
                    {label}
                </span>
            </span>
        );
    }

    /**
     * Main render.
     */
    return (
        <LinkComponent
            {...passThruProps}
            className={`
                ${localStyles.iconLink}
                ${passThruProps?.iconLink}
            `}
            {...pseudoSelectorProps}
            {...linkComponentProps}
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
        </LinkComponent>
    );

    // #endregion
}

IconLink.propTypes = {
    /**
     * The SVG icon to use for the icon link.
     */
    SvgIcon:            PropTypes.oneOfType([PropTypes.func, PropTypes.object]).isRequired,
    /**
     * The label to display for the icon link.
     */
    label:              PropTypes.string.isRequired,
    /**
     * The relative URL to navigate to when the icon link is clicked. This prop is mutually exclusive with the
     * `href` prop. If neither prop is passed, an error will be thrown.
     * See https://reactrouter.com/web/api/Link
     */
    to:                 PropTypes.string,
    /**
     * The absolute URL to navigate to when the icon link is clicked. This prop is mutually exclusive with the
     * `to` prop. If neither prop is passed, an error will be thrown.
     */
    href:               PropTypes.string,
    /**
     * Flag indicating whether the icon link is disabled. A disabled icon link will not be clickable.
     */
    disabled:           PropTypes.bool,
    /**
     * The color to use for the icon link. Supports any of the formats listed here: https://www.npmjs.com/package/color-string.
     * You can also specify a theme key, specified in the `StyleManager`'s `theme` prop, to use a theme color.
     */
    color:              PropTypes.string,
    /**
     * The color to use for the icon link when it is inactive.
     * Supports any of the formats listed here: https://www.npmjs.com/package/color-string.
     * You can also specify a theme key, specified in the `StyleManager`'s `theme` prop, to use a theme color.
     */
    inactiveColor:      PropTypes.string,
    /**
     * The color to use for the icon link when it is disabled.
     * Supports any of the formats listed here: https://www.npmjs.com/package/color-string.
     * You can also specify a theme key, specified in the `StyleManager`'s `theme` prop, to use a theme color.
     */
    disabledColor:      PropTypes.string,
    /**
     * Any additional props to pass to the internal `Link` or `a` element (depending on whether the `to` or `href` prop
     * is used, respectively).
     *
     * This is not a prop of `passThruProps` -- this is simply a representation of any additional props spread to
     * the `IconLink` component.
     */
    '...passThruProps': PropTypes.any,
};

IconLink.defaultProps = {
    color:         'primary',
    inactiveColor: '#757575',
    disabledColor: '#454545',
};

export default IconLink;
