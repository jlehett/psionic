import { fireEvent, render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { createFluxState } from '@psionic/flux';
import { _UNSAFE_nukeFluxManager } from '@psionic/flux/lib/flux-manager/flux-manager';
import { useStateReader } from '../lib';

beforeEach(() => {
    _UNSAFE_nukeFluxManager();
});

test('is able to respond to updates of FluxStates', async () => {
    const profileState = createFluxState({
        id: 'profileState',
        value: null,
    });

    const ComponentRelyingOnState = () => {
        const profile = useStateReader(profileState);

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
