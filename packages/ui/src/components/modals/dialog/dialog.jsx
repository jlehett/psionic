import { useRef, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { motion, AnimatePresence } from 'framer-motion';
import FocusTrap from 'focus-trap-react';
import { useKeyEvents } from '@hooks/interactions';
import localStyles from './dialog.module.scss';

// #region Component

/**
 * A basic dialog component that any content can be displayed within.
 */
function Dialog({
    children,
    isOpen,
    setIsOpen,
    closeOnClickOutside,
    // Pass Thru Props
    ...passThruProps
}) {
    // #region Constants

    // #endregion

    // #region Refs

    /**
     * Track a reference to the children.
     */
    const childRef = useRef();

    // #endregion

    // #region State

    /**
     * Track the child height in state.
     */
    const [childHeight, setChildHeight] = useState(null);

    /**
     * Track the child width in state.
     */
    const [childWidth, setChildWidth] = useState(null);

    // #endregion

    // #region Effects

    /**
     * Every re-render, get the height of the children. If it has changed, then update state.
     */
    useEffect(() => {
        const newChildHeight = childRef.current?.clientHeight || null;
        const newChildWidth = childRef.current?.clientWidth || null;
        if (newChildHeight !== childHeight) {
            setChildHeight(newChildHeight);
        }
        if (newChildWidth !== childWidth) {
            setChildWidth(newChildWidth);
        }
    });

    // #endregion

    // #region Key Events

    /**
     * Define key events.
     */
    useKeyEvents({
        Escape: () => setIsOpen(false),
    });

    // #endregion

    // #region Functions

    // #endregion

    // #region Animation Variants

    const variants = {
        backdrop: {
            hidden: {
                opacity:    0,
                transition: {
                    duration: 0.2,
                    delay:    0.2,
                },
            },
            visible: {
                opacity:    0.4,
                transition: {
                    duration: 0.2,
                },
            },
        },
        modal: {
            hidden: {
                opacity:    0,
                height:     '20px',
                width:      '20px',
                transition: {
                    duration: 0.2,
                    delay:    0.2,
                },
            },
            visible: {
                opacity:    [0, 1, 1],
                height:     ['20px', '20px', `${childHeight || 20}px`],
                width:      ['20px', `${childWidth || 20}px`, `${childWidth || 20}px`],
                transition: {
                    duration: 0.5,
                },
            },
        },
        modalContent: {
            hidden: {
                opacity:    0,
                scale:      0.95,
                transition: {
                    duration: 0.3,
                    opacity:  {
                        duration: 0.2,
                    },
                },
            },
            visible: {
                opacity:    1,
                scale:      1,
                transition: {
                    delay:    0.4,
                    duration: 0.35,
                },
            },
        },
    };

    // #endregion

    // #region Render Functions

    /**
     * Main render.
     */
    return (
        <AnimatePresence>
            {
                isOpen
                    ? (
                        <FocusTrap>
                            <div className={localStyles.wrapper}>
                                <motion.div
                                    className={localStyles.overlay}
                                    variants={variants.backdrop}
                                    initial="hidden"
                                    animate="visible"
                                    exit="hidden"
                                    onClick={() => (closeOnClickOutside ? setIsOpen(false) : null)}
                                />
                                <motion.div
                                    {...passThruProps}
                                    className={`
                                        ${localStyles.dialog}
                                        ${passThruProps?.className}
                                    `}
                                    variants={variants.modal}
                                    initial="hidden"
                                    animate="visible"
                                    exit="hidden"
                                    tabIndex={-1}
                                    role="dialog"
                                >
                                    <motion.div
                                        variants={variants.modalContent}
                                        ref={childRef}
                                    >
                                        {children}
                                    </motion.div>
                                </motion.div>
                            </div>
                        </FocusTrap>
                    )
                    : null
            }
        </AnimatePresence>
    );

    // #endregion
}

Dialog.propTypes = {
    /**
     * The children to render within the dialog.
     */
    children:            PropTypes.any.isRequired,
    /**
     * Whether or not the dialog is open.
     */
    isOpen:              PropTypes.bool.isRequired,
    /**
     * The function to call to set the open state of the dialog.
     */
    setIsOpen:           PropTypes.func.isRequired,
    /**
     * Whether or not to close the dialog when the user clicks outside of it.
     */
    closeOnClickOutside: PropTypes.bool,
    /**
     * The remaining props to spread to the internal `div` HTML element that acts as a root container
     * of the component.
     *
     * This is not a prop of `passThruProps` -- this is simply a representation of any additional props
     * passed to the `Dialog` component that aren't covered above.
     */
    '...passThruProps':  PropTypes.any,
};

Dialog.defaultProps = {
    closeOnClickOutside: true,
};

// #endregion

export default Dialog;
