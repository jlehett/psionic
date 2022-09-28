import { expect } from 'chai';
import {
    FluxCache,
    FluxState,
} from '../lib';

describe('Integration Tests', () => {

    it('FluxCaches mark their caches as stale whenever any of their dependencies update', async () => {
        // Create the Flux caches and states
        const profileCache = new FluxCache(
            () => ({ name: 'John' }),
        );
        const friendsCache = new FluxCache(
            () => ([{ name: 'Roni', name: 'Nikko' }]),
            { dependencies: [profileCache] }
        );
        const selectedFriendState = new FluxState(null);
        const selectedFriendDetailsCache = new FluxCache(
            () => ({ favoriteNumber: 42, favoriteColor: 'green' }),
            { dependencies: [friendsCache, selectedFriendState] }
        );

        await profileCache.get();
        await friendsCache.get();
        await selectedFriendDetailsCache.get();

        // Get the first reading of the friends cache stale state
        const friendsCacheFirstStaleQuery = friendsCache.getStale();
        // Get the first reading of the selected friend details cache stale state
        const selectedFriendDetailsFirstStaleQuery = selectedFriendDetailsCache.getStale();

        // Set the value of selected friend state
        selectedFriendState.set({ name: 'Roni' });

        // Get the second reading of the friends cache stale state
        const friendsCacheSecondStaleQuery = friendsCache.getStale();
        // Get the second reading of the selected friend details cache stale state
        const selectedFriendDetailsSecondStaleQuery = selectedFriendDetailsCache.getStale();

        // Get the selected friend details again
        await selectedFriendDetailsCache.get();

        // Get the third reading of the selected friend details cache stale state
        const selectedFriendDetailsThirdStaleQuery = selectedFriendDetailsCache.getStale();

        // Set the stale state of the profile cache
        profileCache.setStale(true);

        // Get the third reading of the friends cache stale state
        const friendsCacheThirdStaleQuery = friendsCache.getStale();
        // Get the fourth reading of the selected friend details cache stale state
        const selectedFriendDetailsFourthStaleQuery = selectedFriendDetailsCache.getStale();

        // Expect the first readings of the 2 caches to be false at first
        expect(friendsCacheFirstStaleQuery, `Expected the first reading of the friends cache stale state to be false, but got ${friendsCacheFirstStaleQuery}`).to.equal(false)
        && expect(selectedFriendDetailsFirstStaleQuery, `Expected the first reading of the selected friend details cache stale state to be false, but got ${selectedFriendDetailsFirstStaleQuery}`).to.equal(false)
        // Expect the second reading of the friends cache to be false
        && expect(friendsCacheSecondStaleQuery, `Expected the second reading of the friends cache stale state to be false, but got ${friendsCacheSecondStaleQuery}`).to.equal(false)
        // Expect the second reading of the selected friend details cache to be true
        && expect(selectedFriendDetailsSecondStaleQuery, `Expected the second reading of the selected friend details cache stale state to be true, but got ${selectedFriendDetailsSecondStaleQuery}`).to.equal(true)
        // Expect the third reading of the selected friend details cache to be false
        && expect(selectedFriendDetailsThirdStaleQuery, `Expected the third reading of the selected friend details cache stale state to be false, but got ${selectedFriendDetailsThirdStaleQuery}`).to.equal(false)
        // Expect the last 2 readings for both caches to be true
        && expect(friendsCacheThirdStaleQuery, `Expected the third reading of the friends cache stale state to be true, but got ${friendsCacheThirdStaleQuery}`).to.equal(true)
        && expect(selectedFriendDetailsFourthStaleQuery, `Expected the fourth reading of the selected friend details cache stale state to be true, but got ${selectedFriendDetailsFourthStaleQuery}`).to.equal(true);
    });

});