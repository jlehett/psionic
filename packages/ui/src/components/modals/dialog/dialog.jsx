import { useRef, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { motion, AnimatePresence } from 'framer-motion';
import localStyles from './dialog.module.scss';

/**
 * A basic dialog component that any content can be displayed within.
 */
const Dialog = ({
    children,
    isOpen,
    setIsOpen,
    closeOnClickOutside,
    // Pass Thru Props
    ...passThruProps
}) => {

    //#region Constants

    //#endregion

    //#region Refs

    /**
     * Track a reference to the children.
     */
    const childRef = useRef();

    //#endregion

    //#region State

    /**
     * Track the child height in state.
     */
    const [childHeight, setChildHeight] = useState(null);

    //#endregion

    //#region Effects

    /**
     * Every re-render, get the height of the children. If it has changed, then update state.
     */
    useEffect(() => {
        const newChildHeight = childRef.current?.clientHeight || null;
        if (newChildHeight !== childHeight) {
            setChildHeight(newChildHeight);
        }
    });

    //#endregion

    //#region Functions

    //#endregion

    //#region Render Functions

    /**
     * Main render.
     */
    return (
        <AnimatePresence>
            {
                isOpen
                    ? (
                        <>
                            <motion.div
                                className={localStyles.overlay}
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 0.4 }}
                                exit={{ opacity: 0 }}
                                transition={{
                                    duration: 0.2,
                                }}
                                onClick={() => closeOnClickOutside ? setIsOpen(false) : null}
                            />
                            <motion.div
                                {...passThruProps}
                                className={`
                                    ${localStyles.dialog}
                                    ${passThruProps?.className}
                                `}
                                initial={{
                                    opacity: 0,
                                    height: '20px',
                                }}
                                animate={{
                                    opacity: [0, 1, 1],
                                    height: ['20px', '20px', `${childHeight || 20}px`],
                                }}
                                exit={{
                                    opacity: 0,
                                    height: '20px',
                                    transition: {
                                        duration: 0.2,
                                    }
                                }}
                                transition={{
                                    duration: 0.5,
                                }}
                            >
                                <div
                                    ref={childRef}
                                >
                                    {children}
                                </div>
                            </motion.div>
                        </>
                    )
                    : null
            }
        </AnimatePresence>
    );

    //#endregion
};

Dialog.propTypes = {
    /**
     * The children to render within the dialog.
     */
    children: PropTypes.any.isRequired,
    /**
     * Whether or not the dialog is open.
     */
    isOpen: PropTypes.bool.isRequired,
    /**
     * The function to call to set the open state of the dialog.
     */
    setIsOpen: PropTypes.func.isRequired,
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
    "...passThruProps": PropTypes.any,
};

Dialog.defaultProps = {
    closeOnClickOutside: true,
};

export default Dialog;