import { createModule } from 'redux-modules';
import { Map, List } from 'immutable';
import cloneDeep from 'lodash.clonedeep';

const DEFAULT_FIELDS = Map({
  list: List([]),
  sortConfig: {
    field: null,
    direction: 1,
  },
});

export default createModule({
  name: 'templates',
  initialState: cloneDeep(DEFAULT_FIELDS),
  transformations: {
    setTemplates: {
      reducer: (state, { payload }) => {
        state = state.set('list', new List(payload));
        return state;
      },
    },
    updateTemplates: {
      reducer: (state, { payload }) => {
        const previousList = state.get('list');
        state = state.set('list', new List([...previousList, payload]));
        return state;
      },
    },
    removeTemplate: {
      reducer: (state, { payload }) => {
        const previousList = state.get('list');
        const newList = previousList.filter((item) => item.id !== payload);
        state = state.set('list', new List(newList));
        return state;
      },
    },
    setSortConfig: {
      reducer: (state, { payload }) => {
        state = state.set('sortConfig', {
          field: payload.field,
          direction: payload.direction,
        });
        return state;
      },
    },
  },
});
