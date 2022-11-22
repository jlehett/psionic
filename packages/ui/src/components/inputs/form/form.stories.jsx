import {
    ArgsTable,
    Primary,
    PRIMARY_STORY,
    Stories,
    Subtitle,
    Title,
} from '@storybook/addon-docs';
import {
    setAsCategory
} from '@unifire-js/storybook-utils';
import {
    TextField,
    Checkbox,
} from '@components/inputs';
import { Button } from '@components/buttons';
import { Code, CodeBlock } from '../../../../.storybook/misc';
import Form, { Form as docs } from './form';

// Construct the argTypes object
const argTypes = {};
setAsCategory(argTypes, 'UI', [
    'children',
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
    title: 'inputs/Form',
    component: docs,
    subcomponents: {
        TextField,
    },
    argTypes,
    parameters: {
        docs: {
            page: () => (
                <>
                    <div className="storybookWrapper">
                        <Title/>
                        <subtitle>A Wrapper For Better React Forms</subtitle>
                        <Subtitle/>
                        <h2>Why should I use the @psionic/ui Form component?</h2>
                        <p>
                            Using vanilla <Code>form</Code> elements in React often involves creating a lot of controlled inputs, which in turn, requires potentially many calls
                            to <Code>useState</Code> hooks to set up. Oftentimes, there is very little interesting code in the <Code>onChange</Code> handlers
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
                            The goal of the @psionic/ui <Code>Form</Code> component is to eliminate the need for setting up the controlled inputs, leaving you free
                            to develop the <i>interesting</i> parts of your application!
                        </p>
                        <h2>@psionic/ui Form Usage</h2>
                        <p>
                            Utilizing the @psionic/ui <Code>Form</Code> component is designed to be as easy as possible. The following code snippet sets up the same
                            form as the example above, but utilizing the @psionic/ui <Code>Form</Code> component:
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
                            Creating a vanilla HTML <Code>{`<button type="submit">`}</Code> button and clicking on it will automatically trigger
                            the <Code>Form</Code>'s <Code>onSubmit</Code> handler. To note, if any of the fields in the form are marked as invalid
                            {'('}either through an empty field with a <Code>required</Code> prop, or due to a <Code>validator</Code> prop for the
                            field{')'}, the <Code>onSubmit</Code> callback will NOT be called.
                        </p>
                        <p>
                            Creating a vanilla HTML <Code>{`<button type="reset">`}</Code> button and clicking on it will automatically clear the form,
                            just like with a vanilla JavaScript <Code>form</Code> element.
                        </p>
                        <p>
                            The important thing to note when using the <Code>Form</Code> component is that all inputs that you want to have auto-managed by
                            the <Code>Form</Code> should be utilizing one of the various input components provided in the @psionic/ui library.
                        </p>
                        <h2><Code>onSubmit</Code> and <Code>onChange</Code> Callbacks</h2>
                        <p>
                            The <Code>onSubmit</Code> and <Code>onChange</Code> callbacks for the @psionic/ui <Code>Form</Code> component take in a single param which
                            is an object that maps field keys to info about the field at the time the form was submitted / changed. See the documentation of the other
                            @psionic/ui input components for details about what is stored for that particular input in these callbacks' single parameter.
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

    // Submit handler
    function onSubmit(formData) {
        console.log('Form Data:', formData);
    }

    return (
        <Form
            onSubmit={onSubmit}
            style={{ margin: '40px', display: 'flex', flexDirection: 'column', gap: '16px' }}
            {...args}
        >
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0px' }}>
                <TextField required label="Name" fieldKey="name"/>
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
                <Checkbox
                    initialValue={false}
                    label="I agree with the terms of service"
                    fieldKey="termsOfServiceAccepted"
                />
            </div>
            <div style={{ display: 'flex', flexDirection: 'row', gap: '16px' }}>
                <Button
                    variant="contained"
                    type="submit"
                    allowMultipleClicks
                >
                    Submit Form
                </Button>
                <Button
                    variant="contained"
                    type="reset"
                    allowMultipleClicks
                >
                    Reset Form
                </Button>
            </div>
        </Form>
    );
};

// Basic Demo
export const Basic = Template.bind({});
Basic.args = {

};
