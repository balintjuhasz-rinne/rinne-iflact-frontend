import { createModule } from 'redux-modules';
import { Map, List } from 'immutable';
import cloneDeep from 'lodash.clonedeep';
import { DEFAULT_NOTICE_PERIOD } from '../constants/resolution.constants';
import { VIEW_VARIANTS, VIEW_LOCALSTORAGE_PARAM_NAME } from '../constants/global.constants';

const DEFAULT_NEW_RESOLUTION = Map({
  step: 1,
  noticePeriod: DEFAULT_NOTICE_PERIOD,
  file: null,
  approvalRatio: null,
  companyId: null,
  companyName: '',
  name: '',
  types: '',
  votingStartDate: '',
  votingEndDate: '',
  description: '',
  documentsIds: '',
  emergency: false,
});

const DEFAULT_FILTER_CONFIG = {
  name: '',
  status: null,
  companyId: '',
  startDateFrom: '',
  startDateTo: '',
  resolveDateFrom: '',
  resolveDateTo: '',
  types: '',
  isVote: null,
};

const DEFAULT_FIELDS = Map({
  list: List([]),
  ids: List([]),
  sortConfig: {
    sortParam: null,
    sortOrder: 1,
  },
  filterConfig: DEFAULT_FILTER_CONFIG,
  currentPage: 1,
  pageCount: 1,
  newResolution: DEFAULT_NEW_RESOLUTION,
  view: typeof window !== 'undefined' ? localStorage.getItem(VIEW_LOCALSTORAGE_PARAM_NAME) : VIEW_VARIANTS.TABLE,
});

export default createModule({
  name: 'resolutions',
  initialState: cloneDeep(DEFAULT_FIELDS),
  transformations: {
    setResolutions: {
      reducer: (state, { payload }) => {
        state = state
          .set('list', new List(payload.list))
          .set('pageCount', payload.pageCount);
        return state;
      },
    },
    setCurrentPage: {
      reducer: (state, { payload }) => {
        state = state.set('currentPage', payload);
        return state;
      },
    },
    setSortConfig: {
      reducer: (state, { payload }) => {
        state = state.set('sortConfig', payload);
        return state;
      },
    },
    setFilterConfig: {
      reducer: (state, { payload }) => {
        state = state.set('filterConfig', payload);
        return state;
      },
    },
    clearFilterConfig: {
      reducer: (state) => {
        state = state.set('filterConfig', DEFAULT_FILTER_CONFIG);
        return state;
      },
    },
    setResolutionsIds: {
      reducer: (state, { payload }) => {
        state = state.set('ids', payload);
        return state;
      },
    },

    prepareNewResolution: {
      reducer: (state, { payload }) => {
        state = state.set('newResolution', state
          .get('newResolution')
          .merge(new Map(payload)));
        return state;
      },
    },
    clearNewResolution: {
      reducer: (state) => {
        state = state.set('newResolution', DEFAULT_NEW_RESOLUTION);
        return state;
      },
    },
    setResolutionsView: {
      reducer: (state, { payload }) => {
        state = state.set('view', payload);
        return state;
      },
    },
  },
});
