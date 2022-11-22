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
import { Form } from '@components/inputs';
import { Button } from '@components/buttons';
import { Code } from '../../../../.storybook/misc';
import TextField from './text-field';

// Construct the argTypes object
const argTypes = {};
setAsCategory(argTypes, 'UI', [
    'label',
]);
setAsCategory(argTypes, 'Controls', [
    'fieldKey',
    'initialValue',
    'type',
    'required',
    'validator',
]);
setAsCategory(argTypes, 'Pass Thru Props', [
    'InputProps',
    'LabelProps',
    '...passThruProps',
]);

// Storybook default export
export default {
    title: 'inputs/TextField',
    component: TextField,
    argTypes,
    parameters: {
        docs: {
            page: () => (
                <>
                    <div className="storybookWrapper">
                        <Title/>
                        <Subtitle/>
                        <p>
                            The <Code>TextField</Code> component provides a general purpose text field
                            plus label that can be used in the <Code>@psionic/ui</Code> <Code>Form</Code> flow.
                        </p>
                        <h2>
                            Form Field Information
                        </h2>
                        <p>
                            The following information is stored in an object under the
                            input's <Code>fieldKey</Code> in the form's <Code>onSubmit</Code> callback
                            param:
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
                                        The <Code>type</Code> from the <Code>TextField</Code>'s props.
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        required
                                    </td>
                                    <td>
                                        <Code>boolean</Code>
                                    </td>
                                    <td>
                                        Flag indicating whether the <Code>TextField</Code> was marked
                                        as <Code>required</Code> or not in its props.
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        value
                                    </td>
                                    <td>
                                        <Code>string</Code>
                                    </td>
                                    <td>
                                        The value held by the input field at the time the form was
                                        submitted.
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
                                        The message associated with the input field's current state at
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
                                        Flag indicating whether the input's value was valid at the time
                                        the form was submitted.
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        unmodifiedSinceLastSubmission
                                    </td>
                                    <td>
                                        <Code>boolean</Code>
                                    </td>
                                    <td>
                                        Flag indicating whether this input's value has remained unmodified
                                        since the form was last submitted. Used primarily for internal purposes,
                                        regarding when error states and messages should be displayed.
                                    </td>
                                </tr>
                            </table>
                        </p>
                        <p>
                            See the <Code>Form</Code> component's documentation for more
                            information about <Code>@psionic/ui</Code>'s <Code>Form</Code> workflow.
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

const Template = (args) => {
    return (
        <Form
            onSubmit={() => {}}
            style={{ margin: '40px' }}
        >
            <TextField
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
    label: 'Email',
};

// Required Demo
export const Required = Template.bind({});
Required.args = {
    label: 'Email',
    required: true,
};

// Password Demo
export const Password = Template.bind({});
Password.args = {
    label: 'Password',
    type: 'password',
};

// Initial Value Demo
export const InitialValue = Template.bind({});
InitialValue.args = {
    label: 'Email',
    initialValue: 'john@gmail.com',
};

// Validator Demo
export const Validator = Template.bind({});
Validator.args = {
    label: 'Password',
    type: 'password',
    required: true,
    validator: (value) => {
        if (value.length < 8) {
            return 'Password must contain at least 8 characters';
        }
        return null;
    }
};
