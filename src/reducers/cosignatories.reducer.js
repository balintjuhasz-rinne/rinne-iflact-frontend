import { createModule } from 'redux-modules';
import { Map, List } from 'immutable';
import cloneDeep from 'lodash.clonedeep';
import { PAGE_LIMIT } from '../constants/sort.constants';

const DEFAULT_FILTER_CONFIG = {
  name: '',
  companyId: '',
  status: null,
};

const DEFAULT_FIELDS = Map({
  list: List([]),
  skip: null,
  limit: PAGE_LIMIT,
  currentPage: 1,
  pageCount: 1,
  sortConfig: {
    sortParam: null,
    sortOrder: 1,
  },
  filterConfig: DEFAULT_FILTER_CONFIG,
});

export default createModule({
  name: 'cosignatories',
  initialState: cloneDeep(DEFAULT_FIELDS),
  transformations: {
    setCosignatories: {
      reducer: (state, { payload }) => {
        const newState = {
          ...state.toJS(), ...payload,
        };
        Object.keys(newState).forEach((field) => {
          state = state.setIn(field.toString().split('.'), newState[field]);
        });
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
  },
});
