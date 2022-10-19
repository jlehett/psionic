import { useState } from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { emit } from '@psionic/emit';
import { useOnEmit } from '../lib';

test('is able to create a listener and have it automatically cancel when the component\'s lifecycle is complete', async () => {
    let value = 0;

    const Listener = () => {
        useOnEmit('increment', () => value++);

        return null;
    };

    const IncrementButton = () => {
        return <button onClick={() => {
            emit('increment');
            emit('check');
        }}>Increment Count</button>;
    };

    const Wrapper = () => {
        const [showListener, setShowListener] = useState(true);

        useOnEmit('check', () => {
            if (value >= 2) {
                setShowListener(false);
            }
        });

        return showListener
            ? (
                <>
                    <Listener/>
                    <IncrementButton/>
                </>
            )
            : <IncrementButton/>;
    };


    render(<Wrapper/>);

    const incrementButton = screen.getByRole('button');

    fireEvent.click(incrementButton);
    fireEvent.click(incrementButton);
    // This last one should not actually increment the value, since the listener is no longer being rendered
    fireEvent.click(incrementButton);

    expect(value).toEqual(2);
});

test('is able to cancel the created listener early', async () => {
    let value = 0;

    const Listener = () => {
        const [startListener, cancelListener, listenerIsActive] = useOnEmit('increment', () => {
            value++;
            cancelListener();
        });

        return null;
    };

    const IncrementButton = () => {
        return <button onClick={() => emit('increment')}>Increment Count</button>;
    };

    const Wrapper = () => (
        <>
            <Listener/>
            <IncrementButton/>
        </>
    );


    render(<Wrapper/>);

    const incrementButton = screen.getByRole('button');

    fireEvent.click(incrementButton);
    // These events should not actually increment the value, since the listener has been canceled early
    fireEvent.click(incrementButton);
    fireEvent.click(incrementButton);

    expect(value).toEqual(1);
});

test('is able to restart canceled listeners', async () => {
    let value = 0;
    let active = true;

    const Listener = () => {
        const [startListener, cancelListener, listenerIsActive] = useOnEmit('increment', () => {
            value++;
        });

        active = listenerIsActive;

        return <button onClick={() => listenerIsActive ? cancelListener() : startListener()}>
            Toggle Listener
        </button>;
    };

    const IncrementButton = () => {
        return <button onClick={() => {
            emit('increment');
            emit('check');
        }}>Increment</button>;
    };

    const Wrapper = () => {
        const [showListener, setShowListener] = useState(true);

        useOnEmit('check', () => {
            if (value >= 2) {
                setShowListener(false);
            }
        });

        return showListener
            ? (
                <>
                    <Listener/>
                    <IncrementButton/>
                </>
            )
            : <IncrementButton/>;
    };

    render(<Wrapper/>);

    const incrementButton = screen.getByText('Increment');
    const toggleListenerButton = screen.getByText('Toggle Listener');

    fireEvent.click(incrementButton);
    fireEvent.click(toggleListenerButton);
    fireEvent.click(incrementButton);
    fireEvent.click(incrementButton);
    fireEvent.click(incrementButton);
    fireEvent.click(incrementButton);
    fireEvent.click(toggleListenerButton);
    fireEvent.click(incrementButton);
    fireEvent.click(incrementButton);
    fireEvent.click(incrementButton);
    fireEvent.click(incrementButton);
    fireEvent.click(incrementButton);
    fireEvent.click(incrementButton);

    expect(value).toEqual(2);
});