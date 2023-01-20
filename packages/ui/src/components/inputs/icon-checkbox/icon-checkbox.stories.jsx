import {
    setAsCategory,
} from '@unifire-js/storybook-utils';
import {
    ArgsTable,
    Primary,
    PRIMARY_STORY,
    Stories,
    Subtitle,
    Title,
} from '@storybook/addon-docs';
import Favorite from '@assets/favorite.svg';
import Check from '@assets/check.svg';
import { Form } from '@components/inputs';
import { Button } from '@components/buttons';
import { Code } from '../../../../.storybook/misc';
import IconCheckbox from './icon-checkbox';

// Construct the argTypes object
const argTypes = {};
setAsCategory(argTypes, 'UI', [
    'SvgIcon',
    'color',
    'size',
    'label',
]);
setAsCategory(argTypes, 'Controls', [
    'initialValue',
    'fieldKey',
    'disabled',
]);
setAsCategory(argTypes, 'Pass Thru Props', [
    'InputProps',
    'LabelProps',
    '...passThruProps',
]);

// Storybook default export
export default {
    title:      'inputs/IconCheckbox',
    component:  IconCheckbox,
    argTypes,
    parameters: {
        docs: {
            page: () => (
                <>
                    <div className="storybookWrapper">
                        <Title />
                        <Subtitle />
                        <p>
                            The
                            {' '}
                            <Code>IconCheckbox</Code>
                            {' '}
                            component provides a general purpose icon checkbox input
                            plus optional label that can be used in the
                            {' '}
                            <Code>@psionic/ui</Code>
                            {' '}
                            <Code>Form</Code>
                            {' '}
                            flow.
                        </p>
                        <h2>
                            Form Field Information
                        </h2>
                        <p>
                            The following information is stored in an object under the
                            input's
                            {' '}
                            <Code>fieldKey</Code>
                            {' '}
                            in the form's
                            {' '}
                            <Code>onSubmit</Code>
                            {' '}
                            callback param:
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
                                        The type of the input. Always
                                        {' '}
                                        <Code>"icon-checkbox"</Code>
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
                                        Flag indicating whether the icon checkbox was checked at the time the form was
                                        submitted.
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
                                        Flag indicating whether the icon checkbox was valid at the time the form
                                        was submitted. This will always be `true` for icon checkboxes, and is mostly
                                        used for internal purposes in the
                                        {' '}
                                        <Code>Form</Code>
                                        {' '}
                                        logic.
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        disabled
                                    </td>
                                    <td>
                                        <Code>disabled</Code>
                                    </td>
                                    <td>
                                        Flag indicating whether this input is disabled.
                                    </td>
                                </tr>
                            </table>
                        </p>
                        <p>
                            See the
                            {' '}
                            <Code>Form</Code>
                            {' '}
                            component's documentation for more information
                            about
                            {' '}
                            <Code>@psionic/ui</Code>
                            's
                            {' '}
                            <Code>Form</Code>
                            {' '}
                            workflow.
                        </p>
                    </div>
                    <Primary />
                    <ArgsTable story={PRIMARY_STORY} />
                    <Stories />
                </>
            ),
        },
    },
};

function Template(args) {
    return (
        <Form
            onSubmit={() => {}}
            style={{ margin: '40px' }}
        >
            <IconCheckbox
                fieldKey="testKey"
                style={{ marginBottom: '24px' }}
                ariaLabel="test icon checkbox"
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
}

// Basic Demo
export const Basic = Template.bind({});
Basic.args = {
    SvgIcon: Favorite,
};

// Initial Value Demo
export const InitialValue = Template.bind({});
InitialValue.args = {
    SvgIcon:      Favorite,
    initialValue: true,
};

// Labeled Demo
export const Labeled = Template.bind({});
Labeled.args = {
    SvgIcon: Favorite,
    label:   'Favorite',
};

// Customization Demo
export const Customization = Template.bind({});
Customization.args = {
    SvgIcon: Check,
    color:   '#f50a6c',
    size:    '60px',
};

// Disabled Demo
export const Disabled = Template.bind({});
Disabled.args = {
    SvgIcon:  Favorite,
    disabled: true,
    label:    'Favorite',
};
