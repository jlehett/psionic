import { useState } from 'react';
import {
    setAsCategory,
    setAsDisabled,
} from '@unifire-js/storybook-utils';
import Favorite from '@assets/favorite.svg';
import Check from '@assets/check.svg';
import ControlledIconCheckbox from './controlled-icon-checkbox';

// Construct the argTypes object
const argTypes = {};
setAsCategory(argTypes, 'UI', [
    'SvgIcon',
    'label',
    'color',
    'size',
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
    title:     'controlled inputs/ControlledIconCheckbox',
    component: ControlledIconCheckbox,
    argTypes,
};

function Template(args) {
    const [checked, setChecked] = useState(false);

    return (
        <div style={{ margin: '40px' }}>
            <ControlledIconCheckbox
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
    SvgIcon: Favorite,
};

// Labeled Demo
export const Labeled = Template.bind({});
Labeled.args = {
    SvgIcon: Favorite,
    label:   'Favorite',
};

// Customization Demo
export const Customization = Template.bind({});
Customization.args = {
    SvgIcon: Check,
    color:   '#f50a6c',
    size:    '60px',
};

// Disabled Demo
export const Disabled = Template.bind({});
Disabled.args = {
    SvgIcon:  Favorite,
    disabled: true,
    label:    'Favorite',
};
