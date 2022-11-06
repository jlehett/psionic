import {
    setAsCategory,
    setAsDisabled,
} from '@unifire-js/storybook-utils';
import QuarterSpinner from './quarter-spinner';

// Construct the argTypes object
const argTypes = {};

// Storybook default export
export default {
    title: 'spinners/QuarterSpinner',
    component: QuarterSpinner,
    argTypes,
};

const Template = (args) => {
    return <QuarterSpinner {...args}/>;
};

// Basic Demo
export const Basic = Template.bind({});
Basic.args = {

};
