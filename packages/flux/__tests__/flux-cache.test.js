import { expect } from 'chai';
import delay from 'delay';
import { onEmit } from '@psionic/emit';
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

    it('is able to properly handle manually setting the cache\'s stale state', async () => {
        const profileCache = createFluxCache({
            id: 'profileCache',
            fetch: async () => ({ name: 'John' }),
            staleAfter: delayTime,
        });
        const firstStaleQuery = profileCache.getStale();
        profileCache.setStale(false);
        const secondStaleQuery = profileCache.getStale();
        await delay(delayTime);
        const thirdStaleQuery = profileCache.getStale();
        profileCache.setStale(false);
        const fourthStaleQuery = profileCache.getStale();
        profileCache.setStale(true);
        const fifthStaleQuery = profileCache.getStale();
        profileCache.setStale(false);
        await delay(delayTime / 2);
        const sixthStaleQuery = profileCache.getStale();
        profileCache.setStale(true);
        profileCache.setStale(false);
        const seventhStaleQuery = profileCache.getStale();
        await delay(delayTime / 2);
        const eighthStaleQuery = profileCache.getStale();
        await delay(delayTime / 2);
        const ninthStaleQuery = profileCache.getStale();

        // Expect the first stale query to read true, since no data has been fetched yet
        expect(firstStaleQuery).to.equal(true) &&
        // Expect the second stale query to read false, since the cache's stale state has manually been set to false
        expect(secondStaleQuery).to.equal(false) &&
        // Expect the third stale query to read true, since the cache's stale timer was triggered
        expect(thirdStaleQuery).to.equal(true) &&
        // Expect the fourth stale query to read false, since the cache's stale state has manually been set to false
        expect(fourthStaleQuery).to.equal(false) &&
        // Expect the fifth stale query to read true, since the cache's stale state has manually been set to true
        expect(fifthStaleQuery).to.equal(true) &&
        // Expect the sixth stale query to read false, since the cache's stale state has manually been set to false and the stale timer hasn't elapsed
        expect(sixthStaleQuery).to.equal(false) &&
        // Expect the seventh stale query to equal false, since the cache's stale state has manually been set to false
        expect(seventhStaleQuery).to.equal(false) &&
        // Expect the eighth stale query to equal false still, since the stale timer was reset
        expect(eighthStaleQuery).to.equal(false) &&
        // Expect the ninth stale query to equal true, since the new stale timer has elapsed
        expect(ninthStaleQuery).to.equal(true);
    });

    it('is able to provide the last successfully cached data, even if the data is stale', async () => {
        const profileCache = createFluxCache({
            id: 'profileCache',
            fetch: async () => ({ name: 'John' }),
            staleAfter: delayTime,
        });

        const firstReading = profileCache.getCachedData();
        await profileCache.get();
        const secondReading = profileCache.getCachedData();
        await delay(delayTime);
        const staleQuery = profileCache.getStale();
        const thirdReading = profileCache.getCachedData();

        expect(firstReading).to.equal(undefined) &&
        expect(secondReading).to.deep.equal({ name: 'John' }) &&
        expect(staleQuery).to.equal(true) &&
        expect(thirdReading).to.deep.equal({ name: 'John' });
    });

    it('is able to provide the last successfully cached data, even if a new fetch operation is running', async () => {
        let i = 0;

        const profileCache = createFluxCache({
            id: 'profileCache',
            fetch: async () => {
                await delay(delayTime);
                return i++ == 0 ? { name: 'John' } : { name: 'Roni' };
            }
        });

        await profileCache.get();
        profileCache.setStale(true);
        profileCache.get();
        const firstReading = profileCache.getCachedData();
        await delay(delayTime);
        const staleQuery = profileCache.getStale();
        const secondReading = profileCache.getCachedData();

        expect(firstReading).to.deep.equal({ name: 'John' }) &&
        expect(staleQuery).to.equal(false) &&
        expect(secondReading).to.deep.equal({ name: 'Roni' });
    });

    it('emits a `_FLUX_${fluxObjID}-updated` event whenever the cache updates for any reason', async () => {
        let i = 0;
        let emitCounts = 0;

        const profileCache = createFluxCache({
            id: 'profileCache',
            fetch: async () => {
                await delay(delayTime);
                return i++ == 0 ? { name: 'John' } : { name: 'Roni' };
            },
            staleAfter: delayTime,
        });

        const listener = onEmit('_FLUX_profileCache-updated', () => emitCounts++);

        await profileCache.get();
        await profileCache.get();
        await delay(delayTime);
        await profileCache.get();
        await profileCache.get();
        profileCache.setStale(true);

        listener.cancel();

        expect(emitCounts).to.equal(4);
    });

});