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
        <div style={{ width: '500px', height: 'fit-content', padding: '20px', margin: '40px', borderRadius: '10px', background: 'white' }}>
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
        alignText: 'center',
        textAlign: 'center',
    },
}