import {
    setAsCategory,
    setAsDisabled,
} from '@unifire-js/storybook-utils';
import PulseLoader from './pulse-loader';

// Construct the argTypes object
const argTypes = {};
setAsCategory(argTypes, 'UI', [
    'size',
    'color',
    'speed',
]);

// Storybook default export
export default {
    title: 'loaders/PulseLoader',
    component: PulseLoader,
    argTypes,
};

const Template = (args) => {
    return (
        <div style={{ margin: '40px', background: 'white', borderRadius: '8px', width: 'fit-content', height: 'fit-content', padding: '80px 20px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <PulseLoader {...args}/>
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
    color: 'red',
};

// Size Override Demo
export const SizeOverride = Template.bind({});
SizeOverride.args = {
    size: 50,
};
