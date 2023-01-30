import { useContext } from 'react';
import PropTypes from 'prop-types';
import Color from 'color';
import { motion } from 'framer-motion';
import { Theme } from '@contexts';
import { useFormField } from '@hooks/forms';
import localStyles from './switch.module.scss';

/**
 * A switch that can be used in `@psionic/ui`'s `Form` component.
 */
function Switch({
    initialValue,
    label,
    fieldKey,
    color,
    disabled,
    width,
    height,
    ariaLabel,
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
     * Various colors for the switch.
     */
    const baseColor = Color(theme[color] || color);

    /**
     * The border size of the switch.
     */
    const borderRatio = 0.8;

    // #endregion

    // #region Misc Hooks

    /**
     * Use the form field hook.
     */
    const [
        formField,
        onChange,
    ] = useFormField({
        fieldKey,
        initialValue,
        type: 'switch',
        disabled,
    });

    // #endregion

    // #region State

    // #endregion

    // #region Effects

    // #endregion

    // #region Variables

    /**
     * The value currently stored in the input.
     * @type {boolean}
     */
    const currentValue = formField?.checked || false;

    /**
     * The color to use for the switch background.
     * @type {Color}
     */
    const switchBgColor = currentValue ? baseColor : Color('rgba(0, 0, 0, 0.38)');

    // #endregion

    // #region Functions

    // #endregion

    // #region Render Functions

    /**
     * Main render.
     */
    return (
        <div
            data-disabled={disabled}
            {...passThruProps}
            className={`
                ${passThruProps?.className}
                ${localStyles.switch}
            `}
        >
            {/* Input */}
            <input
                type="checkbox"
                checked={currentValue}
                onChange={onChange}
                disabled={disabled}
                id={fieldKey}
                aria-label={ariaLabel}
                {...InputProps}
            />
            {/* UI */}
            <motion.div
                className={localStyles.switchBackground}
                style={{
                    width:  `${width}px`,
                    height: `${height}px`,
                }}
                initial={{ backgroundColor: disabled ? switchBgColor.fade(0.6).string() : switchBgColor.string() }}
                animate={{ backgroundColor: disabled ? switchBgColor.fade(0.6).string() : switchBgColor.string() }}
                transition={{ duration: 0.2 }}
            >
                <motion.div
                    className={localStyles.switchForeground}
                    style={{
                        width:  `${height * borderRatio}px`,
                        height: `${height * borderRatio}px`,
                    }}
                    initial={{
                        backgroundColor: 'rgb(242, 242, 242)',
                        x:               currentValue ? `${width - (height * borderRatio) - (height * (1 - borderRatio) / 2)}px` : `${height * (1 - borderRatio) / 2}px`,
                        y:               `${height * (1 - borderRatio) / 2}px`,
                    }}
                    animate={{
                        backgroundColor: 'rgb(242, 242, 242)',
                        x:               currentValue ? `${width - (height * borderRatio) - (height * (1 - borderRatio) / 2)}px` : `${height * (1 - borderRatio) / 2}px`,
                        y:               `${height * (1 - borderRatio) / 2}px`,
                    }}
                    transition={{
                        backgroundColor: {
                            duration: 0,
                        },
                        x: {
                            duration: 0.15,
                            ease:     'easeOut',
                        },
                    }}
                />
            </motion.div>
            {
                label
                    ? (
                        <label {...LabelProps} htmlFor={fieldKey}>
                            {label}
                        </label>
                    )
                    : null
            }
        </div>
    );

    // #endregion
}

Switch.propTypes = {
    /**
     * The initial value of the switch.
     */
    initialValue:       PropTypes.bool,
    /**
     * The label to display next to the switch.
     */
    label:              PropTypes.string,
    /**
     * The key to use to represent this switch in the parent form. This should be unique
     * among all fields in the individual form.
     */
    fieldKey:           PropTypes.string.isRequired,
    /**
     * The color to use for the checkbox. Supports any of the formats listed here: https://www.npmjs.com/package/color-string.
     * You can also specify a theme key, specified in the `StyleManager`'s `theme` prop, to use a theme color.
     */
    color:              PropTypes.string,
    /**
     * Whether or not the switch is disabled.
     */
    disabled:           PropTypes.bool,
    /**
     * The aria label to use for the switch.
     */
    ariaLabel:          PropTypes.string,
    /**
     * The width of the switch, in pixels.
     */
    width:              PropTypes.number,
    /**
     * The height of the switch, in pixels.
     */
    height:             PropTypes.number,
    /**
     * Any props to pass to the internal `input` HTML element.
     */
    InputProps:         PropTypes.object,
    /**
     * Any props to pass to the internal `label` HTML element.
     */
    LabelProps:         PropTypes.object,
    /**
     * The remaining props to spread to the internal `div` HTML element that acts as a
     * root container of the component.
     *
     * This is not a prop of `passThruProps` -- this is simply a representation of any additional props
     * passed to the `div` component that aren't covered above.
     */
    '...passThruProps': PropTypes.any,
};

Switch.defaultProps = {
    initialValue: false,
    color:        'primary',
    disabled:     false,
    width:        42,
    height:       24,
};

export default Switch;
