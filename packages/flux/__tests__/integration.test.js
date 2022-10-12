import { expect } from 'chai';
import delay from 'delay';
import {
    createFluxCache,
    createFluxState,
} from '../lib';
import { _UNSAFE_nukeFluxManager } from '../lib/flux-manager/flux-manager';

const delayTime = 50;

describe('Integration Tests', () => {

    beforeEach(() => {
        _UNSAFE_nukeFluxManager();
    });

    it('returns the already existing Flux object for the given ID, if one already exists -- even if it is a different type', async () => {
        const profileCache = createFluxCache({
            id: 'profile',
            fetch: () => ({ name: 'John' }),
        });
        const profileState = createFluxState({
            id: 'profile',
            value: { name: 'Roni' },
        });

        const profileFromCache = await profileCache.get();
        const profileFromState = await profileCache.get();

        expect(profileFromCache).to.deep.equal({ name: 'John' }) &&
        expect(profileFromState).to.deep.equal({ name: 'John' });
    });

    it('is able to handle Flux object dependencies for FluxCaches', async () => {
        const profileIDState = createFluxState({
            id: 'profileIDState',
            value: 'John',
        });
        const profileCache = createFluxCache({
            id: 'profileCache',
            fetch: async () => {
                const profileID = await profileIDState.get();
                return { name: profileID };
            },
            dependsOn: [profileIDState],
        });
        const friendsCache = createFluxCache({
            id: 'friendsCache',
            fetch: async () => {
                const profile = await profileCache.get();
                switch (profile.name) {
                    case 'John':
                        return ['Roni'];
                    case 'Roni':
                        return ['John'];
                    default:
                        return ['Roni', 'John'];
                }
            },
            dependsOn: [profileCache],
        });

        const profileCacheStaleQueries = [];
        const friendsCacheStaleQueries = [];

        const profileIDReadings = [];
        const profileReadings = [];
        const friendsReadings = [];

        profileCacheStaleQueries.push(profileCache.getStale());
        friendsCacheStaleQueries.push(friendsCache.getStale());
        profileIDReadings.push(await profileIDState.get());
        profileReadings.push(await profileCache.get());
        friendsReadings.push(await friendsCache.get());
        profileCacheStaleQueries.push(profileCache.getStale());
        friendsCacheStaleQueries.push(friendsCache.getStale());

        profileIDState.set('Roni');

        profileCacheStaleQueries.push(profileCache.getStale());
        friendsCacheStaleQueries.push(friendsCache.getStale());
        profileIDReadings.push(await profileIDState.get());
        profileReadings.push(await profileCache.get());
        friendsReadings.push(await friendsCache.get());
        profileCacheStaleQueries.push(profileCache.getStale());
        friendsCacheStaleQueries.push(friendsCache.getStale());

        profileCache.setStale(true);
        profileCacheStaleQueries.push(profileCache.getStale());
        friendsCacheStaleQueries.push(friendsCache.getStale());

        profileCache.setStale(false);
        profileCacheStaleQueries.push(profileCache.getStale());
        friendsCacheStaleQueries.push(friendsCache.getStale());

        expect(profileCacheStaleQueries).to.deep.equal([
            true,
            false,
            true,
            false,
            true,
            false
        ]) &&
        expect(friendsCacheStaleQueries).to.deep.equal([
            true,
            false,
            true,
            false,
            true,
            true
        ]) &&
        expect(profileIDReadings).to.deep.equal([
            'John',
            'Roni'
        ]) &&
        expect(profileReadings).to.deep.equal([
            { name: 'John' },
            { name: 'Roni' }
        ]) &&
        expect(friendsReadings).to.deep.equal([
            ['Roni'],
            ['John']
        ]);
    });

});