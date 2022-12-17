import {
    setAsCategory,
    setAsDisabled,
} from '@unifire-js/storybook-utils';
import CircularSpinner from './circular-spinner';

// Construct the argTypes object
const argTypes = {};
setAsCategory(argTypes, 'UI', [
    'size',
    'innerWidthRatio',
    'color',
    'speed',
    'hideBackground',
]);
setAsCategory(argTypes, 'Controls', [
    'progress',
]);

// Storybook default export
export default {
    title: 'loaders/CircularSpinner',
    component: CircularSpinner,
    argTypes,
};

const Template = (args) => {
    return (
        <div style={{ margin: '40px', padding: '20px', background: '#fff', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', width: 'fit-content' }}>
            <CircularSpinner {...args}/>
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
    size: 200,
    innerWidthRatio: 0.25,
};

// Hide Background Demo
export const HideBackground = Template.bind({});
HideBackground.args = {
    hideBackground: true,
};

// Progress Demo
export const Progress = Template.bind({});
Progress.args = {
    progress: 0.33,
    speed: 0.15,
};