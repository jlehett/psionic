import {
    setAsCategory,
    setAsDisabled,
} from '@unifire-js/storybook-utils';
import { RadioGroup, Form } from '@components/inputs';
import { Button } from '@components/buttons';
import Radio from './radio';

// Construct the argTypes object
const argTypes = {};
setAsCategory(argTypes, 'UI', [
    'children',
]);
setAsCategory(argTypes, 'Controls', [
    'value',
]);
setAsCategory(argTypes, 'Pass Thru Props', [
    '...passThruProps',
]);

// Storybook default export
export default {
    title: 'inputs/Radio',
    component: Radio,
    argTypes,
};

const Template = (args) => {
    return (
        <div style={{ margin: '40px' }}>
            <Form>
                <RadioGroup fieldKey="testKey">
                    <Radio {...args}/>
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
        </div>
    );
};

// Basic Demo
export const Basic = Template.bind({});
Basic.args = {
    value: 'blue',
    children: 'Blue',
};
