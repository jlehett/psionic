import {
    setAsCategory,
    setAsDisabled,
} from '@unifire-js/storybook-utils';
import Checkbox from './checkbox';

// Construct the argTypes object
const argTypes = {};

// Storybook default export
export default {
    title: 'inputs/Checkbox',
    component: Checkbox,
    argTypes,
};

const Template = (args) => {
    return <Checkbox {...args}/>;
};

// Basic Demo
export const Basic = Template.bind({});
Basic.args = {

};
