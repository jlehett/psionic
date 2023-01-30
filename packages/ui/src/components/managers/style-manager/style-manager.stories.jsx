import {
    setAsCategory,
    setAsDisabled,
} from '@unifire-js/storybook-utils';
import StyleManager from './style-manager';

// Construct the argTypes object
const argTypes = {};
setAsCategory(argTypes, 'UI', [
    'children',
    'theme',
]);

// Storybook default export
export default {
    title:     'managers/StyleManager',
    component: StyleManager,
    argTypes,
};

function Template(args) {
    return (
        <div style={{
            margin: '40px', background: 'white', padding: '20px', borderRadius: '8px', width: 'fit-content', height: 'fit-content',
        }}
        >
            <StyleManager {...args} />
        </div>
    );
}

// Basic Demo
export const Basic = Template.bind({});
Basic.args = {
    children: (
        <h1 style={{ fontFamily: 'Roboto', fontWeight: 100, margin: 0 }}>
            This is a demo of the Style Manager component.
        </h1>
    ),
};
