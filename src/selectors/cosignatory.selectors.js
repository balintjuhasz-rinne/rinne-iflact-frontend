import { createSelector } from 'reselect';
import { cosignatoryMessagesFilter, cosignatoryResolutionsFilter } from '../helpers/cosec.helpers';
import { sortTable } from '../helpers/functions.helper';

export const getCosignatoryInfoSelector = createSelector(
  (state) => state.cosignatory.get('info'),
  (info) => ({ info }),
);

export const getcosignatoryEditingSelector = createSelector(
  (state) => state.cosignatory.get('isEditing'),
  (isEditing) => ({ isEditing }),
);

export const makeCosignatoryResolutionsSelector = createSelector(
  (state) => state.cosignatory.get('resolutions'),
  (state) => state.cosignatory.get('resolutionsFilterConfig'),
  (state) => state.cosignatory.get('resolutionsSortConfig'),
  (resolutions, resolutionsFilterConfig, resolutionsSortConfig) => {
    resolutions = resolutions
      .sort((a, b) => sortTable(a.resolution, b.resolution, resolutionsSortConfig))
      .filter((item) => cosignatoryResolutionsFilter(item.resolution, resolutionsFilterConfig));
    return {
      resolutions,
      resolutionsFilterConfig,
      resolutionsSortConfig,
    };
  },
);

export const getCosignatoryLogsSelector = createSelector(
  (state) => state.cosignatory.getIn(['logs', 'list']),
  (state) => state.cosignatory.getIn(['logs', 'sortConfig']),
  (state) => state.cosignatory.getIn(['logs', 'page']),
  (state) => state.cosignatory.getIn(['info', 'registrationCompleted']),
  (list, sortConfig, page, registrationCompleted) => ({
    sortConfig,
    page,
    list: list.toJS().sort((a, b) => sortTable(a, b, sortConfig)),
    registrationCompleted,
  }),
);

export const makeCosignatoryMessagesSelector = createSelector(
  (state) => state.cosignatory.get('messages'),
  (state) => state.cosignatory.get('messagesFilterConfig'),
  (state) => state.cosignatory.get('messagesSortConfig'),
  (state) => state.cosignatory.getIn(['info', 'registrationCompleted']),
  (messages, messagesFilterConfig, messagesSortConfig, registrationCompleted) => {
    messagesFilterConfig = messagesFilterConfig.toJS();
    messagesSortConfig = messagesSortConfig.toJS();
    messages = messages.toJS()
      .filter((item) => cosignatoryMessagesFilter(item, messagesFilterConfig))
      .sort((a, b) => sortTable(a, b, messagesSortConfig));
    return {
      messages,
      messagesFilterConfig,
      messagesSortConfig,
      registrationCompleted,
    };
  },
);

export const getAllCosignatoryResolutionsSelector = createSelector(
  (state) => state.cosignatory.get('resolutions'),
  (resolutions) => ({ resolutions }),
);
