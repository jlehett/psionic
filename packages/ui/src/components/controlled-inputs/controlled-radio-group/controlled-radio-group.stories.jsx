import { useState } from 'react';
import {
    setAsCategory,
    setAsDisabled,
} from '@unifire-js/storybook-utils';
import { ControlledRadio } from '@components/controlled-inputs';
import ControlledRadioGroup from './controlled-radio-group';

// Construct the argTypes object
const argTypes = {};
setAsCategory(argTypes, 'UI', [
    'color',
    'label',
    'required',
    'helperMessage',
    'hasError',
    'children',
]);
setAsCategory(argTypes, 'Controls', [
    'value',
    'onChange',
    'id',
    'disabled',
]);
setAsCategory(argTypes, 'Pass Thru Props', [
    '...passThruProps',
]);

// Storybook default export
export default {
    title:     'controlled inputs/ControlledRadioGroup',
    component: ControlledRadioGroup,
    argTypes,
};

function Template(args) {
    const [value, setValue] = useState();

    return (
        <div style={{ margin: '40px' }}>
            <ControlledRadioGroup
                value={value}
                onChange={(event) => setValue(event.target.value)}
                {...args}
            >
                <ControlledRadio
                    value="red"
                    id="red"
                >
                    Red
                </ControlledRadio>
                <ControlledRadio
                    value="green"
                    id="green"
                >
                    Green
                </ControlledRadio>
                <ControlledRadio
                    value="blue"
                    id="blue"
                >
                    Blue
                </ControlledRadio>
            </ControlledRadioGroup>
        </div>
    );
}

// Basic Demo
export const Basic = Template.bind({});
Basic.args = {

};

// Labeled Demo
export const Labeled = Template.bind({});
Labeled.args = {
    label: 'Favorite Color',
};

// Required Demo
export const Required = Template.bind({});
Required.args = {
    label:    'Favorite Color',
    required: true,
};

// Helper Message Demo
export const HelperMessage = Template.bind({});
HelperMessage.args = {
    label:         'Favorite Color',
    helperMessage: 'You must select a color!',
};

// Errored Demo
export const Errored = Template.bind({});
Errored.args = {
    label:         'Favorite Color',
    helperMessage: 'You must select a color!',
    hasError:      true,
};

// Disabled Demo
export const Disabled = Template.bind({});
Disabled.args = {
    label:    'Favorite Color',
    disabled: true,
};
