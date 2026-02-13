import { createSelector } from 'reselect';

export const getAllActivitiesSelector = createSelector(
  (state) => state.activities.get('allActivities'),
  (allActivities) => ({ allActivities: allActivities.toJS() }),
);

export const getCompanyActivitiesSelector = createSelector(
  (state) => state.activities.get('companyActivities'),
  (companyActivities) => ({ companyActivities: companyActivities.toJS() }),
);

export const getResolutionActivitiesSelector = createSelector(
  (state) => state.activities.get('resolutionActivities'),
  (resolutionActivities) => ({ resolutionActivities: resolutionActivities.toJS() }),
);

export const getUserActivitiesSelector = createSelector(
  (state) => state.activities.get('userActivities'),
  (userActivities) => ({ userActivities: userActivities.toJS() }),
);
