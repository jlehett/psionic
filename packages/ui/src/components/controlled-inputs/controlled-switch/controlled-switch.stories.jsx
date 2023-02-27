import { useState } from 'react';
import {
    setAsCategory,
    setAsDisabled,
} from '@unifire-js/storybook-utils';
import ControlledSwitch from './controlled-switch';

// Construct the argTypes object
const argTypes = {};
setAsCategory(argTypes, 'UI', [
    'label',
    'color',
    'width',
    'height',
]);
setAsCategory(argTypes, 'Controls', [
    'checked',
    'onChange',
    'disabled',
]);
setAsCategory(argTypes, 'Accessibility', [
    'id',
    'ariaLabel',
]);
setAsCategory(argTypes, 'Pass Thru Props', [
    'InputProps',
    'LabelProps',
    '...passThruProps',
]);

// Storybook default export
export default {
    title:     'controlled inputs/ControlledSwitch',
    component: ControlledSwitch,
    argTypes,
};

function Template(args) {
    const [checked, setChecked] = useState(false);

    return (
        <div style={{ margin: '40px' }}>
            <ControlledSwitch
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
    label: 'Label',
};

// Disabled Demo
export const Disabled = Template.bind({});
Disabled.args = {
    label:    'Label',
    disabled: true,
};

// Large Demo
export const Large = Template.bind({});
Large.args = {
    width:     42 * 4,
    height:    24 * 4,
    ariaLabel: 'test',
};

// Colored Demo
export const Colored = Template.bind({});
Colored.args = {
    label: 'Label',
    color: '#2d9a00',
};
