import {
    setAsCategory,
    setAsDisabled,
} from '@unifire-js/storybook-utils';
import FloatingActionMenu from './floating-action-menu';

// Construct the argTypes object
const argTypes = {};
setAsCategory(argTypes, 'UI', [
    'MenuIcon',
    'openedColor',
    'closedColor',
]);

// Storybook default export
export default {
    title: 'floating actions/FloatingActionMenu',
    component: FloatingActionMenu,
    argTypes,
};

const Template = (args) => {
    return <FloatingActionMenu {...args}/>;
};

// Basic Demo
export const Basic = Template.bind({});
Basic.args = {
    closedColor: '#0072E5',
    openedColor: '#0D0E12'
};
