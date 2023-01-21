import {
    setAsCategory,
    setAsDisabled,
} from '@unifire-js/storybook-utils';
import SlideUp from './slide-up';

// Construct the argTypes object
const argTypes = {};
setAsCategory(argTypes, 'UI', [
    'children',
    'resetDelay',
]);
setAsCategory(argTypes, 'Pass Thru Props', [
    '...passThruProps',
]);

// Storybook default export
export default {
    title:     'general animations/SlideUp',
    component: SlideUp,
    argTypes,
};

function Template(args) {
    return (
        <div
            style={{
                padding: '20px', margin: '40px', background: 'white', borderRadius: '8px', width: 'fit-content',
            }}
        >
            <SlideUp {...args} />
        </div>
    );
}

// Basic Demo
export const Basic = Template.bind({});
Basic.args = {
    children: (
        <h2 style={{ fontFamily: 'Roboto', margin: 0 }}>
            THE LATEST
        </h2>
    ),
};

// Complex Demo
export const Complex = Template.bind({});
Complex.args = {
    children: (
        <>
            <h2
                style={{
                    fontFamily: 'Roboto', margin: 0, transform: 'translateY(20px) scaleY(1.3)', color: '#ff4655', fontSize: '56px', fontWeight: 800,
                }}
            >
                THE LATEST
            </h2>
            <img
                style={{ width: '390px', height: '220px' }}
                src="https://images.contentstack.io/v3/assets/bltb6530b271fddd0b1/blt87ef4a8d56e3aced/63c1e9c9ca4ee4418bab9432/Val_Banner_PatchNotes_6_01_16x9.jpg?auto=webp&disable=upscale&width=390"
                alt="test"
            />
        </>
    ),
};
