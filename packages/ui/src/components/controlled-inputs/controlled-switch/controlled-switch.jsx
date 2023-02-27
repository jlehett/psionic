import { useContext } from 'react';
import PropTypes from 'prop-types';
import Color from 'color';
import { motion } from 'framer-motion';
import { Theme } from '@contexts';
import { useFormField } from '@hooks/forms';
import localStyles from './controlled-switch.module.scss';

/**
 * A manually controlled switch.
 */
function ControlledSwitch({
    checked,
    onChange,
    label,
    color,
    disabled,
    width,
    height,
    ariaLabel,
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
     * Various colors for the switch.
     */
    const baseColor = Color(theme[color] || color);

    /**
     * The border size of the switch.
     */
    const borderRatio = 0.8;

    // #endregion

    // #region State

    // #endregion

    // #region Effects

    // #endregion

    // #region Variables

    /**
     * The color to use for the switch background.
     * @type {Color}
     */
    const switchBgColor = checked ? baseColor : Color('rgba(0, 0, 0, 0.38)');

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
                checked={checked}
                onChange={onChange}
                disabled={disabled}
                id={id}
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
                        x:               checked ? `${width - (height * borderRatio) - (height * (1 - borderRatio) / 2)}px` : `${height * (1 - borderRatio) / 2}px`,
                        y:               `${height * (1 - borderRatio) / 2}px`,
                    }}
                    animate={{
                        backgroundColor: 'rgb(242, 242, 242)',
                        x:               checked ? `${width - (height * borderRatio) - (height * (1 - borderRatio) / 2)}px` : `${height * (1 - borderRatio) / 2}px`,
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
                        <label {...LabelProps} htmlFor={id}>
                            {label}
                        </label>
                    )
                    : null
            }
        </div>
    );

    // #endregion
}

ControlledSwitch.propTypes = {
    /**
     * Flag indicating whether or not the switch is checked.
     */
    checked:            PropTypes.bool,
    /**
     * The function to call when the switch is toggled.
     */
    onChange:           PropTypes.func.isRequired,
    /**
     * The label to display next to the switch.
     */
    label:              PropTypes.string,
    /**
     * The id to use for the switch.
     */
    id:                 PropTypes.string.isRequired,
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

ControlledSwitch.defaultProps = {
    color:    'primary',
    disabled: false,
    width:    42,
    height:   24,
};

export default ControlledSwitch;
