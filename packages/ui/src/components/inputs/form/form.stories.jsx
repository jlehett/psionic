import {
    setAsCategory,
    setAsDisabled,
} from '@unifire-js/storybook-utils';
import { TextField } from '@components/inputs';
import Form, { Form as docs } from './form';

// Construct the argTypes object
const argTypes = {};
setAsCategory(argTypes, 'UI', [
    'children',
]);
setAsCategory(argTypes, 'Callbacks', [
    'onSubmit',
]);
setAsCategory(argTypes, 'Pass Thru Props', [
    'passThruProps',
]);

// Storybook default export
export default {
    title: 'inputs/Form',
    component: docs,
    subcomponents: {
        TextField,
    },
    argTypes,
};

const Template = (args) => {

    // Submit handler
    function onSubmit(formData) {
        console.log('Form Data:', formData);
    }

    return (
        <Form
            onSubmit={onSubmit}
            {...args}
        >
            <TextField fieldKey="name"/>
            <TextField fieldKey="password" type="password"/>
            <button type="submit">
                Submit Form
            </button>
        </Form>
    );
};

// Basic Demo
export const Basic = Template.bind({});
Basic.args = {

};
