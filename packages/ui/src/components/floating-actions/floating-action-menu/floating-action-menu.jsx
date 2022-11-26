import { useState } from 'react';
import PropTypes from 'prop-types';
import Color from 'color';
import { motion, AnimatePresence, m } from 'framer-motion';
import Menu from '@assets/menu.svg';
import Close from '@assets/close.svg';
import {
    getContrastingBWColor,
    blackHasBetterContrastThanWhite,
} from '@utils/colors';
import localStyles from './floating-action-menu.module.scss';

/**
 * Replace this with a comment describing the component.
 */
const FloatingActionMenu = ({
    MenuIcon,
    openedColor,
    closedColor,
}) => {

    //#region Constants

    /**
     * Various colors for the floating action menu.
     */
    const baseOpenedColor = Color(openedColor);
    const baseClosedColor = Color(closedColor);
    const baseOpenedColorLighter = blackHasBetterContrastThanWhite(baseOpenedColor) ? baseOpenedColor.mix(Color('black'), 0.1) : baseOpenedColor.mix(Color('white'), 0.2);
    const baseClosedColorLighter = blackHasBetterContrastThanWhite(baseClosedColor) ? baseClosedColor.mix(Color('black'), 0.1) : baseClosedColor.mix(Color('white'), 0.2);

    /**
     * The duration of the open / close animation.
     */
    const animationDuration = 0.2;

    //#endregion

    //#region State

    /**
     * Track whether the floating action menu is open.
     */
    const [menuOpen, setMenuOpen] = useState(false);

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
                scale: 1,
                opacity: 1,
                scale: isHovered ? 1.1 : 1,
                rotate: 0,
                background: forOpenedButton ? baseOpenedColor.string() : baseClosedColor.string(),
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
                    damping: 13,
                },
                scale: {
                    type: 'spring',
                    stiffness: 150,
                    damping: 15,
                }
            },
        };
    };

    //#endregion

    //#region Render Functions

    /**
     * Main render.
     */
    return (
        <>
            {/* Opened Button */}
            <AnimatePresence>
                {menuOpen && (
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
     * Ah
     */
    openedColor: PropTypes.string,
    /**
     * Bah
     */
    closedColor: PropTypes.string,
};

FloatingActionMenu.defaultProps = {
    MenuIcon: Menu,
    openedColor: '#0D0E12',
    closedColor: '#0072E5'
};

export default FloatingActionMenu;