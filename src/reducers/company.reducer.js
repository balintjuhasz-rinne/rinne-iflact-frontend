import { List, Map } from 'immutable';
import cloneDeep from 'lodash.clonedeep';
import { createModule } from 'redux-modules';

const DEFAULT_FIELDS = Map({
  info: new Map({
    name: '',
    incorporationDate: '',
    financialYearEndDate: '',
    nextMeetingDate: '',
    address: '',
    email: '',
  }),
  coSignatories: new List([]),
  coWorkers: new List([]),
  resolutions: Map({
    list: new List([]),
    filterConfig: {
      name: '',
      status: '',
      creationDateFrom: '',
      creationDateTo: '',
      startDateFrom: '',
      startDateTo: '',
      endDateFrom: '',
      endDateTo: '',
      resolveDateFrom: '',
      resolveDateTo: '',
      type: '',
    },
    sortConfig: {
      field: null,
      direction: 1,
    },
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
  name: 'company',
  initialState: cloneDeep(DEFAULT_FIELDS),
  transformations: {
    setCompany: {
      reducer: (state, { payload }) => {
        const { info, coSignatories, coWorkers } = payload;
        state = state
          .set('info', new Map(info))
          .set('coSignatories', new List(coSignatories))
          .set('coWorkers', new List(coWorkers));
        return state;
      },
    },
    setCompanyResolutions: {
      reducer: (state, { payload }) => {
        const { resolutions } = payload;
        state = state.setIn(['resolutions', 'list'], new List(resolutions));
        return state;
      },
    },
    setCompanyResolutionsFilter: {
      reducer: (state, { payload }) => {
        state = state.setIn(['resolutions', 'filterConfig'], payload);
        return state;
      },
    },
    setCompanyResolutionsSort: {
      reducer: (state, { payload }) => {
        state = state.setIn(['resolutions', 'sortConfig'], {
          field: payload.field,
          direction: payload.direction,
        });
        return state;
      },
    },
    setCompanyLogs: {
      reducer: (state, { payload }) => {
        state = state.setIn(['logs', 'list'], new List(payload));
        return state;
      },
    },
    setCompanyLogsPage: {
      reducer: (state, { payload }) => {
        state = state.setIn(['logs', 'page'], payload);
        return state;
      },
    },
    setCompanyLogsSort: {
      reducer: (state, { payload }) => {
        state = state.setIn(['logs', 'sortConfig'], {
          field: payload.field,
          direction: payload.direction,
        });
        return state;
      },
    },
  },
});
