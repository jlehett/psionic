import {
    setAsCategory,
    setAsDisabled,
} from '@unifire-js/storybook-utils';
import BouncingText from './bouncing-text';

// Construct the argTypes object
const argTypes = {};
setAsCategory(argTypes, 'UI', [
    'lines',
    'bounceSpeed',
    'waveGranularity',
    'amplitude',
    'frequency',
]);
setAsCategory(argTypes, 'Pass Thru Props', [
    '...passThruProps',
]);
setAsDisabled(argTypes, [
    'style',
]);

// Storybook default export
export default {
    title: 'text animations/BouncingText',
    component: BouncingText,
    argTypes,
};

const Template = (args) => {
    return (
        <div style={{ width: 'fit-content', height: 'fit-content', padding: '20px', margin: '40px', borderRadius: '10px', background: 'white' }}>
            <BouncingText {...args}/>
        </div>
    );
};

// Basic Demo
export const Basic = Template.bind({});
Basic.args = {
    lines: [
        "Loading",
    ],
};

// Style Override Demo
export const StyleOverride = Template.bind({});
StyleOverride.args = {
    lines: [
        'Why hello there!',
        'How are you doing?',
    ],
    style: {
        fontSize: '24px',
        alignItems: 'center',
    },
};

// High Frequency Demo
export const HighFrequency = Template.bind({});
HighFrequency.args = {
    lines: [
        "This is a high frequency demo!",
    ],
    frequency: 0.15,
};

// High Amplitude Demo
export const HighAmplitude = Template.bind({});
HighAmplitude.args = {
    lines: [
        "This is a high amplitude demo!",
    ],
    amplitude: 20,
};

// High Bounce Speed Demo
export const HighBounceSpeed = Template.bind({});
HighBounceSpeed.args = {
    lines: [
        "This is a high bounce speed demo!",
    ],
    bounceSpeed: 0.15,
};

// High Wave Granularity Demo
export const HighWaveGranularity = Template.bind({});
HighWaveGranularity.args = {
    lines: [
        "This is a high wave granularity demo!",
    ],
    waveGranularity: 4,
};
