import {

} from '@psionic/flux';

// App Level

const userState = createFluxState({
    id: 'userState',
    value: null,
});

const profileCache = createFluxCache({
    id: 'profileCache',
    fetch: async () => {
        const user = userState.get();
        if (user) {
            fetchProfileByID(user.id);
        } else {
            return null;
        }
    },
    dependsOn: [userState]
});

// My Schedules Level

const schedulesCache = createFluxCache({
    id: 'schedulesCache',
    fetch: async () => {
        const user = userState.get();
        if (user) {
            return fetchSchedulesForUser(user.id);
        } else {
            return [];
        }
    },
    dependsOn: [userState],
});

const selectedScheduleEngine = createFluxEngine({
    id: 'selectedScheduleEngine',
    value: null,
    converter: async (oldValue, suppliedValue) => {
        const schedules = await schedulesCache.get();
        const foundSchedule = _.find(schedules, ['id', suppliedValue]);
        return foundSchedule || null;
    },
    dependsOn: [schedulesCache],
});

const [schedules, schedulesReader] = useFluxReader(schedulesCache);

/**
 * const schedules = await schedulesReader.get();
 * const schedulesStale = scheduleReader.stale;
 * const schedulesLoading = scheduleReader.loading;
 * const schedulesMostRecent = scheduleReader.mostRecent;
 *
 * schedulesReader.free();
 */

// Schedule Details Level

const associatedRecruitersCache = createFluxCache({
    id: 'associatedRecruitersCache',
    fetch: async () => {
        const selectedSchedule = await selectedScheduleEngine.get();
        if (selectedSchedule) {
            return getRecruitersAssociatedWithSchedule(selectedSchedule.id);
        } else {
            return [];
        }
    },
    dependsOn: [selectedScheduleEngine],
});
