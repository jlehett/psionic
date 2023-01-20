import { useMemo } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Color from 'color';
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
    // Pass-thru props
    ...passThruProps
}) {
    // #region Constants

    /**
     * Various colors for the icon link.
     */
    const baseColor = Color(color);
    const inactiveColor = Color('#757575');

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
     * Main render.
     */
    return (
        <LinkComponent
            className={localStyles.iconLink}
            {...pseudoSelectorProps}
            {...linkComponentProps}
        >
            <SvgIcon
                style={{
                    fill: pseudoSelectorStates.isHovered || pseudoSelectorStates.isFocused ? baseColor : inactiveColor,
                }}
            />
            <span
                style={{
                    color: pseudoSelectorStates.isHovered || pseudoSelectorStates.isFocused ? baseColor : inactiveColor,
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
    SvgIcon:            PropTypes.func.isRequired,
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
     * The color to use for the icon link. Supports any of the formats listed here: https://www.npmjs.com/package/color-string.
     */
    color:              PropTypes.string,
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
    color: '#0072E5',
};

export default IconLink;
