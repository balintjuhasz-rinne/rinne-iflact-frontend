import { createModule } from 'redux-modules';
import { Map, List } from 'immutable';
import cloneDeep from 'lodash.clonedeep';

const DEFAULT_FIELDS = Map({
  list: List([]),
  pageList: List([]),
  count: null,
  currentPage: 1,
  filterConfig: Map({
    company: '',
  }),
});

export default createModule({
  name: 'companies',
  initialState: cloneDeep(DEFAULT_FIELDS),
  transformations: {
    setCompaniesList: {
      reducer: (state, { payload }) => {
        const { list } = payload;
        state = state.set('list', new List(list));
        return state;
      },
    },
    setCompaniesCurrentPage: {
      reducer: (state, { payload }) => {
        state = state.set('currentPage', payload);
        return state;
      },
    },
    setCompaniesPageList: {
      reducer: (state, { payload }) => {
        const { list, count } = payload;
        state = state
          .set('pageList', new List(list))
          .set('count', count);
        return state;
      },
    },
  },
});
