import {
    setAsCategory,
    setAsDisabled,
} from '@unifire-js/storybook-utils';
import QuarterSpinner from './quarter-spinner';

// Construct the argTypes object
const argTypes = {};
setAsCategory(argTypes, 'UI', [
    'color',
    'size',
    'innerWidthRatio',
    'speed',
]);

// Storybook default export
export default {
    title: 'loaders/QuarterSpinner',
    component: QuarterSpinner,
    argTypes,
};

const Template = (args) => {
    return (
        <div style={{ margin: '40px', padding: '20px', background: '#fff', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', width: 'fit-content' }}>
            <QuarterSpinner {...args}/>
        </div>
    );
};

// Basic Demo
export const Basic = Template.bind({});
Basic.args = {

};

// Colored Demo
export const Colored = Template.bind({});
Colored.args = {
    color: '#00aaff',
};

// Size Override Demo
export const SizeOverride = Template.bind({});
SizeOverride.args = {
    size: 20,
    innerWidthRatio: 0.4,
};
