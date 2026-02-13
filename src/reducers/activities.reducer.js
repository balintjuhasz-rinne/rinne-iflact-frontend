import { createModule } from 'redux-modules';
import { Map, List } from 'immutable';
import cloneDeep from 'lodash.clonedeep';

const DEFAULT_FIELDS = Map({
  allActivities: List([]),
  companyActivities: List([]),
  resolutionActivities: List([]),
  userActivities: List([]),
});

export default createModule({
  name: 'activities',
  initialState: cloneDeep(DEFAULT_FIELDS),
  transformations: {
    setAllActivities: {
      reducer: (state, { payload }) => {
        state = state.set('allActivities', new List(payload));
        return state;
      },
    },
    setCompanyActivities: {
      reducer: (state, { payload }) => {
        state = state.set('companyActivities', new List(payload));
        return state;
      },
    },
    setResolutionActivities: {
      reducer: (state, { payload }) => {
        state = state.set('resolutionActivities', new List(payload));
        return state;
      },
    },
    setUserActivities: {
      reducer: (state, { payload }) => {
        state = state.set('userActivities', new List(payload));
        return state;
      },
    },
  },
});
