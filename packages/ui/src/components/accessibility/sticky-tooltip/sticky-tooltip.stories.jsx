import {
    setAsCategory,
    setAsDisabled,
    prepareStoryForModal,
} from '@unifire-js/storybook-utils';
import StickyTooltip from './sticky-tooltip';

// Construct the argTypes object
const argTypes = {};
setAsCategory(argTypes, 'UI', [
    'children',
    'content',
    'delay',
    'xOffset',
    'yOffset',
    'marginX',
    'marginY',
    'active',
]);
setAsCategory(argTypes, 'Pass Thru Props', [
    'TooltipProps',
    '...passThruProps',
]);
setAsDisabled(argTypes, [
    'style',
]);

// Storybook default export
export default {
    title:     'accessibility/StickyTooltip',
    component: StickyTooltip,
    argTypes,
};

function Template(args) {
    return (
        <div style={{ margin: '80px' }}>
            <StickyTooltip {...args} />
        </div>
    );
}

// Basic Demo
export const Basic = Template.bind({});
prepareStoryForModal(Basic, 500);
Basic.args = {
    children: (
        <button
            style={{
                width: '200px', height: '100px', cursor: 'pointer', background: 'white', outline: 'none', border: '1px solid black',
            }}
        >
            Submit
        </button>
    ),
    content: 'This is a really cool button!',
};

// Delay Demo
export const Delay = Template.bind({});
prepareStoryForModal(Delay, 500);
Delay.args = {
    children: (
        <button style={{
            width: '200px', height: '100px', cursor: 'pointer', background: 'white', outline: 'none', border: '1px solid black',
        }}
        >
            Submit
        </button>
    ),
    content: 'This is a really cool button!',
    delay:   1000,
};

// Set Offsets Demo
export const Offsets = Template.bind({});
prepareStoryForModal(Offsets, 500);
Offsets.args = {
    children: (
        <button style={{
            width: '200px', height: '100px', cursor: 'pointer', background: 'white', outline: 'none', border: '1px solid black',
        }}
        >
            Submit
        </button>
    ),
    content: 'This is a really cool button!',
    yOffset: -8,
    xOffset: 120,
};

// Complex Content Demo
export const ComplexContent = Template.bind({});
prepareStoryForModal(ComplexContent, 600);
ComplexContent.args = {
    children: (
        <button style={{
            width: '200px', height: '100px', cursor: 'pointer', background: 'white', outline: 'none', border: '1px solid black',
        }}
        >
            Submit
        </button>
    ),
    content: (
        <div>
            <h1>Complex Content</h1>
            <p>As you can see, this tooltip has more complex content.</p>
            <p>
                <b>Is this realistic?</b>
                {' '}
                Well, probably not, but we tested anyway.
            </p>
            <p>Here's an image:</p>
            <img
                style={{ width: '200px', height: '200px' }}
                src="https://upload.wikimedia.org/wikipedia/commons/thumb/6/6a/PNG_Test.png/383px-PNG_Test.png?20221031130701"
                alt="this is just a test"
            />
        </div>
    ),
};

// Inactive Demo
export const Inactive = Template.bind({});
prepareStoryForModal(Inactive, 500);
Inactive.args = {
    children: (
        <button
            style={{
                width: '200px', height: '100px', cursor: 'pointer', background: 'white', outline: 'none', border: '1px solid black',
            }}
        >
            Submit
        </button>
    ),
    content: 'This is a really cool button!',
    active:  false,
};
