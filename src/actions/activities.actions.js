import flactService from '../services/flact';
import activitiesReducer from '../reducers/activities.reducer';

const { actions: activitiesActions } = activitiesReducer;

export const setAllActivities = () => async (dispatch) => {
  const { activities } = await flactService.activities.getAllActivities();
  dispatch(activitiesActions.setAllActivities(activities));
};

export const setCompanyActivities = (companyId) => async (dispatch) => {
  const { activities } = await flactService.activities.getCompanyActivities(companyId);
  dispatch(activitiesActions.setCompanyActivities(activities));
};

export const setResolutionActivities = (resolutionId) => async (dispatch) => {
  const { activities } = await flactService.activities.getResolutionActivities(resolutionId);
  await dispatch(activitiesActions.setResolutionActivities(activities));
};

export const setUserActivities = (userId) => async (dispatch) => {
  const { activities } = await flactService.activities.getUserActivities(userId);
  await dispatch(activitiesActions.setUserActivities(activities));
};
