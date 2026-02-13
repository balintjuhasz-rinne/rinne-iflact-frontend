import globalReducer from '../reducers/global.reducer';
import userReducer from '../reducers/user.reducer';
import flactService from '../services/flact';
import { logNamesProfile } from '../constants/other.constants';
import { formatLogValue } from '../helpers/functions.helper';

const { actions: globalActions } = globalReducer;
const { actions: userActions } = userReducer;

export const getUser = async (token) => flactService.user.getUser(token);

export const setUser = (token = null) => async (dispatch) => {
  const user = await flactService.user.getUser(token);
  const notifications = (user.notifications ? user.notifications : []).reduce((acc, current) => {
    if (current.delivery === 'EMAIL') {
      acc.emailNotifications = current.enabled;
      acc.emailAfterEvents = current.event;
      acc.emailBeforeIncorporation = current.beforeIncorporation;
      acc.emailBeforeFinancialYearEnd = current.beforeFinancialYearEnd;
      acc.emailBeforeAGM = current.beforeAnniversaryOfLastAgm;
    }
    if (current.delivery === 'SMS') {
      acc.smsNotifications = current.enabled;
      acc.smsAfterEvents = current.event;
      acc.smsBeforeIncorporation = current.beforeIncorporation;
      acc.smsBeforeFinancialYearEnd = current.beforeFinancialYearEnd;
      acc.smsBeforeAGM = current.beforeAnniversaryOfLastAgm;
    }
    return acc;
  }, {});
  dispatch(userActions.setUserProfile({ ...user, ...notifications }));
};

export const updateUser = (data) => async (dispatch) => {
  await flactService.user.updateUser(data);
  await dispatch(setUser());
};

export const setUserColleagues = (id) => async (dispatch) => {
  const { users } = await flactService.user.getUserColleagues(id);
  await dispatch(userActions.setColleagues(users));
};

export const updateUserNotifications = async (data) => {
  await flactService.user.updateUserNotifications(data);
};

export const setUserLogs = (id, filters) => async (dispatch) => {
  const { logs } = await flactService.user.getUserLogs(id, filters);
  const formattedLogs = logs.map((log) => ({
    ...log,
    parameter: logNamesProfile[log.parameter],
    oldValue: formatLogValue(log.parameter, log.oldValue),
    newValue: formatLogValue(log.parameter, log.newValue),
  }));
  dispatch(userActions.setUserLogs(formattedLogs));
};

export const setUserLogsSort = (field, direction) => async (dispatch) => {
  dispatch(userActions.setUserLogsSort({ field, direction }));
};

export const setUserLogsPage = (pageNum) => async (dispatch) => {
  dispatch(userActions.setUserLogsPage(pageNum));
};

export const clearUser = () => async (dispatch) => {
  dispatch(userActions.clearUserProfile());
  dispatch(globalActions.setLogined(false));
};

export const setUserByToken = (token) => async (dispatch) => {
  const user = await flactService.user.getUserByToken(token);
  dispatch(userActions.setUserProfile({ ...user, token }));
};

export const changePassword = async (data) => {
  await flactService.user.changePassword(data);
};

export const deleteUser = async () => {
  const { result } = await flactService.user.deleteUser();
  return result;
};
