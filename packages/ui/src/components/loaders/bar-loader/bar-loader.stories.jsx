import {
    setAsCategory,
    setAsDisabled,
} from '@unifire-js/storybook-utils';
import BarLoader from './bar-loader';

// Construct the argTypes object
const argTypes = {};
setAsCategory(argTypes, 'UI', [
    'color',
    'speed',
    'width',
    'height',
]);
setAsCategory(argTypes, 'Controls', [
    'progress',
]);

// Storybook default export
export default {
    title: 'loaders/BarLoader',
    component: BarLoader,
    argTypes,
};

const Template = (args) => {
    return (
        <div style={{ margin: '40px', padding: '20px', background: '#fff', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', width: 'fit-content', height: 'fit-content' }}>
            <BarLoader {...args}/>
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
    color: '#DD2222',
};

// Size Override Demo
export const SizeOverride = Template.bind({});
SizeOverride.args = {
    width: 200,
    height: 15,
};

// Progress Demo
export const Progress = Template.bind({});
Progress.args = {
    progress: 0.33,
    speed: 0.1,
};