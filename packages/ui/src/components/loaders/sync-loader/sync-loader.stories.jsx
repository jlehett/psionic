import {
    setAsCategory,
    setAsDisabled,
} from '@unifire-js/storybook-utils';
import SyncLoader from './sync-loader';

// Construct the argTypes object
const argTypes = {};
setAsCategory(argTypes, 'UI', [
    'size',
    'color',
    'speed',
]);

// Storybook default export
export default {
    title: 'loaders/SyncLoader',
    component: SyncLoader,
    argTypes,
};

const Template = (args) => {
    return (
        <div style={{ margin: '40px', background: 'white', borderRadius: '8px', height: '100px', width: '100px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <SyncLoader {...args}/>
        </div>
    );
};

// Basic Demo
export const Basic = Template.bind({});
Basic.args = {

};
