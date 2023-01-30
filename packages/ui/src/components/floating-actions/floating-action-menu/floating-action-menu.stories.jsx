import {
    setAsCategory,
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
setAsCategory(argTypes, 'Pass Thru Props', [
    '...passThruProps',
]);

// Storybook default export
export default {
    title:     'floating actions/FloatingActionMenu',
    component: docs,
    argTypes,
};

function Template(args) {
    return <FloatingActionMenu {...args} aria-label="open floating menu" />;
}

// Basic Demo
export const Basic = Template.bind({});
prepareStoryForModal(Basic, 300);
Basic.args = {
    buttons: [
        {
            Icon:      Check,
            onClick:   () => console.log('Clicked!'),
            color:     '#0072E5',
            ariaLabel: 'Test Label',
        },
        {
            Icon:      Check,
            onClick:   () => console.log('Clicked!'),
            color:     '#DD2222',
            ariaLabel: 'Test Label',
        },
    ],
};
