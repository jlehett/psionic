import {
    setAsCategory,
    setAsDisabled,
} from '@unifire-js/storybook-utils';
import ScrambleReveal from './scramble-reveal';

// Construct the argTypes object
const argTypes = {};
setAsCategory(argTypes, 'UI', [
    'lines',
    'iterationSpeed',
    'iterationsPerCharacter',
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
    title:     'text animations/ScrambleReveal',
    component: ScrambleReveal,
    argTypes,
};

function Template(args) {
    return (
        <div
            style={{
                width: '600px', height: 'fit-content', padding: '20px', margin: '40px', borderRadius: '10px', background: 'white',
            }}
        >
            <ScrambleReveal {...args} />
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
    activated: true,
    style:     {
        fontSize:   '24px',
        alignItems: 'center',
    },
};
