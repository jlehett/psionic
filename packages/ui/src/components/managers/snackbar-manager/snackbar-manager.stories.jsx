import { useContext } from 'react';
import {
    setAsCategory,
    setAsDisabled,
    prepareStoryForModal,
} from '@unifire-js/storybook-utils';
import {
    ArgsTable,
    Primary,
    PRIMARY_STORY,
    Stories,
    Subtitle,
    Title,
} from '@storybook/addon-docs';
import Check from '@assets/check.svg';
import {
    SnackbarAPI,
} from '@contexts';
import { Button } from '@components/buttons';
import { Snackbar } from '@components/modals';
import { Code, CodeBlock } from '../../../../.storybook/misc';
import SnackbarManager, { SnackbarManager as docs } from './snackbar-manager';

// Construct the argTypes object
const argTypes = {};
setAsCategory(argTypes, 'UI', [
    'children',
    'maxSnackbars',
]);

// Storybook default export
export default {
    title: 'managers/SnackbarManager',
    component: docs,
    argTypes,
    parameters: {
        docs: {
            page: () => (
                <>
                    <div className="storybookWrapper">
                        <Title/>
                        <Subtitle/>
                        <p>
                            The <Code>SnackbarManager</Code> component provides a wrapper component that can be
                            included near the root of your app to allow you to imperatively add snackbars to an
                            animated snackbar display in the bottom left of the user's screen.
                        </p>
                        <p>
                            Once the <Code>SnackbarManager</Code> is included in your app, any child components
                            of <Code>SnackbarManager</Code> will be able to make use of the <Code>useSnackbar</Code> hook
                            which will return a function that can be used to add a new snackbar to the display.
                        </p>
                        <p>
                            The function returned from the <Code>useSnackbar</Code> hook takes the following params:
                        </p>
                        <table>
                            <tr>
                                <th>
                                    Type
                                </th>
                                <th>
                                    Default
                                </th>
                                <th>
                                    Description
                                </th>
                            </tr>
                            <tr>
                                <td>
                                    <Code>React.FunctionComponent</Code>
                                </td>
                                <td>
                                    <i>None</i>
                                </td>
                                <td style={{ lineHeight: '22px' }}>
                                    The component to render as a snackbar in the snackbar manager. This component will
                                    automatically be animated in and out via the manager. This component will also be
                                    passed a <Code>removeSnackbar</Code> function as a prop to allow the component to
                                    remove itself from the snackbar manager early, if desired.
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <Code>number</Code>
                                </td>
                                <td>
                                    <Code>3000</Code>
                                </td>
                                <td>
                                    The duration, in milliseconds, to display the snackbar before it is automatically
                                    removed from the manager.
                                </td>
                            </tr>
                        </table>
                        <p>
                            The component you choose to display can be anything you'd like, as shown in the demos.
                        </p>
                        <p>
                            Here's an example of how to use the <Code>useSnackbar</Code> hook:
                        </p>
                        <CodeBlock>
                            {
`import { SnackbarManager, useSnackbar } from '@psionic/ui';
import SomeCoolSvgIcon from 'some-cool-svg-icon';

// Make sure that the SnackbarManager is included in your app
const App = () => {
        return (
                  <SnackbarManager>
                <MyComponent/>
        </SnackbarManager>
        );
}

const MyComponent = () => {
        // Call the useSnackbar hook to get the addSnackbar function
        const addSnackbar = useSnackbar();

        // We'll define an onClick handler to add a new snackbar
        const handleAddSnackbarClick = () => {
                addSnackbar(
                        ({ removeSnackbar }) => (
                                <Snackbar
                  SvgIcon={SomeCoolSvgIcon}
                  text="This is a new snackbar"
                  removeSnackbar={removeSnackbar}
              />
                        )
                );
        };

        // As an example, we don't have to use the removeSnackbar prop if we want to use
        // some other custom UI for the snackbar
        const handleAddCustomSnackbarClick = () => {
                addSnackbar(
                        () => (
                                <div style={{ width: '20px', height: '20px', backgroundColor: 'blue' }}/>
                        ),
                        // We can also specify how long this snackbar should last, in milliseconds
                        5000,
                );
        };

        return (
                <div>
            <button onClick={handleAddSnackbarClick}>
                Add Snackbar
            </button
            <button onClick={handleAddCustomSnackbarClick}>
                Add Custom Snackbar
            </button>
       </div>
   );
}`
                            }
                        </CodeBlock>
                    </div>
                    <Primary/>
                    <ArgsTable story={PRIMARY_STORY}/>
                    <Stories/>
                </>
            ),
        },
    },
};

const AddSnackbarButtons = () => {
    const snackbarAPI = useContext(SnackbarAPI);

    return (
        <div style={{ display: 'flex', flexDirection: 'row', gap: '16px' }}>
            <Button
                variant="contained"
                onClick={() => {
                    snackbarAPI.addSnackbar(({ removeSnackbar }) => (
                        <Snackbar
                            SvgIcon={Check}
                            text="This is a new snackbar"
                            removeSnackbar={removeSnackbar}
                        />
                    ))
                }}
            >
                Add Snackbar
            </Button>
            <Button
                variant="contained"
                onClick={() => {
                    snackbarAPI.addSnackbar(({ removeSnackbar }) => (
                        <Button
                            variant="contained"
                            onClick={() => {}}
                        >
                            See, Snackbars can be anything!
                        </Button>
                    ))
                }}
            >
                Add Custom Snackbar
            </Button>
            <Button
                variant="contained"
                onClick={() => {
                    snackbarAPI.addSnackbar(({ removeSnackbar }) => (
                        <img
                            style={{ width: '50px', height: '50px' }}
                            src="https://upload.wikimedia.org/wikipedia/commons/thumb/6/6a/PNG_Test.png/383px-PNG_Test.png?20221031130701"
                        />
                    ))
                }}
            >
                Add Ridiculous Snackbar
            </Button>
        </div>
    )
}

const Template = (args) => {
    return (
        <SnackbarManager {...args}>
            <div style={{ margin: '40px' }}>
                <AddSnackbarButtons/>
            </div>
        </SnackbarManager>
    );
};

// Basic Demo
export const Basic = Template.bind({});
prepareStoryForModal(Basic, 350);
Basic.args = {

};

// Higher Max Snackbars Demo
export const HigherMaxSnackbars = Template.bind({});
prepareStoryForModal(HigherMaxSnackbars, 500);
HigherMaxSnackbars.args = {
    maxSnackbars: 6,
};
