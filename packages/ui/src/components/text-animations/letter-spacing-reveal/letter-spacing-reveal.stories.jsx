import {
    setAsCategory,
    setAsDisabled,
} from '@unifire-js/storybook-utils';
import { motion } from 'framer-motion';
import LetterSpacingReveal from './letter-spacing-reveal';

// Construct the argTypes object
const argTypes = {};
setAsCategory(argTypes, 'UI', [
    'children',
    'animationSpeed',
    'startLetterSpacing',
    'endLetterSpacing',
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
    title:     'text animations/LetterSpacingReveal',
    component: LetterSpacingReveal,
    argTypes,
};

function Template(args) {
    return (
        <div
            style={{
                width: '500px', height: 'fit-content', padding: '20px', margin: '40px', borderRadius: '10px', background: 'white',
            }}
        >
            <LetterSpacingReveal {...args} />
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
                width: '500px', height: 'fit-content', padding: '20px', margin: '40px', borderRadius: '10px', background: 'white',
            }}
            variants={variants}
            initial="hidden"
            animate={args.activated ? 'visible' : 'hidden'}
        >
            <LetterSpacingReveal {...args} activated={undefined} />
            <LetterSpacingReveal {...args} activated={undefined} />
            <LetterSpacingReveal {...args} activated={undefined} />
            <LetterSpacingReveal {...args} activated={undefined} />
            <LetterSpacingReveal {...args} activated={undefined} />
            <LetterSpacingReveal {...args} activated={undefined} />
        </motion.div>
    );
}

// Basic Demo
export const Basic = Template.bind({});
Basic.args = {
    children:  'Hello World',
    activated: true,
};

// Style Override Demo
export const StyleOverride = Template.bind({});
StyleOverride.args = {
    children: 'Hello World',
    style:    {
        fontSize: '24px',
    },
    activated: true,
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
    activated: true,
};

// Invert Letter Spacing Animation Demo
export const InvertLetterSpacingAnimation = Template.bind({});
InvertLetterSpacingAnimation.args = {
    children:           'Hello World',
    endLetterSpacing:   1,
    startLetterSpacing: 8,
    activated:          true,
};

// Group Demo
export const Group = GroupTemplate.bind({});
Group.args = {
    children:  'Hello World',
    activated: true,
};
