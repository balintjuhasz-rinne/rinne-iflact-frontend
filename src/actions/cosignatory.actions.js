import flactService from '../services/flact';
import cosignatoryReducer from '../reducers/cosignatory.reducer';
import { getResolutions } from './resolutions.actions';
import { logNamesCosignatory } from '../constants/other.constants';
import { formatLogValue } from '../helpers/functions.helper';

const { actions: cosignatoryActions } = cosignatoryReducer;

export const getCosignatoryInfo = (id) => flactService.cosignatories.getCosignatory(id);

export const resendCosignatoryMessage = (id, messageId) => flactService.cosignatories.resendCosignatoryMessage(id, messageId);

export const resendCosignatoryInvite = (email) => flactService.cosignatories.resendCosignatoryInvite(email);

export const setCosignatoryInfo = (info) => async (dispatch) => {
  dispatch(cosignatoryActions.setCosignatoryInfo(info));
};

export const loadAndSetCosignatoryInfo = (id, cosignatory = {}) => async (dispatch) => {
  let cosignatoryInfo = {};
  if (id) {
    cosignatoryInfo = await getCosignatoryInfo(id);
  }
  dispatch(setCosignatoryInfo({
    ...cosignatoryInfo,
    ...cosignatory,
  }));
};

export const setCosignatoryEditing = (bool) => (dispatch) => {
  dispatch(cosignatoryActions.setCosignatoryEditing(bool));
};

export const deleteCosignatory = async (id) => flactService.cosignatories.deleteCosignatory(id);

export const createCosignatory = async (cosignatory) => flactService.cosignatories.createCosignatory(cosignatory);

export const updateCosignatory = async (id, cosignatory) => flactService.cosignatories.updateCosignatory(id, cosignatory);

export const inviteCosignatoryToCompanies = async (id, companies) => (
  flactService.cosignatories.inviteCosignatoryToCompanies(id, companies)
);

export const changeStatusCosignatory = (id, status) => async (dispatch) => {
  await flactService.cosignatories.changeStatusCosignatory(id, status);
  dispatch(cosignatoryActions.setCosignatoryInfo({ id, status }));
};

export const createOrEditCosignatoryComment = async (id, text) => flactService.cosignatories.createOrEditCosignatoryComment(id, text);

export const deleteCosignatoryComment = async (id) => flactService.cosignatories.deleteCosignatoryComment(id);

export const deleteCosignatoryWorkplace = async (id, workplaceId) => flactService.cosignatories.deleteCosignatoryWorkplace(id, workplaceId);

export const setCosignatoryResolutions = (cosignatoryId) => async (dispatch) => {
  const { resolutionsInfo } = await getResolutions({ cosignatoryId });
  dispatch(cosignatoryActions.setCosignatoryResolutions(resolutionsInfo));
};

export const setResolutionsFilterConfig = (config) => (dispatch) => {
  dispatch(cosignatoryActions.setResolutionsFilterConfig(config));
};

export const setCosignatoryMessages = (id) => async (dispatch) => {
  const { messages } = await flactService.cosignatories.getCosignatoryMessageHistory(id);
  dispatch(cosignatoryActions.setCosignatoryMessages(messages));
};

export const setCosignatoryLogs = (id, filters) => async (dispatch) => {
  const { logs } = await flactService.user.getUserLogs(id, filters);
  const formattedLogs = logs.map((log) => ({
    ...log,
    parameter: logNamesCosignatory[log.parameter],
    oldValue: formatLogValue(log.parameter, log.oldValue),
    newValue: formatLogValue(log.parameter, log.newValue),
  }));

  dispatch(cosignatoryActions.setCosignatoryLogs(formattedLogs));
};

export const setCosignatoryLogsSort = (field, direction) => async (dispatch) => {
  dispatch(cosignatoryActions.setCosignatoryLogsSort({ field, direction }));
};

export const setCosignatoryLogsPage = (pageNum) => async (dispatch) => {
  dispatch(cosignatoryActions.setCosignatoryLogsPage(pageNum));
};

export const setMessagesFilterConfig = (config) => (dispatch) => {
  dispatch(cosignatoryActions.setMessagesFilterConfig(config));
};

export const setResolutionsSortConfig = (field, direction) => async (dispatch) => {
  dispatch(cosignatoryActions.setResolutionsSortConfig({ field, direction }));
};

export const setMessagesSortConfig = (field, direction) => (dispatch) => {
  dispatch(cosignatoryActions.setMessagesSortConfig({ field, direction }));
};
