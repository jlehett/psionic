import {
    setAsCategory,
    setAsDisabled,
} from '@unifire-js/storybook-utils';
import SnackbarManager from './snackbar-manager';

// Construct the argTypes object
const argTypes = {};

// Storybook default export
export default {
    title: 'managers/SnackbarManager',
    component: SnackbarManager,
    argTypes,
};

const Template = (args) => {
    return <SnackbarManager {...args}/>;
};

// Basic Demo
export const Basic = Template.bind({});
Basic.args = {

};
