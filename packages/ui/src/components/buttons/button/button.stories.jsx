import {
    setAsCategory,
    setAsDisabled,
    mockDelay,
} from '@unifire-js/storybook-utils';
import Button from './button';

// Construct the argTypes object
const argTypes = {};

// Storybook default export
export default {
    title: 'buttons/Button',
    component: Button,
    argTypes,
};

const Template = (args) => {
    return (
        <div style={{ margin: '40px' }}>
            <Button
                onClick={() => mockDelay(3000)}
                {...args}
            />
        </div>
    );
};

// Basic Demo
export const Basic = Template.bind({});
Basic.args = {
    children: 'Submit',
};
