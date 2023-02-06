import {
    setAsCategory,
} from '@unifire-js/storybook-utils';
import delay from 'delay';
import Close from '@assets/close.svg';
import IconButton from './icon-button';

// Construct the argTypes object
const argTypes = {};
setAsCategory(argTypes, 'UI', [
    'size',
    'SvgIcon',
    'color',
    'paddingRatio',
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

// Storybook default export
export default {
    title:     'buttons/IconButton',
    component: IconButton,
    argTypes,
};

function Template(args) {
    return (
        <div style={{ margin: '40px' }}>
            <IconButton
                onClick={async () => delay(3000)}
                aria-label="Close"
                {...args}
            />
        </div>
    );
}

// Basic Demo
export const Basic = Template.bind({});
Basic.args = {
    SvgIcon: Close,
};

// Colored Demo
export const Colored = Template.bind({});
Colored.args = {
    SvgIcon: Close,
    color:   'red',
};

// Allow Multiple Clicks Demo
export const AllowMultipleClicks = Template.bind({});
AllowMultipleClicks.args = {
    SvgIcon:             Close,
    allowMultipleClicks: true,
};

// Padding Ratio Demo
export const PaddingRatio = Template.bind({});
PaddingRatio.args = {
    SvgIcon:      Close,
    paddingRatio: 0.25,
};

// Disabled Demo
export const Disabled = Template.bind({});
Disabled.args = {
    SvgIcon:  Close,
    disabled: true,
};
