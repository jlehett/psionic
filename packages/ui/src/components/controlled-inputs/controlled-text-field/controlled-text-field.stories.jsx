import { useState } from 'react';
import {
    setAsCategory,
    setAsDisabled,
} from '@unifire-js/storybook-utils';
import ControlledTextField from './controlled-text-field';

// Construct the argTypes object
const argTypes = {};
setAsCategory(argTypes, 'UI', [
    'label',
    'required',
    'helperMessage',
    'hasError',
    'multiline',
    'color',
    'darkMode',
]);
setAsCategory(argTypes, 'Controls', [
    'value',
    'onChange',
    'type',
    'disabled',
]);
setAsCategory(argTypes, 'Accessibility', [
    'id',
]);
setAsCategory(argTypes, 'Pass Thru Props', [
    'InputProps',
    'LabelProps',
    '...passThruProps',
]);

// Storybook default export
export default {
    title:     'controlled inputs/ControlledTextField',
    component: ControlledTextField,
    argTypes,
};

function Template(args) {
    const [value, setValue] = useState('');

    return (
        <div style={{ margin: '40px' }}>
            <ControlledTextField
                value={value}
                onChange={setValue}
                {...args}
            />
        </div>
    );
}

// Basic Demo
export const Basic = Template.bind({});
Basic.args = {
    label: 'Email',
};

// Required Demo
export const Required = Template.bind({});
Required.args = {
    label:    'Email',
    required: true,
};

// Password Demo
export const Password = Template.bind({});
Password.args = {
    label: 'Password',
    type:  'password',
};

// Helper Message Demo
export const HelperMessage = Template.bind({});
HelperMessage.args = {
    label:         'Email',
    helperMessage: 'An email address is required!',
};

// Errored Demo
export const Errored = Template.bind({});
Errored.args = {
    label:         'Email',
    hasError:      true,
    helperMessage: 'An email address is required!',
};

// Disabled Demo
export const Disabled = Template.bind({});
Disabled.args = {
    label:    'Email',
    disabled: true,
};

// Multiline Demo
export const Multiline = Template.bind({});
Multiline.args = {
    label:     'Email',
    multiline: true,
};

// Colored Demo
export const Colored = Template.bind({});
Colored.args = {
    label: 'Email',
    color: '#00aa00',
};

// Dark Mode Demo
export const DarkMode = Template.bind({});
DarkMode.args = {
    label:    'Email',
    darkMode: true,
};
