import { createModule } from 'redux-modules';
import { List, Map } from 'immutable';
import cloneDeep from 'lodash.clonedeep';

const DEFAULT_FIELDS = Map({
  info: {
    id: null,
    name: null,
    surname: null,
    positions: null,
    phoneNumber: null,
    email: null,
    role: null,
    votingValue: null,
    registrationDate: null,
    avatar: {},
    workplaces: new List([]),
    comment: null,
  },
  isEditing: false,
  resolutions: List([]),
  resolutionsFilterConfig: Map({
    status: '',
    name: '',
  }),
  resolutionsSortConfig: {
    field: null,
    direction: 1,
  },
  messages: List([]),
  messagesFilterConfig: Map({
    date: '',
    type: '',
  }),
  messagesSortConfig: Map({
    field: '',
    direction: 1,
  }),
  logs: Map({
    list: new List([]),
    page: 1,
    sortConfig: {
      field: null,
      direction: 1,
    },
  }),

});

export default createModule({
  name: 'cosignatory',
  initialState: cloneDeep(DEFAULT_FIELDS),
  transformations: {
    setCosignatoryInfo: {
      reducer: (state, { payload }) => {
        const previousState = state.get('info');
        const newState = { ...previousState, ...payload };
        Object.keys(newState).forEach((field) => {
          state = state.setIn(['info', field.toString().split('.')], newState[field]);
        });
        return state;
      },
    },
    setCosignatoryEditing: {
      reducer: (state, { payload }) => state.set('isEditing', payload),
    },
    setCosignatoryResolutions: {
      reducer: (state, { payload }) => {
        state = state.set('resolutions', [...payload]);
        return state;
      },
    },
    setResolutionsFilterConfig: {
      reducer: (state, { payload }) => {
        const { resolutionsFilterConfig: previousConfig } = state.toJS();
        state = state.set('resolutionsFilterConfig', {
          ...previousConfig,
          ...payload,
        });
        return state;
      },
    },
    setCosignatoryMessages: {
      reducer: (state, { payload }) => {
        state = state.set('messages', new List(payload));
        return state;
      },
    },
    setMessagesFilterConfig: {
      reducer: (state, { payload }) => {
        const { messagesFilterConfig: previousConfig } = state.toJS();
        state = state.set('messagesFilterConfig', new Map({
          ...previousConfig,
          ...payload,
        }));
        return state;
      },
    },
    setMessagesSortConfig: {
      reducer: (state, { payload }) => {
        state = state.set('messagesSortConfig', new Map({
          field: payload.field,
          direction: payload.direction,
        }));
        return state;
      },
    },
    setCosignatoryLogs: {
      reducer: (state, { payload }) => {
        state = state.setIn(['logs', 'list'], new List(payload));
        return state;
      },
    },
    setCosignatoryLogsPage: {
      reducer: (state, { payload }) => {
        state = state.setIn(['logs', 'page'], payload);
        return state;
      },
    },
    setCosignatoryLogsSort: {
      reducer: (state, { payload }) => {
        state = state.setIn(['logs', 'sortConfig'], {
          field: payload.field,
          direction: payload.direction,
        });
        return state;
      },
    },
    setResolutionsSortConfig: {
      reducer: (state, { payload }) => {
        state = state.set('resolutionsSortConfig', {
          field: payload.field,
          direction: payload.direction,
        });
        return state;
      },
    },
  },
});
