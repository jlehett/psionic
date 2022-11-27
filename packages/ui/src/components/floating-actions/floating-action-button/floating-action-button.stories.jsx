import React from 'react';
import {
    setAsCategory,
    setAsDisabled,
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
setAsCategory(argTypes, 'Controls', [
    'onClick',
    'menuIndex',
]);

// Storybook default export
export default {
    title: 'floating actions/FloatingActionButton',
    component: FloatingActionButton,
    argTypes,
};

const Template = (args) => {
    return (
        <FloatingActionMenu
            buttons={[
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
            ]}
        />
    );
};

// Basic Demo
export const Basic = Template.bind({});
prepareStoryForModal(Basic, 300);
Basic.args = {

};
