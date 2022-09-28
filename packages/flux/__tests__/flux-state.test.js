import { expect } from 'chai';
import { FluxState } from '../lib';

describe('FluxState', () => {

    it('is able to set an initial value and read that value', async () => {
        const profileState = new FluxState({ name: 'John' });
        const profile = profileState.get();
        expect(profile).to.deep.equal({ name: 'John' });
    });

    it('clones the return of the `get` method so changes to that reference don\'t affect the internal FluxState data', async () => {
        const profileState = new FluxState({ name: 'John' });
        const profileToModify = profileState.get();
        profileToModify.favoriteNumber = 42;
        const profile = profileState.get();
        expect(profile).to.deep.equal({ name: 'John' });
    });

    it('is able to set a new value for the FluxState', async () => {
        const profileState = new FluxState({ name: 'John', favoriteNumber: 42 });
        profileState.set({ name: 'Roni' });
        const profile = profileState.get();
        expect(profile).to.deep.equal({ name: 'Roni' });
    });

});