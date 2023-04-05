import { useState } from 'react';
import {
    setAsCategory,
    setAsDisabled,
} from '@unifire-js/storybook-utils';
import ControlledCheckbox from './controlled-checkbox';

// Construct the argTypes object
const argTypes = {};
setAsCategory(argTypes, 'UI', [
    'label',
    'required',
    'helperMessage',
    'hasError',
    'color',
    'darkMode',
]);
setAsCategory(argTypes, 'Controls', [
    'checked',
    'onChange',
    'disabled',
]);
setAsCategory(argTypes, 'Accessibility', [
    'ariaLabel',
    'id',
]);
setAsCategory(argTypes, 'Pass Thru Props', [
    'InputProps',
    'LabelProps',
    '...passThruProps',
]);

// Storybook default export
export default {
    title:     'controlled inputs/ControlledCheckbox',
    component: ControlledCheckbox,
    argTypes,
};

function Template(args) {
    const [checked, setChecked] = useState(false);

    return (
        <div style={{ margin: '40px' }}>
            <ControlledCheckbox
                checked={checked}
                onChange={(event) => setChecked(event.target.checked)}
                {...args}
            />
        </div>
    );
}

// Basic Demo
export const Basic = Template.bind({});
Basic.args = {
    ariaLabel: 'test',
};

// Labeled Demo
export const Labeled = Template.bind({});
Labeled.args = {
    label: 'I agree to the Terms of Service',
};

// Required Demo
export const Required = Template.bind({});
Required.args = {
    label:    'I agree to the Terms of Service',
    required: true,
};

// Helper Message Demo
export const HelperMessage = Template.bind({});
HelperMessage.args = {
    label:         'I agree to the Terms of Service',
    helperMessage: 'You must agree to the Terms of Service to continue.',
};

// Errored Demo
export const Errored = Template.bind({});
Errored.args = {
    label:         'I agree to the Terms of Service',
    helperMessage: 'You must agree to the Terms of Service to continue.',
    hasError:      true,
};

// Disabled Demo
export const Disabled = Template.bind({});
Disabled.args = {
    label:    'I agree to the Terms of Service',
    disabled: true,
};

// Dark Mode Demo
export const DarkMode = Template.bind({});
DarkMode.args = {
    label:    'I agree to the Terms of Service',
    darkMode: true,
};
