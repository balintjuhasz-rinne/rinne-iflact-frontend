import flactService from '../services/flact';
import resoutionReducer from '../reducers/resolution.reducer';
import { formFileSize } from '../helpers/functions.helper';

const { actions: resolutionActions } = resoutionReducer;

export const getResolution = (id) => flactService.resolutions.getResolution(id);

export const getResolutionComments = (id) => flactService.resolutions.getResolutionComments(id);

export const setResolution = (id) => async (dispatch) => {
  const { resolution, voting } = await getResolution(id);
  const { comments } = await getResolutionComments(id);
  if (resolution?.documents) {
    resolution.documents = resolution.documents.map((item) => (
      { ...item, size: formFileSize(item.size) }));
  }
  if (voting.cosignatories) {
    voting.cosignatories.forEach((el) => {
      if (el?.voteDate) {
        [el.voteDate] = el.voteDate.split('+');
        el.voteDate = el.voteDate.replace(/\s/, 'T').concat('Z').replace(/\s/, '');
      }
    });
  }
  dispatch(resolutionActions.setResolutionInfo(resolution));
  dispatch(resolutionActions.setResolutionVoting(voting));
  dispatch(resolutionActions.setResolutionComments(comments));
};

export const clearResolution = () => async (dispatch) => {
  dispatch(resolutionActions.setResolutionInfo({}));
  dispatch(resolutionActions.setResolutionVoting({}));
};

export const voteOnResolution = (resolutionId, voteValue) => async (dispatch) => {
  await flactService.resolutions.voteOnResolution(resolutionId, voteValue);

  const { voting } = await getResolution(resolutionId);
  if (voting.cosignatories) {
    voting.cosignatories.forEach((el) => {
      if (el?.voteDate) {
        [el.voteDate] = el.voteDate.split('+');
        el.voteDate = el.voteDate.replace(/\s/, 'T').concat('Z').replace(/\s/, '');
      }
    });
  }

  await dispatch(resolutionActions.setResolutionVoting(voting));

};

export const createOrEditResolutionComment = (resolutionId, text) => async (dispatch) => {
  await flactService.resolutions.createOrEditComment(resolutionId, text);
  const { comments } = await getResolutionComments(resolutionId);
  dispatch(resolutionActions.setResolutionComments(comments));
};

export const deleteResolutionComment = (resolutionId) => async (dispatch) => {
  await flactService.resolutions.deleteResolutionComment(resolutionId);
  const { comments } = await getResolutionComments(resolutionId);
  dispatch(resolutionActions.setResolutionComments(comments));
};

export const setResolutionStatus = (status) => (dispatch) => {
  dispatch(resolutionActions.setResolutionStatus(status));
};

export const setResolutionCancelReason = (reason) => (dispatch) => {
  dispatch(resolutionActions.setResolutionCancelReason(reason));
};

export const cancelResolution = async (id, options) => flactService.resolutions.cancelResolution(id, options);

export const editResolution = (resolutionId, documentsIds) => async (dispatch) => {
  await flactService.resolutions.editResolution(resolutionId, documentsIds);
  dispatch(resolutionActions.setResolutionDocument(documentsIds));
};

export const setChartFilters = (filtersConfig) => (dispatch) => {
  dispatch(resolutionActions.setChartFilters(filtersConfig));
};
