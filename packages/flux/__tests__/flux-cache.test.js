import { expect } from 'chai';
import delay from 'delay';
import { createFluxCache } from '../lib';
import { _UNSAFE_nukeFluxManager } from '../lib/flux-manager/flux-manager';

const delayTime = 50;

describe('FluxCache', () => {

    beforeEach(() => {
        _UNSAFE_nukeFluxManager();
    });

    it('is able to retrieve data on the first `get` call', async () => {
        const profileCache = createFluxCache({
            id: 'profileCache',
            fetch: () => ({ name: 'John' }),
        });
        const profile = await profileCache.get();
        expect(profile).to.deep.equal({ name: 'John' });
    });

    it('is able to cache data after the first `get` call', async () => {
        const profileCache = createFluxCache({
            id: 'profileCache',
            fetch: async () => {
                await delay(delayTime);
                return { name: 'John' };
            },
        });
        const firstHitStartTime = new Date();
        await profileCache.get();
        const firstHitEndTime = new Date();
        const firstHitTimeElapsed = firstHitEndTime - firstHitStartTime;

        const secondHitStartTime = new Date();
        const secondProfileHit = await profileCache.get();
        const secondHitEndTime = new Date();
        const secondHitTimeElapsed = secondHitEndTime - secondHitStartTime;

        // Expect the results to be correct
        expect(secondProfileHit).to.deep.equal({ name: 'John' }) &&
        // And expect the time the first hit took to be greater than the delay time
        expect(firstHitTimeElapsed).to.be.above(delayTime-1, `First hit took ${firstHitTimeElapsed}ms`) &&
        // And expect the time the second hit took to be less than the delay time
        expect(secondHitTimeElapsed).to.be.below(delayTime, `Second hit took ${secondHitTimeElapsed}ms`);
    });

    it('is able to automatically mark the cache as stale after the set amount of time', async () => {
        const profileCache = createFluxCache({
            id: 'profileCache',
            fetch: async () => ({ name: 'John' }),
            staleAfter: delayTime,
        });
        const firstStaleQuery = profileCache.getStale();
        await profileCache.get();
        const secondStaleQuery = profileCache.getStale();
        await delay(delayTime);
        const thirdStaleQuery = profileCache.getStale();

        // Expect the first stale query to read true, since no data has been fetched yet
        expect(firstStaleQuery).to.equal(true) &&
        // Expect the second stale query to read false, since the data has just been fetched
        expect(secondStaleQuery).to.equal(false) &&
        // Expect the third stale query to read true, since the stale timer has elapsed
        expect(thirdStaleQuery).to.equal(true);
    });

    it('is able to update the provided `fetch` operation, while marking the cache as stale', async () => {
        const profileCache = createFluxCache({
            id: 'profileCache',
            fetch: async () => ({ name: 'John' }),
        });
        const firstStaleQuery = profileCache.getStale();
        const firstProfile = await profileCache.get();
        const secondStaleQuery = profileCache.getStale();
        profileCache.updateFetch(async () => ({ name: 'Roni' }));
        const thirdStaleQuery = profileCache.getStale();
        const secondProfile = await profileCache.get();
        const fourthStaleQuery = profileCache.getStale();

        // Expect the first stale query to read true, since no data has been fetched yet
        expect(firstStaleQuery).to.equal(true) &&
        // Expect the second stale query to read false, since the data has just been fetched
        expect(secondStaleQuery).to.equal(false) &&
        // Expect the first profile to equal John's profile
        expect(firstProfile).to.deep.equal({ name: 'John' }) &&
        // Expect the third stale query to read true, since the new data has not been fetched yet
        expect(thirdStaleQuery).to.equal(true) &&
        // Expect the second profile to equal Roni's profile
        expect(secondProfile).to.deep.equal({ name: 'Roni' }) &&
        // Expect the fourth stale query to read false, since the new data has just been fetched
        expect(fourthStaleQuery).to.equal(false);
    });

});