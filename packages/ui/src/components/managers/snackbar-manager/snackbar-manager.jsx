import { useState, useContext, useMemo } from 'react';
import PropTypes from 'prop-types';
import { v4 as uuidv4 } from 'uuid';
import { filter } from 'lodash';
import { motion, AnimatePresence } from 'framer-motion';
import {
    SnackbarList,
    SnackbarAPI,
} from '@contexts';
import localStyles from './snackbar-manager.module.scss';

/**
 * A manager component that handles the display of snackbars. Should likely be used as one
 * of the wrappers of the root of your app.
 */
export function SnackbarManager({
    children,
    maxSnackbars,
}) {
    // #region Constants

    // #endregion

    // #region Context

    /**
     * Use the snackbar list context.
     */
    const snackbarList = useContext(SnackbarList);

    /**
     * Use the snackbar API context.
     */
    const snackbarAPI = useContext(SnackbarAPI);

    // #endregion

    // #region State

    // #endregion

    // #region Effects

    // #endregion

    // #region Functions

    // #endregion

    // #region Render Functions

    /**
     * Render each snackbar in the list.
     */
    const renderSnackbars = () => (
        snackbarList.map((snackbar) => (
            <motion.div
                key={snackbar.id}
                layout
                initial={{
                    opacity: 0,
                    x:       -200,
                }}
                animate={{
                    opacity: 1,
                    x:       0,
                }}
                exit={{
                    opacity: 0,
                    x:       -200,
                }}
                transition={{
                    duration: 0.25,
                    ease:     'easeOut',
                }}
                className={localStyles.snackbar}
            >
                <snackbar.Snackbar removeSnackbar={() => snackbarAPI.removeSnackbar(snackbar.id)} />
            </motion.div>
        ))
    );

    /**
     * Main render.
     */
    return (
        <>
            {children}
            <div className={localStyles.snackbarManager}>
                <AnimatePresence>
                    {renderSnackbars()}
                </AnimatePresence>
            </div>
        </>
    );

    // #endregion
}

SnackbarManager.propTypes = {
    /**
     * The children to wrap with the snackbar manager.
     */
    children:     PropTypes.any.isRequired,
    /**
     * The maximum number of snackbars to display at once.
     */
    maxSnackbars: PropTypes.number,
};

SnackbarManager.defaultProps = {
    maxSnackbars: 3,
};

/**
 * Wrapper for the Snackbar Manager which will provide the Snackbar contexts.
 */
function SnackbarManagerWrapper(props) {
    const [snackbarList, setSnackbarList] = useState([]);

    // Define a function to add a snackbar to the snackbar list
    const addSnackbar = (snackbarRender, duration = 3000) => {
        setSnackbarList((prev) => {
            const newSnackbarID = uuidv4();

            const timeoutID = setTimeout(() => {
                removeSnackbar(newSnackbarID);
            }, duration);

            return [
                // eslint-disable-next-line react/prop-types
                ...(props.maxSnackbars > 1 ? prev.slice(-props.maxSnackbars + 1) : []),
                {
                    Snackbar: snackbarRender,
                    id:       newSnackbarID,
                    timeoutID,
                },
            ];
        });
    };

    // Define a function that removes a snackbar from the snackbar list
    const removeSnackbar = (snackbarID) => {
        setSnackbarList((prev) => {
            // Try to cancel the existing timeout function, if it still exists
            const snackbar = prev.find((item) => item.id === snackbarID);
            if (snackbar?.timeoutID) {
                clearTimeout(snackbar.timeoutID);
            }
            // Filter out the snackbar with the given ID
            return filter(prev, (item) => item.id !== snackbarID);
        });
    };

    // Memoize the Provider value
    const snackbarAPI = useMemo(() => ({
        addSnackbar,
        removeSnackbar,
    }), [addSnackbar, removeSnackbar]);

    // Wrapped render
    return (
        <SnackbarList.Provider value={snackbarList}>
            <SnackbarAPI.Provider value={snackbarAPI}>
                <SnackbarManager {...props} />
            </SnackbarAPI.Provider>
        </SnackbarList.Provider>
    );
}

SnackbarManagerWrapper.defaultProps = SnackbarManager.defaultProps;

export default SnackbarManagerWrapper;
