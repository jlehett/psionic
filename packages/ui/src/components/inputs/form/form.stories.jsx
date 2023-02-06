import { useCallback, useRef } from 'react';
import {
    ArgsTable,
    Primary,
    PRIMARY_STORY,
    Stories,
    Subtitle,
    Title,
} from '@storybook/addon-docs';
import delay from 'delay';
import {
    setAsCategory,
} from '@unifire-js/storybook-utils';
import Favorite from '@assets/favorite.svg';
import {
    TextField,
    Checkbox,
    IconCheckbox,
    Radio,
    RadioGroup,
    Switch,
} from '@components/inputs';
import { Button } from '@components/buttons';
import { Code, CodeBlock } from '../../../../.storybook/misc';
import Form, { Form as docs } from './form';

// Construct the argTypes object
const argTypes = {};
setAsCategory(argTypes, 'UI', [
    'children',
]);
setAsCategory(argTypes, 'Data', [
    'initialFormData',
]);
setAsCategory(argTypes, 'Callbacks', [
    'onSubmit',
    'onChange',
]);
setAsCategory(argTypes, 'Pass Thru Props', [
    '...passThruProps',
]);

// Storybook default export
export default {
    title:         'inputs/Form',
    component:     docs,
    subcomponents: {
        TextField,
    },
    argTypes,
    parameters: {
        docs: {
            page: () => (
                <>
                    <div className="storybookWrapper">
                        <Title />
                        <subtitle>A Wrapper For Better React Forms</subtitle>
                        <Subtitle />
                        <h2>Why should I use the @psionic/ui Form component?</h2>
                        <p>
                            Using vanilla
                            {' '}
                            <Code>form</Code>
                            {' '}
                            elements in React often involves creating a lot of controlled inputs, which in turn, requires potentially many calls
                            to
                            {' '}
                            <Code>useState</Code>
                            {' '}
                            hooks to set up. Oftentimes, there is very little interesting code in the
                            {' '}
                            <Code>onChange</Code>
                            {' '}
                            handlers
                            for these form input fields, and it could all be considered boilerplate. An example is given below:
                        </p>
                        <CodeBlock>
                            {
                                `import { useState } from 'react';

const ExampleForm = () => {

        const [name, setName] = useState('');
        const [email, setEmail] = useState('');

        const onSubmit = (event) => {
                event.preventDefault();

                console.log(\`Name: \${name} | Email: \${email}\`);
        };

        const onReset = (event) => {
                event.preventDefault();

                setName('');
                setEmail('');
        };

        return (
                <form>
            <label>Name</label>
            <input
                value={name}
                onChange={(event) => setName(event.target.value)}
            />
            <label>Email</label>
            <input
                value={email}
                onChange={(event) => setEmail(event.target.value)}
            />
            <button type="submit">
                Submit
            </button>
            <button type="reset">
                Reset
            </button>
        </form>
        );
};`
                            }
                        </CodeBlock>
                        <p>
                            The goal of the @psionic/ui
                            {' '}
                            <Code>Form</Code>
                            {' '}
                            component is to eliminate the need for setting up the controlled inputs, leaving you free
                            to develop the
                            {' '}
                            <i>interesting</i>
                            {' '}
                            parts of your application!
                        </p>
                        <h2>@psionic/ui Form Usage</h2>
                        <p>
                            Utilizing the @psionic/ui
                            {' '}
                            <Code>Form</Code>
                            {' '}
                            component is designed to be as easy as possible. The following code snippet sets up the same
                            form as the example above, but utilizing the @psionic/ui
                            {' '}
                            <Code>Form</Code>
                            {' '}
                            component:
                        </p>
                        <CodeBlock>
                            {
                                `import { Form, TextField } from '@psionic/ui';

const ExampleForm = () => {

    const onSubmit = (formData) => {
        console.log(\`Name: \${formData.name.value} | Email: \${formData.email.value}\`);
    };

    return (
        <Form onSubmit={onSubmit}>
            <TextField
                label="Name"
                fieldKey="name"
            />
            <TextField
                label="Email"
                fieldKey="email"
            />
            <button type="submit">
                Submit
            </button>
            <button type="reset">
                Reset
            </button>
        </Form>
    );
};`
                            }
                        </CodeBlock>
                        <p>
                            Creating a vanilla HTML
                            {' '}
                            <Code>{'<button type="submit">'}</Code>
                            {' '}
                            button and clicking on it will automatically trigger
                            the
                            {' '}
                            <Code>Form</Code>
                            's
                            {' '}
                            <Code>onSubmit</Code>
                            {' '}
                            handler. To note, if any of the fields in the form are marked as invalid
                            (
                            either through an empty field with a
                            {' '}
                            <Code>required</Code>
                            {' '}
                            prop, or due to a
                            {' '}
                            <Code>validator</Code>
                            {' '}
                            prop for the
                            field
                            )
                            , the
                            {' '}
                            <Code>onSubmit</Code>
                            {' '}
                            callback will NOT be called.
                        </p>
                        <p>
                            Creating a vanilla HTML
                            {' '}
                            <Code>{'<button type="reset">'}</Code>
                            {' '}
                            button and clicking on it will automatically clear the form,
                            just like with a vanilla JavaScript
                            {' '}
                            <Code>form</Code>
                            {' '}
                            element.
                        </p>
                        <p>
                            The important thing to note when using the
                            {' '}
                            <Code>Form</Code>
                            {' '}
                            component is that all inputs that you want to have auto-managed by
                            the
                            {' '}
                            <Code>Form</Code>
                            {' '}
                            should be utilizing one of the various input components provided in the @psionic/ui library.
                        </p>
                        <h2>
                            <Code>onSubmit</Code>
                            {' '}
                            and
                            {' '}
                            <Code>onChange</Code>
                            {' '}
                            Callbacks
                        </h2>
                        <p>
                            The
                            {' '}
                            <Code>onSubmit</Code>
                            {' '}
                            and
                            {' '}
                            <Code>onChange</Code>
                            {' '}
                            callbacks for the @psionic/ui
                            {' '}
                            <Code>Form</Code>
                            {' '}
                            component take in a single param which
                            is an object that maps field keys to info about the field at the time the form was submitted / changed. See the documentation of the other
                            @psionic/ui input components for details about what is stored for that particular input in these callbacks' single parameter.
                        </p>
                        <h2>
                            <Code>useFormField</Code>
                            {' '}
                            Hook
                        </h2>
                        <p>
                            Sometimes you may have a form field that cannot be represented by one of the built-in components provided in this package. In order to
                            integrate these fields into the
                            {' '}
                            <Code>Form</Code>
                            {' '}
                            component's flow, you can use the
                            {' '}
                            <Code>useFormField</Code>
                            {' '}
                            hook that is provided by
                            the package.
                        </p>
                        <p>
                            The
                            {' '}
                            <Code>useFormField</Code>
                            {' '}
                            component takes in a single configuration object as its only param, with the following properties:
                        </p>
                        <table>
                            <tr>
                                <th>Key</th>
                                <th>Type</th>
                                <th>Description</th>
                            </tr>
                            <tr>
                                <td>
                                    fieldKey
                                </td>
                                <td>
                                    <Code>string</Code>
                                </td>
                                <td>
                                    The key used to represent the field in the form data.
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    type
                                </td>
                                <td>
                                    <Code>string</Code>
                                </td>
                                <td>
                                    The type of input that the field represents. This is used to determine how the data is stored for the field.
                                    The following types are supported:
                                    <ul>
                                        <li><Code>email</Code></li>
                                        <li><Code>password</Code></li>
                                        <li><Code>text</Code></li>
                                        <li><Code>url</Code></li>
                                        <li><Code>radio</Code></li>
                                        <li><Code>checkbox</Code></li>
                                        <li><Code>icon-checkbox</Code></li>
                                        <li><Code>switch</Code></li>
                                    </ul>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    initialValue
                                </td>
                                <td>
                                    <Code>*</Code>
                                </td>
                                <td>
                                    The initial value that the form field should have.
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    disabled
                                </td>
                                <td>
                                    <Code>bool</Code>
                                </td>
                                <td>
                                    Whether this form field is currently disabled or not.
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    validator
                                </td>
                                <td>
                                    <Code>function</Code>
                                </td>
                                <td>
                                    The validation function to run as the user changes the input's value.
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    required
                                </td>
                                <td>
                                    <Code>bool</Code>
                                </td>
                                <td>
                                    Whether this form field should be marked as required or not.
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    requiredMessage
                                </td>
                                <td>
                                    <Code>string</Code>
                                </td>
                                <td>
                                    The helper message to store in the form field's data if the field's data is empty, but was marked as
                                    required when the form was submitted.
                                </td>
                            </tr>
                        </table>
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
    // Submit handler
    const onSubmit = useCallback(async (formData) => {
        await delay(3000);
        console.log('Form Data:', formData);
    }, []);

    const formRef = useRef();

    console.log(formRef.current);

    return (
        <Form
            ref={formRef}
            onSubmit={onSubmit}
            style={{
                margin: '40px', display: 'flex', flexDirection: 'column', gap: '16px',
            }}
            {...args}
        >
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0px' }}>
                <TextField required label="Name" fieldKey="name" />
                <TextField
                    required
                    label="Password"
                    fieldKey="password"
                    type="password"
                    validator={(value) => {
                        if (value.length < 8) {
                            return 'Password must contain at least 8 characters';
                        }
                        return null;
                    }}
                />
                <RadioGroup
                    fieldKey="favoriteColor"
                    label="Favorite Color"
                    required
                    style={{ marginTop: '16px' }}
                >
                    <Radio value="red" id="red">
                        Red
                    </Radio>
                    <Radio value="green" id="green">
                        Green
                    </Radio>
                    <Radio value="blue" id="blue">
                        Blue
                    </Radio>
                </RadioGroup>
                <Switch
                    initialValue={false}
                    label="Enable Notifications"
                    fieldKey="notificationsEnabled"
                    style={{ marginTop: '16px' }}
                />
                <Checkbox
                    initialValue={false}
                    label="I agree with the terms of service"
                    fieldKey="termsOfServiceAccepted"
                    required
                    style={{ marginTop: '16px' }}
                />
                <IconCheckbox
                    SvgIcon={Favorite}
                    label="Favorite App"
                    fieldKey="favoritedApp"
                    color="#f50a6c"
                    style={{ marginBottom: '8px', marginTop: '16px' }}
                />
            </div>
            <div style={{ display: 'flex', flexDirection: 'row', gap: '16px' }}>
                <Button
                    variant="contained"
                    type="submit"
                >
                    Submit Form
                </Button>
                <Button
                    variant="contained"
                    type="reset"
                    disabledOnFormSubmitting
                >
                    Reset Form
                </Button>
            </div>
        </Form>
    );
}

// Basic Demo
export const Basic = Template.bind({});
Basic.args = {

};
