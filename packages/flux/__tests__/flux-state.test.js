import { expect } from 'chai';
import { createFluxState } from '../lib';
import { _UNSAFE_nukeFluxManager } from '../lib/flux-manager/flux-manager';

describe('FluxState', () => {

    beforeEach(() => {
        _UNSAFE_nukeFluxManager();
    });

    it('is able to hold some initial value', async () => {
        const userState = createFluxState({
            id: 'userState',
            value: { id: 'test-user' },
        });

        const user = userState.get();
        expect(user).to.deep.equal({ id: 'test-user' });
    });

    it('is able to set a new value', async () => {
        const userState = createFluxState({
            id: 'userState',
            value: null,
        });

        const userFirstValue = userState.get();
        userState.set({ id: 'test-user' });
        const userSecondValue = userState.get();

        expect(userFirstValue).to.equal(null) &&
        expect(userSecondValue).to.deep.equal({ id: 'test-user' });
    });

    it('creates a deep copy of the stored value when calling `get` to prevent external modification of the value', async () => {
        const userState = createFluxState({
            id: 'userState',
            value: {
                id: 'test-user',
                friends: {
                    'John': { displayName: 'John' },
                    'Roni': { displayName: 'Roni' },
                }
            }
        });

        const modifiedUser = userState.get();
        modifiedUser.id = 'modified-test-user';
        modifiedUser.friends['Roni'].displayName = 'Modified Roni';
        const unmodifiedUser = userState.get();

        expect(modifiedUser).to.deep.equal({
            id: 'modified-test-user',
            friends: {
                'John': { displayName: 'John' },
                'Roni': { displayName: 'Modified Roni' }
            }
        }) &&
        expect(unmodifiedUser).to.deep.equal({
            id: 'test-user',
            friends: {
                'John': { displayName: 'John' },
                'Roni': { displayName: 'Roni' },
            }
        });
    });

    it('does not create an additional FluxState if one already exists for the given ID', async () => {
        let userState = createFluxState({
            id: 'userState',
            value: { displayName: 'John' },
        });
        userState = createFluxState({
            id: 'userState',
            value: { displayName: 'Roni' },
        });
        const user = userState.get();

        const newUserState = createFluxState({
            id: 'newUserState',
            value: { displayName: 'Rob' },
        });
        const newUser = newUserState.get();

        // Expect the second `createFluxState` call to simply return the existing flux state with the given ID
        expect(user).to.deep.equal({ displayName: 'John' }) &&
        // Expect the third `createFluxState` call to create a new flux state since a new ID was given
        expect(newUser).to.deep.equal({ displayName: 'Rob' });
    });

});