import { useState, useContext } from 'react';
import PropTypes from 'prop-types';
import Color from 'color';
import { motion, AnimatePresence, m } from 'framer-motion';
import Menu from '@assets/menu.svg';
import Close from '@assets/close.svg';
import { FloatingActionMenuOpen, SetFloatingActionMenuOpen } from '@contexts';
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
export const FloatingActionMenu = ({
    MenuIcon,
    openedColor,
    closedColor,
    buttons,
}) => {

    //#region Constants

    /**
     * Various colors for the floating action menu.
     */
    const baseOpenedColor = Color(openedColor);
    const baseClosedColor = Color(closedColor);
    const baseOpenedColorLighter = getHoveredColor(baseOpenedColor);
    const baseClosedColorLighter = getHoveredColor(baseClosedColor);

    /**
     * The duration of the open / close animation.
     */
    const animationDuration = 0.2;

    //#endregion

    //#region Context

    /**
     * Use the floating action menu open state from context.
     */
    const menuOpen = useContext(FloatingActionMenuOpen);

    /**
     * Use the set floating action menu open API from context.
     */
    const setMenuOpen = useContext(SetFloatingActionMenuOpen);

    //#endregion

    //#region State

    /**
     * Track whether the floating action menu is hovered.
     */
    const [isHovered, setIsHovered] = useState(false);

    //#endregion

    //#region Effects

    //#endregion

    //#region Functions

    /**
     * Toggles the menu being open.
     */
    const toggleMenu = () => {
        setMenuOpen(prev => !prev);
    };

    /**
     * Get the animation controls for the given button.
     *
     * @param {boolean} forOpenedButton Flag indicating if this is for the opened button
     */
    const getAnimationControls = (forOpenedButton) => {
        return {
            initial: {
                scale: 0,
                opacity: 0,
                rotate: -90,
                background: forOpenedButton ? baseOpenedColor.string() : baseClosedColor.string(),
            },
            animate: {
                opacity: 1,
                scale: isHovered ? 1.05 : 1,
                rotate: 0,
                background:
                    forOpenedButton
                        ? isHovered
                            ? baseOpenedColorLighter.string()
                            : baseOpenedColor.string()
                        : isHovered
                            ? baseClosedColorLighter.string()
                            : baseClosedColor.string()
            },
            exit: {
                scale: 0,
                opacity: 0,
                rotate: -90,
                background: forOpenedButton ? baseOpenedColor.string() : baseClosedColor.string(),
            },
            transition: {
                duration: animationDuration,
                rotate: {
                    type: 'spring',
                    stiffness: 200,
                    damping: 15,
                },
                scale: {
                    type: 'spring',
                    stiffness: 150,
                    damping: 20,
                }
            },
        };
    };

    //#endregion

    //#region Render Functions

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
                />
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
                            className={localStyles.floatingActionMenu}
                            style={{ background: baseOpenedColor }}
                            onClick={toggleMenu}
                            onMouseEnter={() => setIsHovered(true)}
                            onMouseLeave={() => setIsHovered(false)}
                            {...getAnimationControls(true)}
                        >
                            <Close
                                style={{
                                    stroke: getContrastingBWColor(baseOpenedColor),
                                    fill: getContrastingBWColor(baseOpenedColor),
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
                        className={localStyles.floatingActionMenu}
                        style={{ background: baseClosedColor }}
                        onClick={toggleMenu}
                        onMouseEnter={() => setIsHovered(true)}
                        onMouseLeave={() => setIsHovered(false)}
                        {...getAnimationControls(false)}
                    >
                        <MenuIcon
                            style={{
                                stroke: getContrastingBWColor(baseClosedColor),
                                fill: getContrastingBWColor(baseClosedColor),
                            }}
                        />
                    </motion.button>
                )}
            </AnimatePresence>
        </>
    );

    //#endregion
};

FloatingActionMenu.propTypes = {
    /**
     * The icon to use for the menu button when it is in a closed state.
     * Will display a hamburger menu icon, by default.
     */
    MenuIcon: PropTypes.func,
    /**
     * The color to use for the background of the button when it is in an
     * opened state.
     */
    openedColor: PropTypes.string,
    /**
     * The color to use for the background of the button when it is in a
     * closed state.
     */
    closedColor: PropTypes.string,
    /**
     * The buttons to display when the menu is open.
     */
    buttons: PropTypes.arrayOf(PropTypes.shape({
        Icon: PropTypes.func.isRequired,
        onClick: PropTypes.func.isRequired,
        color: PropTypes.string,
    })),
};

FloatingActionMenu.defaultProps = {
    MenuIcon: Menu,
    openedColor: '#0D0E12',
    closedColor: '#0072E5'
};

/**
 * Wraps the FloatingActionMenu component in the necessary context providers to handle the open state.
 */
const FloatingActionMenuWrapper = (props) => {
    const [menuOpen, setMenuOpen] = useState(false);

    return (
        <FloatingActionMenuOpen.Provider value={menuOpen}>
            <SetFloatingActionMenuOpen.Provider value={setMenuOpen}>
                <FloatingActionMenu {...props}/>
            </SetFloatingActionMenuOpen.Provider>
        </FloatingActionMenuOpen.Provider>
    );
};

export default FloatingActionMenuWrapper;