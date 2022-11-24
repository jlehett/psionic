import { useContext, useMemo, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Color from 'color';
import { motion } from 'framer-motion';
import { FormData, SetFormData } from '@contexts';
import localStyles from './icon-checkbox.module.scss';

/**
 * Replace this with a comment describing the component.
 */
const IconCheckbox = ({
    SvgIcon,
    initialValue,
    label,
    fieldKey,
    color,
    size,
    disabled,
    // Specific Component Props
    InputProps,
    LabelProps,
    // Pass Thru Props
    ...passThruProps
}) => {

    //#region Constants

    /**
     * Various colors for the checkbox.
     */
    const baseColor = Color(color);

    /**
     * Animation duration.
     */
    const animationDuration = 0.1;

    //#endregion

    //#region Context

    /**
     * Use the Form Data from context.
     */
    const formData = useContext(FormData);

    /**
     * Use the Set Form Data API from context.
     */
    const setFormData = useContext(SetFormData);

    //#endregion

    //#region State

    /**
     * Track whether the checkbox is being hovered or not.
     */
    const [isHovered, setIsHovered] = useState(false);

    //#endregion

    //#region Effects

    /**
     * When the component first mounts, add its data to the form data context.
     * When the component unmounts, remove its data from the form data context.
     */
    useEffect(() => {
        // On Mount
        setFieldValue(initialValue);

        // Before Unmount
        return () => deleteField();
    }, []);

    /**
     * Whenever the `disabled` prop changes, we want to update that flag in the form data.
     */
    useEffect(() => {
        setFieldDisabled(disabled);
    }, [disabled]);

    //#endregion

    //#region Memoized Values

    /**
     * Memoized value that is currently stored in the input.
     * @type {boolean}
     */
    const currentValue = useMemo(() => {
        return formData[fieldKey]?.checked || false;
    }, [formData, fieldKey]);

    //#endregion

    //#region Functions

    /**
     * On Change handler.
     */
    const onChange = () => {
        // If the checkbox is disabled, do nothing
        if (disabled) return;

        setFieldValue(!currentValue);
    };

    /**
     * Sets the form's data for this field key to the specified value.
     *
     * @param {boolean} newValue The new value for this checkbox in the form
     */
    const setFieldValue = (newValue) => {
        const fieldInfo = {
            type: 'icon-checkbox',
            checked: newValue,
            valid: true,
            disabled,
        };

        setFormData((prev) => ({
            ...prev,
            [fieldKey]: fieldInfo,
        }));
    };

    /**
     * Sets the field's `disabled` flag in the form's data to the specified value.
     *
     * @param {boolean} disabledValue The new value for the field's `disabled` flag
     */
    const setFieldDisabled = (disabledValue) => {
        setFormData((prev) => ({
            ...prev,
            [fieldKey]: {
                ...(prev[fieldKey] || {}),
                disabled: disabledValue,
            },
        }));
    };

    /**
     * Deletes the form's data for the key.
     */
    const deleteField = () => {
        setFormData((prev) => {
            delete prev[fieldKey];
            return prev;
        });
    };

    //#endregion

    //#region Render Functions

    /**
     * Main render.
     */
    return (
        <div
            {...passThruProps}
            className={`
                ${localStyles.checkbox}
                ${passThruProps?.className}
            `}
            onClick={onChange}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            data-disabled={disabled}
        >
            <input
                type="checkbox"
                checked={currentValue}
                onChange={onChange}
                disabled={disabled}
                {...InputProps}
            />
            <label {...LabelProps}>
                {label}
            </label>
            <div
                className={localStyles.customCheckbox}
                style={{
                    width: size,
                    height: size,
                }}
            >
                <div
                    className={localStyles.hoverCircle}
                    style={{
                        background: isHovered && !disabled ? baseColor.fade(0.9) : 'none'
                    }}
                />
                <motion.div
                    className={localStyles.waveSvg}
                    initial={{
                        scale: initialValue ? 2 : 1,
                        opacity: initialValue ? 0 : 1,
                    }}
                    animate={{
                        scale: currentValue ? [null, 2] : [1, 1],
                        opacity: currentValue ? [null, 0] : [null, 1],
                    }}
                    transition={{
                        duration: animationDuration,
                        delay: currentValue ? animationDuration : 0,
                        ease: 'linear',
                    }}
                >
                    <SvgIcon
                        style={{
                            stroke: disabled
                                ? 'rgba(0, 0, 0, 0.26)'
                                : currentValue
                                ? baseColor
                                : baseColor.fade(0.0),
                            fill: 'transparent',
                        }}
                    />
                </motion.div>
                <motion.div
                    className={localStyles.fillSvg}
                    initial={{
                        scale: initialValue ? 1 : 0,
                    }}
                    animate={{
                        scale: currentValue ? [null, 1] : [null, 0]
                    }}
                    transition={{
                        duration: animationDuration,
                        ease: 'linear',
                    }}
                >
                    <SvgIcon
                        style={{
                            stroke: disabled ? 'transparent' : baseColor,
                            fill: disabled ? 'rgba(0, 0, 0, 0.26)' : baseColor,
                        }}
                    />
                </motion.div>
            </div>
        </div>
    );

    //#endregion
};

IconCheckbox.propTypes = {
    /**
     * The SVG icon component to use for the checkbox.
     */
    SvgIcon: PropTypes.func.isRequired,
    /**
     * The initial value for the checkbox.
     */
    initialValue: PropTypes.bool,
    /**
     * The label to display for the icon checkbox.
     */
    label: PropTypes.string,
    /**
     * The key to use to represent this checkbox in the parent form. This should be unique
     * among all fields in the individual form.
     */
    fieldKey: PropTypes.string.isRequired,
    /**
     * The color to use for the checkbox. Supports any of the formats listed here: https://www.npmjs.com/package/color-string.
     */
    color: PropTypes.string,
    /**
     * The size of the checkbox. Can be in any format accepted as a CSS value for `width` and `height`.
     */
    size: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number,
    ]),
    /**
     * Flag indicating whether the icon checkbox is disabled.
     */
    disabled: PropTypes.bool,
    /**
     * Any props to pass to the internal `input` HTML element.
     */
    InputProps: PropTypes.object,
    /**
     * Any props to pass to the internal `label` HTML element.
     */
    LabelProps: PropTypes.object,
    /**
     * The remaining props to spread to the internal `div` HTML element that acts as a root container of the component.
     *
     * This is not a prop of `passThruProps` -- this is simply a representation of any additional props passed to the
     * `div` component that aren't covered above.
     */
    "...passThruProps": PropTypes.any,
};

IconCheckbox.defaultProps = {
    initialValue: false,
    color: '#0072E5',
    size: '28px',
    disabled: false,
};

export default IconCheckbox;