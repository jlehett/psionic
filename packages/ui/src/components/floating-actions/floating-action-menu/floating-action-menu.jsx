import {
    useState, useContext, useRef, useEffect,
} from 'react';
import PropTypes from 'prop-types';
import Color from 'color';
import { motion, AnimatePresence } from 'framer-motion';
import Menu from '@assets/menu.svg';
import Close from '@assets/close.svg';
import { FloatingActionMenuOpen, SetFloatingActionMenuOpen, Theme } from '@contexts';
import { usePseudoSelectors } from '@hooks/interactions';
import {
    getContrastingBWColor,
    getHoveredColor,
} from '@utils/colors';
import { FloatingActionButton } from '@components/floating-actions';
import localStyles from './floating-action-menu.module.scss';

/**
 * An animated floating action menu that can be used to display a floating
 * list of buttons on the bottom right of the screen.
 */
export function FloatingActionMenu({
    MenuIcon,
    openedColor,
    closedColor,
    buttons,
    // Pass-thru props
    ...passThruProps
}) {
    // #region Context

    /**
     * Use the theme from context.
     */
    const theme = useContext(Theme);

    /**
     * Use the floating action menu open state from context.
     */
    const menuOpen = useContext(FloatingActionMenuOpen);

    /**
     * Use the set floating action menu open API from context.
     */
    const setMenuOpen = useContext(SetFloatingActionMenuOpen);

    // #endregion

    // #region Constants

    /**
     * Various colors for the floating action menu.
     */
    const baseOpenedColor = Color(theme[openedColor] || openedColor);
    const baseClosedColor = Color(theme[closedColor] || closedColor);
    const baseOpenedColorLighter = getHoveredColor(baseOpenedColor);
    const baseClosedColorLighter = getHoveredColor(baseClosedColor);

    /**
     * The duration of the open / close animation.
     */
    const animationDuration = 0.2;

    // #endregion

    // #region Refs

    /**
     * Track a reference to the open button.
     */
    const openButton = useRef();

    /**
     * Track a reference to the close button.
     */
    const closeButton = useRef();

    // #endregion

    // #region State

    /**
     * Track the pseudo selectors for the floating action menu.
     */
    const [pseudoSelectorProps, pseudoSelectorStates] = usePseudoSelectors();

    /**
     * Track whether this is the first render or not.
     */
    const [menuToggledAtLeastOnce, setMenuToggledAtLeastOnce] = useState(false);

    // #endregion

    // #region Effects

    /**
     * Whenever the menu is toggled on or off, focus the appropriate button.
     */
    useEffect(() => {
        // If the menu hasn't been toggled at least once yet, don't do anything
        if (!menuToggledAtLeastOnce) {
            return;
        }

        if (menuOpen) {
            closeButton.current.focus();
        } else {
            openButton.current.focus();
        }
    }, [menuOpen]);

    // #endregion

    // #region Functions

    /**
     * Toggles the menu being open.
     */
    const toggleMenu = () => {
        setMenuToggledAtLeastOnce(true);
        setMenuOpen((prev) => !prev);
    };

    /**
     * Get the animation controls for the given button.
     *
     * @param {boolean} forOpenedButton Flag indicating if this is for the opened button
     */
    const getAnimationControls = (forOpenedButton) => ({
        initial: {
            scale:      0,
            opacity:    0,
            rotate:     -90,
            background: forOpenedButton ? baseOpenedColor.string() : baseClosedColor.string(),
        },
        animate: {
            opacity: 1,
            scale:   pseudoSelectorStates.isHovered || pseudoSelectorStates.isFocused ? 1.05 : 1,
            rotate:  0,
            background:
                    forOpenedButton
                        ? pseudoSelectorStates.isHovered
                            ? baseOpenedColorLighter.string()
                            : baseOpenedColor.string()
                        : pseudoSelectorStates.isHovered
                            ? baseClosedColorLighter.string()
                            : baseClosedColor.string(),
        },
        exit: {
            scale:      0,
            opacity:    0,
            rotate:     -90,
            background: forOpenedButton ? baseOpenedColor.string() : baseClosedColor.string(),
        },
        transition: {
            duration: animationDuration,
            rotate:   {
                type:      'spring',
                stiffness: 200,
                damping:   15,
            },
            scale: {
                type:      'spring',
                stiffness: 150,
                damping:   20,
            },
        },
    });

    // #endregion

    // #region Render Functions

    /**
     * Render children.
     */
    const renderButtons = () => {
        const renders = [];
        for (const [index, button] of buttons.entries()) {
            renders.push(
                <FloatingActionButton
                    key={`floating-action-button-${index}`}
                    onClick={button.onClick}
                    menuIndex={index}
                    SvgIcon={button.Icon}
                    color={button.color}
                    ariaLabel={button.ariaLabel}
                />,
            );
        }
        return renders;
    };

    /**
     * Main render.
     */
    return (
        <>
            {/* Opened Button */}
            <AnimatePresence>
                {menuOpen && (
                    <>
                        <motion.button
                            ref={closeButton}
                            onClick={toggleMenu}
                            {...pseudoSelectorProps}
                            {...getAnimationControls(true)}
                            {...passThruProps}
                            className={`
                                ${localStyles.floatingActionMenu}
                                ${passThruProps?.className}
                            `}
                            style={{
                                background: baseClosedColor,
                                ...(passThruProps?.style || {}),
                            }}
                        >
                            <Close
                                style={{
                                    stroke: getContrastingBWColor(baseOpenedColor),
                                    fill:   getContrastingBWColor(baseOpenedColor),
                                }}
                            />
                        </motion.button>
                        {renderButtons()}
                    </>
                )}
            </AnimatePresence>
            {/* Closed Button */}
            <AnimatePresence>
                {!menuOpen && (
                    <motion.button
                        ref={openButton}
                        onClick={toggleMenu}
                        {...pseudoSelectorProps}
                        {...getAnimationControls(false)}
                        {...passThruProps}
                        className={`
                            ${localStyles.floatingActionMenu}
                            ${passThruProps?.className}
                        `}
                        style={{
                            background: baseClosedColor,
                            ...(passThruProps?.style || {}),
                        }}
                    >
                        <MenuIcon
                            style={{
                                stroke: getContrastingBWColor(baseClosedColor),
                                fill:   getContrastingBWColor(baseClosedColor),
                            }}
                        />
                    </motion.button>
                )}
            </AnimatePresence>
        </>
    );

    // #endregion
}

FloatingActionMenu.propTypes = {
    /**
     * The icon to use for the menu button when it is in a closed state.
     * Will display a hamburger menu icon, by default.
     */
    MenuIcon:    PropTypes.func,
    /**
     * The color to use for the background of the button when it is in an
     * opened state.
     * You can also specify a theme key, specified in the `StyleManager`'s `theme` prop, to use a theme color.
     */
    openedColor: PropTypes.string,
    /**
     * The color to use for the background of the button when it is in a
     * closed state.
     * You can also specify a theme key, specified in the `StyleManager`'s `theme` prop, to use a theme color.
     */
    closedColor: PropTypes.string,
    /**
     * The buttons to display when the menu is open.
     */
    buttons:     PropTypes.arrayOf(PropTypes.shape({
        Icon:      PropTypes.func.isRequired,
        onClick:   PropTypes.func.isRequired,
        color:     PropTypes.string,
        ariaLabel: PropTypes.string.isRequired,
    })),
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

FloatingActionMenu.defaultProps = {
    MenuIcon:    Menu,
    openedColor: '#0D0E12',
    closedColor: 'primary',
};

/**
 * Wraps the FloatingActionMenu component in the necessary context providers to handle the open state.
 */
function FloatingActionMenuWrapper(props) {
    const [menuOpen, setMenuOpen] = useState(false);

    return (
        <FloatingActionMenuOpen.Provider value={menuOpen}>
            <SetFloatingActionMenuOpen.Provider value={setMenuOpen}>
                <FloatingActionMenu {...props} />
            </SetFloatingActionMenuOpen.Provider>
        </FloatingActionMenuOpen.Provider>
    );
}

export default FloatingActionMenuWrapper;
