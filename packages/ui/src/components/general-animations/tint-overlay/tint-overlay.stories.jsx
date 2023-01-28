import {
    setAsCategory,
    setAsDisabled,
} from '@unifire-js/storybook-utils';
import TintOverlay from './tint-overlay';

// Construct the argTypes object
const argTypes = {};
setAsCategory(argTypes, 'UI', [
    'children',
    'color',
    'animationSpeed',
]);
setAsCategory(argTypes, 'Controls', [
    'activated',
]);
setAsCategory(argTypes, 'Pass Thru Props', [
    '...passThruProps',
]);

// Storybook default export
export default {
    title:     'general animations/TintOverlay',
    component: TintOverlay,
    argTypes,
};

function Template(args) {
    return (
        <div
            style={{
                padding: '20px', margin: '40px', background: 'white', borderRadius: '8px', width: 'fit-content',
            }}
        >
            <TintOverlay {...args} />
        </div>
    );
}

// Basic Demo
export const Basic = Template.bind({});
Basic.args = {
    children: (
        <img
            style={{ width: '390px', height: '220px' }}
            src="https://images.contentstack.io/v3/assets/bltb6530b271fddd0b1/blt87ef4a8d56e3aced/63c1e9c9ca4ee4418bab9432/Val_Banner_PatchNotes_6_01_16x9.jpg?auto=webp&disable=upscale&width=390"
            alt="test"
        />
    ),
    activated: true,
};

// Colored Demo
export const Colored = Template.bind({});
Colored.args = {
    children: (
        <img
            style={{ width: '390px', height: '220px' }}
            src="https://images.contentstack.io/v3/assets/bltb6530b271fddd0b1/blt87ef4a8d56e3aced/63c1e9c9ca4ee4418bab9432/Val_Banner_PatchNotes_6_01_16x9.jpg?auto=webp&disable=upscale&width=390"
            alt="test"
        />
    ),
    activated: true,
    color:     'red',
};

// Animation Speed Demo
export const AnimationSpeed = Template.bind({});
AnimationSpeed.args = {
    children: (
        <img
            style={{ width: '390px', height: '220px' }}
            src="https://images.contentstack.io/v3/assets/bltb6530b271fddd0b1/blt87ef4a8d56e3aced/63c1e9c9ca4ee4418bab9432/Val_Banner_PatchNotes_6_01_16x9.jpg?auto=webp&disable=upscale&width=390"
            alt="test"
        />
    ),
    activated:      true,
    animationSpeed: 2.0,
};
