import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import '@testing-library/jest-dom';
import delay from 'delay';
import { Button } from '../dist';

const delayTime = 1000;

test('tracks the "running" state properly whenever an async `onClick` callback is passed and `allowMultipleClicks` is set to `false`', async () => {
    const ButtonWrapper = () => {
        return (
            <Button
                onClick={async () => {
                    await delay(delayTime);
                }}
                data-testid="button"
            >
                Click Me
            </Button>
        );
    };

    render(<ButtonWrapper/>);

    const button = screen.getByTestId('button');

    expect(button.getAttribute('data-running', false));

    fireEvent.click(button);

    expect(button.getAttribute('data-running', true));

    await act(async () => {
        await delay(delayTime);
    });

    expect(button.getAttribute('data-running', false));
});

test('Does not track the "running" state for async `onClick` callbacks if `allowMultipleClicks` is set to `true`', async () => {
    const ButtonWrapper = () => {
        return (
            <Button
                onClick={async () => {
                    await delay(delayTime);
                }}
                allowMultipleClicks
                data-testid="button"
            >
                Click Me
            </Button>
        );
    };

    render(<ButtonWrapper/>);

    const button = screen.getByTestId('button');

    expect(button.getAttribute('data-running', false));

    fireEvent.click(button);

    expect(button.getAttribute('data-running', false));

    await act(async () => {
        await delay(delayTime);
    });

    expect(button.getAttribute('data-running', false));
});

test('Users cannot click buttons while they are in the "running" state.', async () => {
    let counter = 0;

    const ButtonWrapper = () => {
        return (
            <Button
                onClick={async () => {
                    counter++;
                    await delay(delayTime);
                }}
                data-testid="button"
            >
                Click Me
            </Button>
        );
    };

    render(<ButtonWrapper/>);

    const button = screen.getByTestId('button');

    expect(counter).toEqual(0);

    fireEvent.click(button);

    expect(counter).toEqual(1);

    fireEvent.click(button);
    fireEvent.click(button);
    fireEvent.click(button);

    expect(counter).toEqual(1);

    await act(async () => {
        await delay(delayTime);
    });

    expect(counter).toEqual(1);

    fireEvent.click(button);

    expect(counter).toEqual(2);
});