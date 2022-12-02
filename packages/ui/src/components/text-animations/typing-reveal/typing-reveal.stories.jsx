import {
    setAsCategory,
    setAsDisabled,
} from '@unifire-js/storybook-utils';
import TypingReveal from './typing-reveal';

// Construct the argTypes object
const argTypes = {};

// Storybook default export
export default {
    title: 'text animations/TypingReveal',
    component: TypingReveal,
    argTypes,
};

const Template = (args) => {
    return (
        <div style={{ width: 'fit-content', height: 'fit-content', padding: '20px', margin: '40px', borderRadius: '10px', background: 'white' }}>
            <TypingReveal {...args}/>
            <div style={{ marginBottom: '1200px' }}>Scroll down to see more.</div>
            <TypingReveal {...args}/>
        </div>
    );
};

// Basic Demo
export const Basic = Template.bind({});
Basic.args = {
    lines: [
        "'Why waste time say lot word",
        "when few word do trick...'",
    ],
};

// Style Override Demo
export const StyleOverride = Template.bind({});
StyleOverride.args = {
    lines: [
        "'Why waste time say lot word",
        "when few word do trick...'",
    ],
    style: {
        fontSize: '24px',
        alignItems: 'center',
    },
};

// No Reset Demo
export const NoReset = Template.bind({});
NoReset.args = {
    lines: [
        "'Why waste time say lot word",
        "when few word do trick...'",
    ],
    resetWhenNotVisible: false,
};
