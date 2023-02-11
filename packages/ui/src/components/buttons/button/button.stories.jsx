import {
    setAsCategory,
    setAsDisabled,
    mockDelay,
} from '@unifire-js/storybook-utils';
import Button from './button';

// Construct the argTypes object
const argTypes = {};
setAsCategory(argTypes, 'UI', [
    'children',
    'color',
    'variant',
    'rounded',
    'width',
    'height',
    'darkMode',
]);
setAsCategory(argTypes, 'Controls', [
    'type',
    'onClick',
    'disabled',
    'allowMultipleClicks',
    'disabledOnFormSubmitting',
]);
setAsCategory(argTypes, 'Pass Thru Props', [
    '...passThruProps',
]);
setAsDisabled(argTypes, [
    'style',
]);

// Storybook default export
export default {
    title:     'buttons/Button',
    component: Button,
    argTypes,
};

function Template(args) {
    return (
        <div
            style={{
                margin: '40px', padding: '20px', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', width: 'fit-content',
            }}
        >
            <Button
                onClick={async () => {
                    console.log('Button clicked!');
                    await mockDelay(3000);
                }}
                {...args}
            />
        </div>
    );
}

// Outlined Demo
export const Outlined = Template.bind({});
Outlined.args = {
    children: 'Submit',
    variant:  'outlined',
};

// Contained Demo
export const Contained = Template.bind({});
Contained.args = {
    children: 'Submit',
    variant:  'contained',
};

// Text Demo
export const Text = Template.bind({});
Text.args = {
    children: 'Submit',
    variant:  'text',
};

// Set Height and Width Demo
export const SetDimensions = Template.bind({});
SetDimensions.args = {
    children: 'Submit',
    variant:  'contained',
    width:    '400px',
    height:   '80px',
    style:    {
        fontSize: '32px',
    },
};

// Dark Mode Demo
export const DarkMode = Template.bind({});
DarkMode.args = {
    children: 'Submit',
    variant:  'contained',
    darkMode: true,
};
