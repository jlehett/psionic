import {
    setAsCategory,
    setAsDisabled,
} from '@unifire-js/storybook-utils';
import { Form } from '@components/inputs';
import TextField from './text-field';

// Construct the argTypes object
const argTypes = {};

// Storybook default export
export default {
    title: 'inputs/TextField',
    component: TextField,
    argTypes,
};

const Template = (args) => {

    return (
        <Form onSubmit={() => {}}>
            <TextField
                fieldKey="testKey"
                {...args}
            />
        </Form>
    );
};

// Basic Demo
export const Basic = Template.bind({});
Basic.args = {
    type: 'text',
};
