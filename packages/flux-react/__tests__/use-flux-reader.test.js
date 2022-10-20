import { fireEvent, render, screen } from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import '@testing-library/jest-dom';
import {
    createFluxState,
    createFluxCache,
} from '@psionic/flux';
import delay from 'delay';
import { _UNSAFE_nukeFluxManager } from '@psionic/flux/lib/flux-manager/flux-manager';
import { useFluxReader } from '../lib';

// Define some delay time to use whenever mocking async delays
const delayTime = 50;

beforeEach(() => {
    _UNSAFE_nukeFluxManager();
});

test('is able to respond to updates of FluxStates', async () => {
    const profileState = createFluxState({
        id: 'profileState',
        value: null,
    });

    const ComponentRelyingOnState = () => {
        const [
            profile,
            profileIsStale,
            profileLoading
        ] = useFluxReader(profileState);

        return (
            <>
                <p data-testid="profileName">
                    {profile?.name || 'No Content'}
                </p>
                <button onClick={() => profileState.set({ name: 'John' })}>
                    Set to John
                </button>
                <button onClick={() => profileState.set({ name: 'Roni' })}>
                    Set to Roni
                </button>
            </>
        );
    };

    render(<ComponentRelyingOnState/>);

    const setToJohnButton = screen.getByText('Set to John');
    const setToRoniButton = screen.getByText('Set to Roni');

    const resultText = screen.getByTestId('profileName');

    expect(resultText).toHaveTextContent('No Content');

    fireEvent.click(setToJohnButton);
    expect(resultText).toHaveTextContent('John');

    fireEvent.click(setToRoniButton);
    expect(resultText).toHaveTextContent('Roni');
});

test('is able to respond to updates of FluxCaches', async () => {
    const profileCache = createFluxCache({
        id: 'profileCache',
        fetch: async () => {
            await delay(delayTime);
            return { name: 'John' };
        },
        staleAfter: delayTime,
    });

    let renders = 0;
    const ComponentRelyingOnCache = () => {
        const [
            profile,
            profileIsStale,
            profileLoading
        ] = useFluxReader(profileCache);

        renders++;

        return (
            <>
                <p data-testid="profileName">
                    {profile?.name || 'No Content'}
                </p>
                <p data-testid="profileIsStale">
                    {profileIsStale ? 'True' : 'False'}
                </p>
                <p data-testid="profileIsLoading">
                    {profileLoading ? 'True' : 'False'}
                </p>
                <button onClick={() => { profileCache.get() }}>
                    Fetch Profile
                </button>
            </>
        );
    };

    act(() => {
        render(<ComponentRelyingOnCache/>)
    });

    const fetchButton = screen.getByRole('button');
    const profileName = screen.getByTestId('profileName');
    const profileIsStale = screen.getByTestId('profileIsStale');
    const profileIsLoading = screen.getByTestId('profileIsLoading');

    expect(profileName).toHaveTextContent('No Content');
    expect(profileIsStale).toHaveTextContent('True');
    expect(profileIsLoading).toHaveTextContent('False');

    act(() => {
        fireEvent.click(fetchButton);
        fireEvent.click(fetchButton);
    });

    expect(profileName).toHaveTextContent('No Content');
    expect(profileIsStale).toHaveTextContent('True');
    expect(profileIsLoading).toHaveTextContent('True');

    await act(async () => {
        await delay(delayTime);
    });

    expect(profileName).toHaveTextContent('John');
    expect(profileIsStale).toHaveTextContent('False');
    expect(profileIsLoading).toHaveTextContent('False');

    await act(async () => {
        await delay(delayTime);
    });

    expect(profileName).toHaveTextContent('John');
    expect(profileIsStale).toHaveTextContent('True');
    expect(profileIsLoading).toHaveTextContent('False');

    act(() => {
        fireEvent.click(fetchButton);
        fireEvent.click(fetchButton);
    });

    expect(profileName).toHaveTextContent('John');
    expect(profileIsStale).toHaveTextContent('True');
    expect(profileIsLoading).toHaveTextContent('True');

    await act(async () => {
        await delay(delayTime);
    });

    expect(profileName).toHaveTextContent('John');
    expect(profileIsStale).toHaveTextContent('False');
    expect(profileIsLoading).toHaveTextContent('False');

    act(() => {
        profileCache.setStale(true);
    });

    expect(profileName).toHaveTextContent('John');
    expect(profileIsStale).toHaveTextContent('True');
    expect(profileIsLoading).toHaveTextContent('False');

    act(() => {
        profileCache.setStale(false);
    });

    expect(profileName).toHaveTextContent('John');
    expect(profileIsStale).toHaveTextContent('False');
    expect(profileIsLoading).toHaveTextContent('False');

    act(() => {
        profileCache.setStale(true);
    });

    expect(profileName).toHaveTextContent('John');
    expect(profileIsStale).toHaveTextContent('True');
    expect(profileIsLoading).toHaveTextContent('False');

    await act(async () => {
        profileCache.updateFetch(async () => {
            await delay(delayTime);
            return { name: 'Roni' };
        });
    });

    expect(profileName).toHaveTextContent('John');
    expect(profileIsStale).toHaveTextContent('True');
    expect(profileIsLoading).toHaveTextContent('False');

    act(() => {
        profileCache.get();
    });

    expect(profileName).toHaveTextContent('John');
    expect(profileIsStale).toHaveTextContent('True');
    expect(profileIsLoading).toHaveTextContent('True');

    await act(async () => {
        await delay(delayTime);
    });

    expect(profileName).toHaveTextContent('Roni');
    expect(profileIsStale).toHaveTextContent('False');
    expect(profileIsLoading).toHaveTextContent('False');
});