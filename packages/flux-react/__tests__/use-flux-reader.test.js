import { fireEvent, render, screen } from '@testing-library/react';
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

// test('is able to respond to updates of FluxStates', async () => {
//     const profileState = createFluxState({
//         id: 'profileState',
//         value: null,
//     });

//     const ComponentRelyingOnState = () => {
//         const [
//             profile,
//             profileIsStale,
//             profileLoading
//         ] = useFluxReader(profileState);

//         return (
//             <>
//                 <p data-testid="profileName">
//                     {profile?.name || 'No Content'}
//                 </p>
//                 <button onClick={() => profileState.set({ name: 'John' })}>
//                     Set to John
//                 </button>
//                 <button onClick={() => profileState.set({ name: 'Roni' })}>
//                     Set to Roni
//                 </button>
//             </>
//         );
//     };

//     render(<ComponentRelyingOnState/>);

//     const setToJohnButton = screen.getByText('Set to John');
//     const setToRoniButton = screen.getByText('Set to Roni');

//     const resultText = screen.getByTestId('profileName');

//     expect(resultText).toHaveTextContent('No Content');

//     fireEvent.click(setToJohnButton);
//     expect(resultText).toHaveTextContent('John');

//     fireEvent.click(setToRoniButton);
//     expect(resultText).toHaveTextContent('Roni');
// });

test('is able to respond to updates of FluxCaches', async () => {
    let renders = 0;

    const profileCache = createFluxCache({
        id: 'profileCache',
        fetch: async () => {
            await delay(delayTime);
            return { name: 'John' };
        },
        staleAfter: delayTime,
    });

    console.log(profileCache);
    profileCache.get().catch(() => {});
    profileCache.get().catch((err) => console.log(err));

    // const ComponentRelyingOnCache = () => {
    //     const [
    //         profile,
    //         profileIsStale,
    //         profileLoading
    //     ] = useFluxReader(profileCache);

    //     renders++;

    //     return (
    //         <>
    //             <p data-testid="profileName">
    //                 {profile?.name || 'No Content'}
    //             </p>
    //             <p data-testid="profileIsStale">
    //                 {profileIsStale ? 'True' : 'False'}
    //             </p>
    //             <p data-testid="profileIsLoading">
    //                 {profileLoading ? 'True' : 'False'}
    //             </p>
    //             <button onClick={() => { console.log(profileCache.get); profileCache.get() }}>
    //                 Fetch Profile
    //             </button>
    //         </>
    //     );
    // };

    // render(<ComponentRelyingOnCache/>);

    // const fetchButton = screen.getByRole('button');
    // const profileName = screen.getByTestId('profileName');
    // const profileIsStale = screen.getByTestId('profileIsStale');
    // const profileIsLoading = screen.getByTestId('profileIsLoading');

    // expect(renders).toEqual(1);
    // expect(profileName).toHaveTextContent('No Content');
    // expect(profileIsStale).toHaveTextContent('True');
    // expect(profileIsLoading).toHaveTextContent('False');

    // fireEvent.click(fetchButton);
    // fireEvent.click(fetchButton);

    // await delay(delayTime);

    // expect(renders).toEqual(2);
    // expect(profileName).toHaveTextContent('No Content');
    // expect(profileIsStale).toHaveTextContent('True');
    // expect(profileIsLoading).toHaveTextContent('False');

    // await delay(delayTime);

    // expect(renders).toEqual(3);
    // expect(profileName).toHaveTextContent('John');
    // expect(profileIsStale).toHaveTextContent('False');
    // expect(profileIsLoading).toHaveTextContent('False');

    // await delay(delayTime);

    // expect(renders).toEqual(4);
    // expect(profileName).toHaveTextContent('John');
    // expect(profileIsStale).toHaveTextContent('True');
    // expect(profileIsLoading).toHaveTextContent('False');

    // fireEvent.click(fetchButton);
    // fireEvent.click(fetchButton);

    // expect(renders).toEqual(5);
    // expect(profileName).toHaveTextContent('John');
    // expect(profileIsStale).toHaveTextContent('False');
    // expect(profileIsLoading).toHaveTextContent('True');

    // await delay(delayTime);

    // expect(renders).toEqual(6);
    // expect(profileName).toHaveTextContent('John');
    // expect(profileIsStale).toHaveTextContent('False');
    // expect(profileIsLoading).toHaveTextContent('False');

    // profileCache.setStale(true);

    // expect(renders).toEqual(7);
    // expect(profileName).toHaveTextContent('John');
    // expect(profileIsStale).toHaveTextContent('True');
    // expect(profileIsLoading).toHaveTextContent('False');

    // profileCache.setStale(false);

    // expect(renders).toEqual(8);
    // expect(profileName).toHaveTextContent('John');
    // expect(profileIsStale).toHaveTextContent('False');
    // expect(profileIsLoading).toHaveTextContent('False');

    // profileCache.setStale(true);

    // expect(renders).toEqual(9);
    // expect(profileName).toHaveTextContent('John');
    // expect(profileIsStale).toHaveTextContent('False');
    // expect(profileIsLoading).toHaveTextContent('False');
});