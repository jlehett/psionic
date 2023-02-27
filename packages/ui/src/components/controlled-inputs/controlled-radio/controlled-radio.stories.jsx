import { useState } from 'react';
import {
    setAsCategory,
    setAsDisabled,
} from '@unifire-js/storybook-utils';
import { ControlledRadioGroup } from '@components/controlled-inputs';
import ControlledRadio from './controlled-radio';

// Construct the argTypes object
const argTypes = {};
setAsCategory(argTypes, 'UI', [
    'children',
]);
setAsCategory(argTypes, 'Accessibility', [
    'id',
]);
setAsCategory(argTypes, 'Controls', [
    'value',
]);
setAsCategory(argTypes, 'Pass Thru Props', [
    '...passThruProps',
]);

// Storybook default export
export default {
    title:     'controlled inputs/ControlledRadio',
    component: ControlledRadio,
    argTypes,
};

function Template(args) {
    const [value, setValue] = useState();

    return (
        <div style={{ margin: '40px' }}>
            <ControlledRadioGroup
                value={value}
                onChange={(event) => setValue(event.target.value)}
                id="test"
            >
                <ControlledRadio {...args} />
            </ControlledRadioGroup>
        </div>
    );
}

// Basic Demo
export const Basic = Template.bind({});
Basic.args = {
    value:    'red',
    id:       'red',
    children: 'Red',
};
