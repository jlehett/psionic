import {
    setAsCategory,
    setAsDisabled,
    prepareStoryForModal,
} from '@unifire-js/storybook-utils';
import Check from '@assets/check.svg';
import FloatingActionMenu, { FloatingActionMenu as docs } from './floating-action-menu';

// Construct the argTypes object
const argTypes = {};
setAsCategory(argTypes, 'UI', [
    'MenuIcon',
    'openedColor',
    'closedColor',
]);
setAsCategory(argTypes, 'Menu Options', [
    'buttons',
]);

// Storybook default export
export default {
    title: 'floating actions/FloatingActionMenu',
    component: docs,
    argTypes,
};

const Template = (args) => {
    return <FloatingActionMenu {...args}/>;
};

// Basic Demo
export const Basic = Template.bind({});
prepareStoryForModal(Basic, 300);
Basic.args = {
    closedColor: '#0072E5',
    openedColor: '#0D0E12',
    buttons: [
        {
            Icon: Check,
            onClick: () => console.log('Clicked!'),
            color: '#0072E5',
        },
        {
            Icon: Check,
            onClick: () => console.log('Clicked!'),
            color: '#DD2222',
        },
    ],
};
