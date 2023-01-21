import {
    setAsCategory,
    setAsDisabled,
} from '@unifire-js/storybook-utils';
import { motion } from 'framer-motion';
import SlideUp from './slide-up';

// Construct the argTypes object
const argTypes = {};
setAsCategory(argTypes, 'UI', [
    'children',
    'hiddenVariantOverride',
    'visibleVariantOverride',
]);
setAsCategory(argTypes, 'Controls', [
    'activated',
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

function GroupTemplate(args) {
    const variants = {
        visible: {
            transition: {
                when:            'beforeChildren',
                staggerChildren: 0.3,
            },
        },
        hidden: {
            transition: {
                when:             'afterChildren',
                staggerChildren:  0.3,
                staggerDirection: -1,
            },
        },
    };

    return (
        <motion.div
            style={{
                padding: '20px', margin: '40px', background: 'white', borderRadius: '8px', width: 'fit-content',
            }}
            variants={variants}
            initial="hidden"
            animate={args.activated ? 'visible' : 'hidden'}
        >
            <SlideUp>
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
            </SlideUp>
            <SlideUp>
                <h2>Even more text!</h2>
            </SlideUp>
            <SlideUp>
                <p>And even more!</p>
            </SlideUp>
            <SlideUp>
                <p>
                    Really, this is quite ridiculous now.
                </p>
            </SlideUp>
        </motion.div>
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
    activated: true,
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
    activated: true,
};

// Variant Override Demo
export const VariantOverride = Template.bind({});
VariantOverride.args = {
    children: (
        <h2 style={{ fontFamily: 'Roboto', margin: 0 }}>
            THE LATEST
        </h2>
    ),
    activated:             true,
    hiddenVariantOverride: {
        x:          '100%',
        transition: {
            duration: 0.65,
            ease:     [0.25, 0.46, 0.45, 0.94],
        },
    },
    visibleVariantOverride: {
        x:          '0%',
        transition: {
            duration: 0.65,
            ease:     [0.25, 0.46, 0.45, 0.94],
        },
    },
};

// Group Demo
export const Group = GroupTemplate.bind({});
Group.args = {
    activated: true,
};
