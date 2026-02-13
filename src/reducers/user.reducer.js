import { createModule } from 'redux-modules';
import { List, Map } from 'immutable';
import cloneDeep from 'lodash.clonedeep';

const DEFAULT_FIELDS = Map({
  name: null,
  surname: null,
  company: null,
  phoneNumber: null,
  positions: null,
  companyId: null,
  email: null,
  role: '',
  avatarId: null,
  avatar: new Map({}),
  notifications: [],
  colleagues: [],
  logs: Map({
    list: new List([]),
    page: 1,
    sortConfig: {
      field: null,
      direction: 1,
    },
  }),
  workplaces: new Map({}),
});

export default createModule({
  name: 'user',
  initialState: cloneDeep(DEFAULT_FIELDS),
  transformations: {
    setUserProfile: {
      reducer: (state, { payload }) => state.merge(new Map(payload)),
    },
    setUserLogs: {
      reducer: (state, { payload }) => {
        state = state.setIn(['logs', 'list'], new List(payload));
        return state;
      },
    },
    setUserLogsPage: {
      reducer: (state, { payload }) => {
        state = state.setIn(['logs', 'page'], payload);
        return state;
      },
    },
    setUserLogsSort: {
      reducer: (state, { payload }) => {
        state = state.setIn(['logs', 'sortConfig'], {
          field: payload.field,
          direction: payload.direction,
        });
        return state;
      },
    },
    setColleagues: {
      reducer: (state, { payload }) => {
        state = state.set('colleagues', payload);
        return state;
      },
    },
    clearUserProfile: {
      reducer: () => cloneDeep(DEFAULT_FIELDS),
    },
  },
});
