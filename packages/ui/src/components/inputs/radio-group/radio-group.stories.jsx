import {
    setAsCategory,
    setAsDisabled,
} from '@unifire-js/storybook-utils';
import { Radio, Form } from '@components/inputs';
import { Button } from '@components/buttons';
import RadioGroup from './radio-group';

// Construct the argTypes object
const argTypes = {};
setAsCategory(argTypes, 'UI', [
    'color',
    'label',
    'requiredMessage',
]);
setAsCategory(argTypes, 'Controls', [
    'initialValue',
    'fieldKey',
    'disabled',
    'required',
    'children',
]);
setAsCategory(argTypes, 'Pass Thru Props', [
    '...passThruProps',
]);

// Storybook default export
export default {
    title: 'inputs/RadioGroup',
    component: RadioGroup,
    argTypes,
};

const Template = (args) => {
    return (
        <Form
            onSubmit={() => {}}
            style={{ margin: '40px' }}
        >
            <RadioGroup
                fieldKey="testKey"
                {...args}
            >
                <Radio value="red">
                    Red
                </Radio>
                <Radio value="green">
                    Green
                </Radio>
                <Radio value="blue">
                    Blue
                </Radio>
            </RadioGroup>
            <div style={{ display: 'flex', flexDirection: 'row', gap: '16px', marginTop: '16px' }}>
                <Button
                    variant="contained"
                    type="submit"
                >
                    Submit
                </Button>
                <Button
                    variant="contained"
                    type="reset"
                >
                    Reset
                </Button>
            </div>
        </Form>
    );
};

// Basic Demo
export const Basic = Template.bind({});
Basic.args = {

};

// Initial Value Demo
export const InitialValue = Template.bind({});
InitialValue.args = {
    initialValue: 'green',
};

// Labeled Demo
export const Labeled = Template.bind({});
Labeled.args = {
    label: 'Favorite Color',
};

// Required Demo
export const Required = Template.bind({});
Required.args = {
    label: 'Favorite Color',
    required: true,
};

// Required Message Demo
export const RequiredMessage = Template.bind({});
RequiredMessage.args = {
    label: 'Favorite Color',
    required: true,
    requiredMessage: 'Please select a color',
};

// Disabled Demo
export const Disabled = Template.bind({});
Disabled.args = {
    label: 'Favorite Color',
    disabled: true,
};