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
import { Code } from '../../../../.storybook/misc';
import Input from './input';

// Construct the argTypes object
const argTypes = {};
setAsCategory(argTypes, 'Controls', [
    'fieldKey',
    'type',
    'initialValue',
    'required',
    'validator',
]);
setAsCategory(argTypes, 'Pass Thru Props', [
    '...passThruProps',
]);

// Storybook default export
export default {
    title: 'inputs/Input',
    component: Input,
    argTypes,
    parameters: {
        docs: {
            page: () => (
                <>
                    <div className="storybookWrapper">
                        <Title/>
                        <Subtitle/>
                        <p>
                            The <Code>Input</Code> component provides a simple unstyled input element that
                            integrates with the <Code>@psionic/ui</Code> <Code>Form</Code> flow. It can be
                            used as an alternative to the other already-styled input components for lower-level
                            control.
                        </p>
                        <h2>
                            Form Field Information
                        </h2>
                        <p>
                            Information regarding this input field is stored in an object under the
                            input's <Code>fieldKey</Code> in the form's <Code>onSubmit</Code> callback
                            param. Refer to the following component's documentation to see what information
                            is stored, based on what <Code>type</Code> the <Code>Input</Code> is:
                            <table className="twoCol">
                                <tr>
                                    <th>Type</th>
                                    <th>Component's Docs to Refer to</th>
                                </tr>
                                <tr>
                                    <td>
                                        <Code>email</Code>
                                    </td>
                                    <td>
                                        <Code>TextField</Code>
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <Code>password</Code>
                                    </td>
                                    <td>
                                        <Code>TextField</Code>
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <Code>text</Code>
                                    </td>
                                    <td>
                                        <Code>TextField</Code>
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <Code>url</Code>
                                    </td>
                                    <td>
                                        <Code>TextField</Code>
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
        <div style={{ margin: '40px' }}>
            <Input {...args}/>
        </div>
    );
};

// Text Input Demo
export const TextInput = Template.bind({});
TextInput.args = {
    initialValue: 'John',
    fieldKey: 'name',
    type: 'text',
};
