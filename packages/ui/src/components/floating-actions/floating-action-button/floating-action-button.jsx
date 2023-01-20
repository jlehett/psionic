import { useState, useContext } from 'react';
import PropTypes from 'prop-types';
import Color from 'color';
import { motion, AnimatePresence } from 'framer-motion';
import { FloatingActionMenuOpen } from '@contexts';
import { usePseudoSelectors } from '@hooks/interactions';
import {
    getContrastingBWColor,
    getHoveredColor,
} from '@utils/colors';
import localStyles from './floating-action-button.module.scss';

/**
 * Button used in the floating action menu. Used for internal purposes only -- this component
 * will automatically be created by the `FloatingActionMenu` component based upon its
 * `buttons` prop.
 */
function FloatingActionButton({
    onClick,
    menuIndex,
    SvgIcon,
    color,
    ariaLabel,
}) {
    // #region Constants

    /**
     * Various colors for the floating action button.
     */
    const baseColor = Color(color);
    const baseColorLighter = getHoveredColor(baseColor);

    /**
     * The duration of the animation.
     */
    const animationDuration = 0.2;

    /**
     * Spacing between all of the floating action buttons.
     */
    const buttonSpacing = 65;

    // #endregion

    // #region Context

    /**
     * Use the floating action menu open state from context.
     */
    const menuOpen = useContext(FloatingActionMenuOpen);

    // #endregion

    // #region State

    /**
     * Track the pseudo selectors for the button.
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
        <AnimatePresence>
            {menuOpen && (
                <motion.button
                    type="button"
                    className={localStyles.floatingActionButton}
                    style={{ background: baseColor }}
                    onClick={onClick}
                    {...pseudoSelectorProps}
                    initial={{
                        scale:      0,
                        opacity:    0,
                        y:          0,
                        rotate:     -90,
                        background: baseColor.string(),
                    }}
                    animate={{
                        scale:      pseudoSelectorStates.isHovered ? 1.05 : 1,
                        opacity:    1,
                        y:          -(menuIndex + 1) * buttonSpacing,
                        rotate:     0,
                        background: pseudoSelectorStates.isHovered
                            ? baseColorLighter.string()
                            : baseColor.string(),
                    }}
                    exit={{
                        scale:      0,
                        opacity:    0,
                        y:          0,
                        rotate:     -90,
                        background: baseColor.string(),
                    }}
                    transition={{
                        duration: animationDuration,
                        delay:    (animationDuration / 4) * menuIndex,
                        y:        {
                            type:      'spring',
                            stiffness: 200,
                            damping:   17,
                        },
                        rotate: {
                            type:      'spring',
                            stiffness: 200,
                            damping:   15,
                        },
                    }}
                    aria-label={ariaLabel}
                >
                    <SvgIcon
                        style={{
                            stroke: getContrastingBWColor(baseColor),
                            fill:   getContrastingBWColor(baseColor),
                        }}
                    />
                </motion.button>
            )}
        </AnimatePresence>
    );

    // #endregion
}

FloatingActionButton.propTypes = {
    /**
     * The function to call when the button is clicked.
     */
    onClick:   PropTypes.func.isRequired,
    /**
     * The index of the button in the floating action menu.
     */
    menuIndex: PropTypes.number.isRequired,
    /**
     * The SVG icon to display in the button.
     */
    SvgIcon:   PropTypes.func.isRequired,
    /**
     * The color to use for the background of the button.
     */
    color:     PropTypes.string,
    /**
     * The aria label to use for the button.
     */
    ariaLabel: PropTypes.string,
};

FloatingActionButton.defaultProps = {
    color: '#0072E5',
};

export default FloatingActionButton;
