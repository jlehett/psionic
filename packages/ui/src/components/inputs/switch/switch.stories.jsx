import {
    setAsCategory,
    setAsDisabled,
} from '@unifire-js/storybook-utils';
import {
    ArgsTable,
    Primary,
    PRIMARY_STORY,
    Stories,
    Subtitle,
    Title,
} from '@storybook/addon-docs';
import { Button } from '@components/buttons';
import { Form } from '@components/inputs';
import { Code } from '../../../../.storybook/misc';
import Switch from './switch';

// Construct the argTypes object
const argTypes = {};

// Storybook default export
export default {
    title: 'inputs/Switch',
    component: Switch,
    argTypes,
    parameters: {
        docs: {
            page: () => (
                <>
                    <div className="storybookWrapper">
                        <Title/>
                        <Subtitle/>
                        <p>
                            The <Code>Switch</Code> component provides a general purpose switch
                            input plus label that can be used in the <Code>@psionic/ui</Code> <Code>Form</Code> flow.
                        </p>
                        <h2>
                            Form Field Information
                        </h2>
                        <p>
                            The following information is stored in an object under the
                            input's <Code>fieldKey</Code> in the form's <Code>onSubmit</Code> callback param:
                            <table>
                                <tr>
                                    <th>Key</th>
                                    <th>Type</th>
                                    <th>Description</th>
                                </tr>
                                <tr>
                                    <td>
                                        type
                                    </td>
                                    <td>
                                        <Code>string</Code>
                                    </td>
                                    <td>
                                        The type of the input. Always <Code>"switch"</Code>.
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        checked
                                    </td>
                                    <td>
                                        <Code>boolean</Code>
                                    </td>
                                    <td>
                                        Flag indicating whether the switch was checked at the time
                                        the form was submitted.
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        message
                                    </td>
                                    <td>
                                        <Code>string</Code> <Code>null</Code>
                                    </td>
                                    <td>
                                        The message associated with the switch's current state at
                                        the time the form was submitted.
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        valid
                                    </td>
                                    <td>
                                        <Code>boolean</Code>
                                    </td>
                                    <td>
                                        Flag indicating whether the switch was valid at the time
                                        the form was submitted. This will always be `true`.
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        disabled
                                    </td>
                                    <td>
                                        <Code>boolean</Code>
                                    </td>
                                    <td>
                                        Flag indicating whether this input is disabled.
                                    </td>
                                </tr>
                            </table>
                        </p>
                        <p>
                            See the <Code>Form</Code> component's documentation for more information
                            about <Code>@psionic/ui</Code>'s <Code>Form</Code> workflow.
                        </p>
                    </div>
                    <Primary/>
                    <ArgsTable story={PRIMARY_STORY}/>
                    <Stories/>
                </>
            ),
        },
    },
};
setAsCategory(argTypes, 'UI', [
    'label',
    'color',
    'width',
    'height',
]);
setAsCategory(argTypes, 'Controls', [
    'initialValue',
    'fieldKey',
    'disabled',
]);
setAsCategory(argTypes, 'Pass Thru Props', [
    'InputProps',
    'LabelProps',
    '...passThruProps'
]);

const Template = (args) => {
    return (
        <Form
            onSubmit={() => {}}
            style={{ margin: '40px' }}
        >
            <Switch
                fieldKey="testKey"
                style={{ marginBottom: '16px' }}
                {...args}
            />
            <div style={{ display: 'flex', flexDirection: 'row', gap: '16px' }}>
                <Button
                    variant="contained"
                    type="submit"
                >
                    Submit
                </Button>
                <Button
                    variant="contained"
                    type="reset"
                >
                    Reset
                </Button>
            </div>
        </Form>
    );
};

// Basic Demo
export const Basic = Template.bind({});
Basic.args = {

};

// Labeled Demo
export const Labeled = Template.bind({});
Labeled.args = {
    label: 'Label',
};

// Disabled Demo
export const Disabled = Template.bind({});
Disabled.args = {
    label: 'Label',
    disabled: true,
};

// Large Demo
export const Large = Template.bind({});
Large.args = {
    width: 42 * 4,
    height: 24 * 4,
};
