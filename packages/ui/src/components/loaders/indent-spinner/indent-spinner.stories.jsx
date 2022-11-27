import {
    setAsCategory,
    setAsDisabled,
} from '@unifire-js/storybook-utils';
import IndentSpinner from './indent-spinner';

// Construct the argTypes object
const argTypes = {};
setAsCategory(argTypes, 'UI', [
    'color',
    'backgroundColor',
    'coloredIndent',
    'size',
    'speed',
]);
setAsCategory(argTypes, 'Pass Thru Props', [
    '...passThruProps',
]);

// Storybook default export
export default {
    title: 'loaders/IndentSpinner',
    component: IndentSpinner,
    argTypes,
};

const Template = (args) => {
    return (
        <div style={{ margin: '40px', padding: '20px', background: args.backgroundColor, borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', width: 'fit-content' }}>
            <IndentSpinner {...args}/>
        </div>
    );
};

// Basic Demo
export const Basic = Template.bind({});
Basic.args = {
    backgroundColor: '#ffffff',
};

// Colored Indent Demo
export const ColoredIndent = Template.bind({});
ColoredIndent.args = {
    color: '#23AFFD',
    backgroundColor: '#ffffff',
    coloredIndent: true,
};

// Size Override Demo
export const SizeOverride = Template.bind({});
SizeOverride.args = {
    backgroundColor: '#ffffff',
    size: 20,
};
