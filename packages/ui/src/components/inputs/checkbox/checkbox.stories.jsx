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
import Checkbox from './checkbox';

// Construct the argTypes object
const argTypes = {};
setAsCategory(argTypes, 'UI', [
    'label',
    'requiredMessage',
    'color',
]);
setAsCategory(argTypes, 'Controls', [
    'initialValue',
    'fieldKey',
    'required',
    'disabled',
]);
setAsCategory(argTypes, 'Pass Thru Props', [
    'InputProps',
    'LabelProps',
    '...passThruProps'
]);

// Storybook default export
export default {
    title: 'inputs/Checkbox',
    component: Checkbox,
    argTypes,
    parameters: {
        docs: {
            page: () => (
                <>
                    <div className="storybookWrapper">
                        <Title/>
                        <Subtitle/>
                        <p>
                            The <Code>Checkbox</Code> component provides a general purpose checkbox
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
                                        The type of the input. Always <Code>"checkbox"</Code>.
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
                                        Flag indicating whether the <Code>Checkbox</Code> was marked
                                        as <Code>required</Code> or not in its props.
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
                                        Flag indicating whether the checkbox was checked at the time
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
                                        The message associated with the checkbox's current state at
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
                                        Flag indicating whether the checkbox was valid at the time
                                        the form was submitted. The checkbox would only ever be
                                        invalid if it was marked as required, and the checkbox was
                                        unchecked at the time the form was submitted.
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
                                        Flag indicating whether the checkbox has remained unmodified since
                                        the form was last submitted. Used primarily for internal purposes,
                                        regarding when error states and messages should be displayed.
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

const Template = (args) => {
    return (
        <Form
            onSubmit={() => {}}
            style={{ margin: '40px' }}
        >
            <Checkbox
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
    label: 'I agree to the Terms of Service'
};

// Required Demo
export const Required = Template.bind({});
Required.args = {
    label: 'I agree to the Terms of Service',
    required: true,
};

// Custom Required Message Demo
export const RequiredMessage = Template.bind({});
RequiredMessage.args = {
    label: 'I agree to the Terms of Service',
    required: true,
    requiredMessage: 'You must agree to the Terms of Service to continue',
};

// Disabled Demo
export const Disabled = Template.bind({});
Disabled.args = {
    label: 'I agree to the Terms of Service',
    disabled: true,
}