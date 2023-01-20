import React from 'react';
import {
    setAsCategory,
    prepareStoryForModal,
} from '@unifire-js/storybook-utils';
import Check from '@assets/check.svg';
import { FloatingActionMenu } from '@components/floating-actions';
import FloatingActionButton from './floating-action-button';

// Construct the argTypes object
const argTypes = {};
setAsCategory(argTypes, 'UI', [
    'SvgIcon',
    'color',
]);
setAsCategory(argTypes, 'Accessibility', [
    'ariaLabel',
]);
setAsCategory(argTypes, 'Controls', [
    'onClick',
    'menuIndex',
]);
setAsCategory(argTypes, 'Pass Thru Props', [
    '...passThruProps',
]);

// Storybook default export
export default {
    title:     'floating actions/FloatingActionButton',
    component: FloatingActionButton,
    argTypes,
};

function Template() {
    return (
        <FloatingActionMenu
            buttons={[
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
            ]}
            aria-label="open floating menu"
        />
    );
}

// Basic Demo
export const Basic = Template.bind({});
prepareStoryForModal(Basic, 300);
Basic.args = {

};
