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
import { Radio, Form } from '@components/inputs';
import { Button } from '@components/buttons';
import { Code } from '../../../../.storybook/misc';
import RadioGroup from './radio-group';

// Construct the argTypes object
const argTypes = {};
setAsCategory(argTypes, 'UI', [
    'color',
    'label',
    'requiredMessage',
]);
setAsCategory(argTypes, 'Controls', [
    'initialValue',
    'fieldKey',
    'disabled',
    'required',
    'children',
]);
setAsCategory(argTypes, 'Pass Thru Props', [
    '...passThruProps',
]);

// Storybook default export
export default {
    title: 'inputs/RadioGroup',
    component: RadioGroup,
    argTypes,
    parameters: {
        docs: {
            page: () => (
                <>
                    <div className="storybookWrapper">
                        <Title/>
                        <Subtitle/>
                        <p>
                            The <Code>RadioGroup</Code> component provides a general purpose radio select
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
                                        The type of the input. Always <Code>"radio"</Code>.
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
                                        Flag indicating whether the <Code>RadioGroup</Code> was marked
                                        as <Code>required</Code> or not in its props.
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        value
                                    </td>
                                    <td>
                                        <Code>*</Code>
                                    </td>
                                    <td>
                                        The value of the selected `Radio` in the `RadioGroup` component.
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
                                        The message associated with the radio group's current state at
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
                                        Flag indicating whether the radio group was valid at the time
                                        the form was submitted. The radio group would only ever be
                                        invalid if it was marked as required, and no radio was
                                        selected at the time the form was submitted.
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
                                        Flag indicating whether the radio group has remained unmodified since
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
            <RadioGroup
                fieldKey="testKey"
                {...args}
            >
                <Radio value="red">
                    Red
                </Radio>
                <Radio value="green">
                    Green
                </Radio>
                <Radio value="blue">
                    Blue
                </Radio>
            </RadioGroup>
            <div style={{ display: 'flex', flexDirection: 'row', gap: '16px', marginTop: '16px' }}>
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

// Initial Value Demo
export const InitialValue = Template.bind({});
InitialValue.args = {
    initialValue: 'green',
};

// Labeled Demo
export const Labeled = Template.bind({});
Labeled.args = {
    label: 'Favorite Color',
};

// Required Demo
export const Required = Template.bind({});
Required.args = {
    label: 'Favorite Color',
    required: true,
};

// Required Message Demo
export const RequiredMessage = Template.bind({});
RequiredMessage.args = {
    label: 'Favorite Color',
    required: true,
    requiredMessage: 'Please select a color',
};

// Disabled Demo
export const Disabled = Template.bind({});
Disabled.args = {
    label: 'Favorite Color',
    disabled: true,
};