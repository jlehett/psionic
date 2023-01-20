import { useState } from 'react';
import {
    setAsCategory,
    setAsDisabled,
    prepareStoryForModal,
} from '@unifire-js/storybook-utils';
import { Button } from '@components/buttons';
import Dialog from './dialog';

// Construct the argTypes object
const argTypes = {};
setAsCategory(argTypes, 'UI', [
    'children',
]);
setAsCategory(argTypes, 'Controls', [
    'isOpen',
    'setIsOpen',
    'closeOnClickOutside',
]);
setAsCategory(argTypes, 'Pass Thru Props', [
    '...passThruProps',
]);
setAsDisabled(argTypes, [
    'style',
]);

// Storybook default export
export default {
    title:     'modals/Dialog',
    component: Dialog,
    argTypes,
};

function Template(args) {
    const [dialogIsOpen, setDialogIsOpen] = useState(false);

    return (
        <>
            <Dialog
                isOpen={dialogIsOpen}
                setIsOpen={setDialogIsOpen}
                {...args}
            >
                <div style={{ padding: '16px 24px', maxWidth: '600px' }}>
                    <h1 style={{
                        color: 'rgba(0, 0, 0, 0.87)', fontSize: '20px', fontWeight: '500', margin: 0,
                    }}
                    >
                        Use Google's location service?
                    </h1>
                    <p style={{ color: 'rgba(0, 0, 0, 0.6)', fontSize: '16px', fontWeight: '400' }}>
                        Let Google help apps determine location. This means sending anonymous
                        location data to Google, even when no apps are running.
                    </p>
                    <div style={{
                        display: 'flex', flexDirection: 'row', justifyContent: 'flex-end', gap: '8px',
                    }}
                    >
                        <Button variant="text" onClick={() => setDialogIsOpen(false)}>
                            Disagree
                        </Button>
                        <Button variant="text" onClick={() => setDialogIsOpen(false)}>
                            Agree
                        </Button>
                    </div>
                </div>
            </Dialog>
            <Button
                variant="contained"
                onClick={() => setDialogIsOpen(true)}
                style={{ margin: '40px' }}
            >
                Open Dialog
            </Button>
        </>
    );
}

// Basic Demo
export const Basic = Template.bind({});
prepareStoryForModal(Basic, 300);
Basic.args = {
    style: { width: '600px' },
};
