import {
    setAsCategory,
    setAsDisabled,
} from '@unifire-js/storybook-utils';
import Check from '@assets/check.svg';
import VisibilityOff from '@assets/visibility-off.svg';
import Snackbar from './snackbar';

// Construct the argTypes object
const argTypes = {};
setAsCategory(argTypes, 'UI', [
    'color',
    'SvgIcon',
    'text',
]);
setAsCategory(argTypes, 'Controls', [
    'removeSnackbar',
]);
setAsCategory(argTypes, 'Pass Thru Props', [
    '...passThruProps',
]);

// Storybook default export
export default {
    title: 'modals/Snackbar',
    component: Snackbar,
    argTypes,
};

const Template = (args) => {
    return (
        <div style={{ margin: '40px' }}>
            <Snackbar
                removeSnackbar={() => {}}
                {...args}
            />
        </div>
    );
};

// Basic Demo
export const Basic = Template.bind({});
Basic.args = {
    SvgIcon: Check,
    text: 'You have successfully completed this task',
};

// Colored Demo
export const Colored = Template.bind({});
Colored.args = {
    SvgIcon: VisibilityOff,
    text: 'You are now on mute',
    color: 'red',
};