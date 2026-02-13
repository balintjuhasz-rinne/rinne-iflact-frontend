import { createModule } from 'redux-modules';
import { Map } from 'immutable';
import cloneDeep from 'lodash.clonedeep';

const DEFAULT_FIELDS = Map({
  isLogined: false,
  isSidebarOpened: false,
});

export default createModule({
  name: 'global',
  initialState: cloneDeep(DEFAULT_FIELDS),
  transformations: {
    setLogined: {
      reducer: (state, { payload }) => {
        state = state.set('isLogined', payload);
        return state;
      },
    },
    setSidebarState: {
      reducer: (state, { payload }) => {
        state = state.set('isSidebarOpened', payload);
        return state;
      },
    },
  },
});
