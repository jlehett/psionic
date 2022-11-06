import {
    setAsCategory,
    setAsDisabled,
} from '@unifire-js/storybook-utils';
import Button from './button';

// Construct the argTypes object
const argTypes = {};

// Storybook default export
export default {
    title: 'buttons/Button',
    component: Button,
    argTypes,
};

const Template = (args) => {
    return <Button {...args}/>;
};

// Basic Demo
export const Basic = Template.bind({});
Basic.args = {
    children: 'Submit',
};
