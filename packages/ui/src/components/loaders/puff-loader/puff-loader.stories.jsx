import {
    setAsCategory,
    setAsDisabled,
} from '@unifire-js/storybook-utils';
import PuffLoader from './puff-loader';

// Construct the argTypes object
const argTypes = {};
setAsCategory(argTypes, 'UI', [
    'size',
    'color',
    'speed',
    'borderWidthMultiplier',
]);

// Storybook default export
export default {
    title: 'loaders/PuffLoader',
    component: PuffLoader,
    argTypes,
};

const Template = (args) => {
    return (
        <div style={{ margin: '40px', padding: '20px', background: '#fff', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', width: 'fit-content' }}>
            <PuffLoader {...args}/>
        </div>
    );
};

// Basic Demo
export const Basic = Template.bind({});
Basic.args = {

};

// Colored Demo
export const Colored = Template.bind({});
Colored.args = {
    color: '#DD2222',
};

// Size Override Demo
export const SizeOverride = Template.bind({});
SizeOverride.args = {
    size: 20,
    speed: 1.5,
};