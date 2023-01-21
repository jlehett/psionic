import {
    setAsCategory,
    setAsDisabled,
} from '@unifire-js/storybook-utils';
import LetterSpacingReveal from './letter-spacing-reveal';

// Construct the argTypes object
const argTypes = {};
setAsCategory(argTypes, 'UI', [
    'children',
    'animationSpeed',
    'resetDelay',
    'startLetterSpacing',
    'endLetterSpacing',
]);
setAsCategory(argTypes, 'Pass Thru Props', [
    '...passThruProps',
]);
setAsDisabled(argTypes, [
    'style',
]);

// Storybook default export
export default {
    title:     'text animations/LetterSpacingReveal',
    component: LetterSpacingReveal,
    argTypes,
};

function Template(args) {
    return (
        <div
            style={{
                width: 'fit-content', height: 'fit-content', padding: '20px', margin: '40px', borderRadius: '10px', background: 'white',
            }}
        >
            <LetterSpacingReveal {...args} />
            <div style={{ marginBottom: '1200px' }}>Scroll down to see more.</div>
            <LetterSpacingReveal {...args} />
        </div>
    );
}

// Basic Demo
export const Basic = Template.bind({});
Basic.args = {
    children: 'Hello World',
};

// Style Override Demo
export const StyleOverride = Template.bind({});
StyleOverride.args = {
    children: 'Hello World',
    style:    {
        fontSize: '24px',
    },
};

// Reset Demo
export const Reset = Template.bind({});
Reset.args = {
    children:   'Hello World',
    resetDelay: 2,
};

// No Reset Delay Demo
export const NoResetDelay = Template.bind({});
NoResetDelay.args = {
    children:   'Hello World',
    resetDelay: 0,
};

// Complex Children Demo
export const ComplexChildren = Template.bind({});
ComplexChildren.args = {
    children: (
        <>
            <h1>
                <span style={{ color: 'red' }}>Hello</span>
                <span style={{ color: 'blue' }}>World</span>
            </h1>
            <p>How are you today?</p>
        </>
    ),
};

// Invert Letter Spacing Animation Demo
export const InvertLetterSpacingAnimation = Template.bind({});
InvertLetterSpacingAnimation.args = {
    children:           'Hello World',
    endLetterSpacing:   1,
    startLetterSpacing: 8,
};
