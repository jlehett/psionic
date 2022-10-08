import { expect } from 'chai';
import { createFluxState, _UNSAFE_nukeFluxManager } from '../lib';

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

});