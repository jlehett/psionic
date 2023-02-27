import {
    useState, useRef, useEffect, useContext,
} from 'react';
import PropTypes from 'prop-types';
import { motion } from 'framer-motion';
import Color from 'color';
import { EditorContent, useEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import { Theme } from '@contexts';
import { StickyTooltip } from '@components/accessibility';
import Visibility from '@assets/visibility.svg';
import VisibilityOff from '@assets/visibility-off.svg';
import { usePseudoSelectors } from '@hooks/interactions';
import localStyles from './controlled-text-field.module.scss';

/**
 * A manually controlled text field with a label.
 */
function ControlledTextField({
    value,
    onChange,
    label,
    type,
    required,
    helperMessage,
    hasError,
    disabled,
    multiline,
    color,
    darkMode,
    id,
    // Specific Component Props
    InputProps,
    LabelProps,
    // Pass Thru Props
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
     * Various colors for the text field.
     */
    const baseColor = Color(theme[color] || color);

    // #endregion

    // #region Refs

    /**
     * Track a reference to the editor content element.
     */
    const editorContentRef = useRef();

    // #endregion

    // #region State

    /**
     * Control whether any hidden text is being shown or not.
     */
    const [showHiddenText, setShowHiddenText] = useState(false);

    /**
     * Track the pseudo selectors for the text field.
     */
    const [pseudoSelectorProps, pseudoSelectorStates] = usePseudoSelectors(true);

    // #endregion

    // #region Misc Hooks

    /**
     * Use the tiptap editor hook.
     */
    const editor = !multiline ? null : useEditor({
        editable:   !disabled,
        content:    value,
        extensions: [
            StarterKit,
        ],
        onUpdate: (context) => {
            onChange(context.editor.isEmpty ? null : context.editor.getJSON());
        },
    });

    // #endregion

    // #region Effects

    /**
     * Whenever the form field is updated, make sure the tiptap editor stays up-to-date.
     */
    useEffect(() => {
        if (editor) {
            editor.commands.setContent(value);
        }
    }, [value]);

    /**
     * Whenever the disabled state changes, make sure the tiptap editor stays up-to-date.
     */
    useEffect(() => {
        if (editor) {
            editor?.setEditable(!disabled);
        }
    }, [disabled]);

    // #endregion

    // #region Variables

    /**
     * String representing the type to use for the internal input element. If the given
     * input type is a password, we may want to represent it with a text input if the show
     * password button has been clicked.
     * @type {string}
     */
    const inputTypeToUse = type !== 'password' ? type : showHiddenText ? 'text' : 'password';

    // #endregion

    // #region Functions

    /**
     * Determine the styling for the input wrapper, based on state.
     */
    const getInputWrapperStyle = () => {
        if (pseudoSelectorStates.isFocused && !(hasError)) {
            return {
                boxShadow: `0 0 0 2px ${baseColor}`,
            };
        }
        if (hasError) {
            if (pseudoSelectorStates.isFocused) {
                return {
                    boxShadow: '0 0 0 2px rgb(211, 47, 47)',
                };
            }
            return {
                boxShadow: '0 0 0 1px rgb(211, 47, 47)',
            };
        }
        if (pseudoSelectorStates.isHovered && !disabled) {
            return {
                boxShadow: '0 0 0 1px black',
            };
        }
        return {};
    };

    /**
     * Determine the styling for the input label, based on state.
     */
    const getInputLabelStyle = () => {
        if (pseudoSelectorStates.isFocused && !(hasError)) {
            return {
                color: baseColor,
            };
        }
        if (hasError) {
            return {
                color: 'rgb(211, 47, 47)',
            };
        }
        if (disabled) {
            return {
                color: darkMode ? 'rgba(255, 255, 255, 0.4)' : 'rgba(0, 0, 0, 0.4)',
            };
        }
        return {
            color: darkMode ? 'rgba(255, 255, 255, 0.6' : 'rgba(0, 0, 0, 0.6)',
        };
    };

    // #endregion

    // #region Render Functions

    /**
     * Main render.
     */
    return (
        <motion.div
            data-display-error={hasError}
            data-is-focused={pseudoSelectorStates.isFocused}
            data-disabled={disabled}
            {...passThruProps}
            className={`
                ${passThruProps?.className}
                ${localStyles.textField}
            `}
            animate={{ x: hasError ? [0, 10, -10, 10, 0] : 0 }}
            transition={{ duration: 0.4 }}
        >
            <motion.div
                initial={{ top: value ? '0px' : '37px' }}
                animate={{ top: value ? '0px' : '37px' }}
                className={localStyles.labelWrapper}
            >
                <label
                    {...LabelProps}
                    htmlFor={id}
                    style={{
                        ...getInputLabelStyle(),
                        ...(LabelProps?.style || {}),
                    }}
                >
                    {label}
                    {required ? ' *' : null}
                </label>
            </motion.div>
            <div
                className={localStyles.inputWrapper}
                style={getInputWrapperStyle()}
                data-is-dark-mode={darkMode}
            >
                {
                    multiline
                        ? (
                            <div
                                className={localStyles.textBlock}
                                ref={editorContentRef}
                                {...pseudoSelectorProps}
                            >
                                <EditorContent editor={editor} />
                            </div>
                        )
                        : (
                            <input
                                type={inputTypeToUse}
                                value={value || ''}
                                onChange={(event) => onChange(event.target.value)}
                                disabled={disabled}
                                {...pseudoSelectorProps}
                                id={id}
                                {...InputProps}
                            />
                        )
                }
                {
                    type !== 'password'
                        ? null
                        : (
                            <StickyTooltip
                                content={showHiddenText ? 'Hide Password' : 'Show Password'}
                                delay={1000}
                            >
                                <button type="button" onClick={() => setShowHiddenText((prev) => !prev)} aria-label="toggle visibility">
                                    { showHiddenText ? <Visibility /> : <VisibilityOff /> }
                                </button>
                            </StickyTooltip>
                        )
                }
            </div>
            <p className={localStyles.helperMessage}>
                {helperMessage}
            </p>
        </motion.div>
    );

    // #endregion
}

ControlledTextField.propTypes = {
    /**
     * The value of the text field.
     */
    value:    PropTypes.string,
    /**
     * The function to call when the text field is updated; should take in the new value
     * as the only argument.
     */
    onChange: PropTypes.func.isRequired,
    /**
     * The label to display above the text field.
     */
    label:    PropTypes.string.isRequired,
    /**
     * The type of text field this is.
     */
    type:     PropTypes.oneOf([
        'email',
        'password',
        'text',
        'url',
    ]),
    /**
     * Flag indicating whether the text field is required or not.
     */
    required:           PropTypes.bool,
    /**
     * The helper message to display underneath the text field.
     */
    helperMessage:      PropTypes.string,
    /**
     * Flag indicating whether the text field has an error or not.
     */
    hasError:           PropTypes.bool,
    /**
     * Flag indicating whether the text field is disabled.
     */
    disabled:           PropTypes.bool,
    /**
     * The color to use for the text field. Supports any of the formats listed here: https://www.npmjs.com/package/color-string.
     * You can also specify a theme key, specified in the `StyleManager`'s `theme` prop, to use a theme color.
     */
    color:              PropTypes.string,
    /**
     * Flag indicating whether this TextField should support multiline input or not.
     * If this is set to true, the Tiptap editor will be used instead of a standard
     * `input` element. This also means the value stored in the form will be in JSON format,
     * since it will be kept in sync via the Tiptap editor's `getJSON()` method.
     *
     * The documentation for the Tiptap editor can be found here: https://tiptap.dev/api/editor#get-json
     */
    multiline:          PropTypes.bool,
    /**
     * Flag indicating whether dark mode should be used or not.
     */
    darkMode:           PropTypes.bool,
    /**
     * The ID to use for the textfield.
     */
    id:                 PropTypes.string.isRequired,
    /**
     * Any props to pass to the internal `input` HTML element.
     */
    InputProps:         PropTypes.object,
    /**
     * Any props to pass to the internal `label` HTML element.
     */
    LabelProps:         PropTypes.object,
    /**
     * The remaining props to spread to the internal `div` HTML element that acts as the
     * root container of the component.
     *
     * This is not a prop of `passThruProps` -- this is simply a representation of any
     * additional props passed to the `div` component that aren't covered above.
     */
    '...passThruProps': PropTypes.any,
};

ControlledTextField.defaultProps = {
    type:      'text',
    required:  false,
    disabled:  false,
    multiline: false,
    color:     'primary',
    darkMode:  false,
};

export default ControlledTextField;
