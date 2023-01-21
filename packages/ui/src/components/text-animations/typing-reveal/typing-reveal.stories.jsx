import {
    setAsCategory,
    setAsDisabled,
} from '@unifire-js/storybook-utils';
import TypingReveal from './typing-reveal';

// Construct the argTypes object
const argTypes = {};
setAsCategory(argTypes, 'UI', [
    'lines',
    'typingSpeed',
    'fadeSpeed',
]);
setAsCategory(argTypes, 'Controls', [
    'activated',
]);
setAsCategory(argTypes, 'Pass Thru Props', [
    '...passThruProps',
]);
setAsDisabled(argTypes, [
    'style',
]);

// Storybook default export
export default {
    title:     'text animations/TypingReveal',
    component: TypingReveal,
    argTypes,
};

function Template(args) {
    return (
        <div
            style={{
                width: 'fit-content', height: 'fit-content', padding: '20px', margin: '40px', borderRadius: '10px', background: 'white',
            }}
        >
            <TypingReveal {...args} />
        </div>
    );
}

// Basic Demo
export const Basic = Template.bind({});
Basic.args = {
    lines: [
        "'Why waste time say lot word",
        "when few word do trick...'",
    ],
    activated: true,
};

// Style Override Demo
export const StyleOverride = Template.bind({});
StyleOverride.args = {
    lines: [
        "'Why waste time say lot word",
        "when few word do trick...'",
    ],
    style: {
        fontSize:   '24px',
        alignItems: 'center',
    },
    activated: true,
};
