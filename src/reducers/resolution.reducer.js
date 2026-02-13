import { createModule } from 'redux-modules';
import { Map, List } from 'immutable';
import cloneDeep from 'lodash.clonedeep';

const DEFAULT_FIELDS = Map({
  info: Map({}),
  voting: Map({}),
  chart: Map({
    filtersConfig: {
      receivedVotes: true,
      allVotes: true,
    },
  }),
});

export default createModule({
  name: 'resolution',
  initialState: cloneDeep(DEFAULT_FIELDS),
  transformations: {
    setResolutionInfo: {
      reducer: (state, { payload }) => {
        state = state.set('info', new Map(payload));
        return state;
      },
    },
    setResolutionVoting: {
      reducer: (state, { payload }) => {
        state = state.set('voting', new Map(payload));
        return state;
      },
    },
    setResolutionCosignatories: {
      reducer: (state, { payload }) => {
        state = state.setIn(['voting', 'cosignatories'], new List(payload));
        return state;
      },
    },
    setCosignatoryVoting: {
      reducer: (state, { payload }) => {

        const cosignatories = state.getIn(['voting', 'cosignatories']);
        const cosignatory = cosignatories.find((item) => item.id === payload.cosignatoryId);
        const cosignatoryIndex = cosignatories.findIndex((item) => item.id === payload.cosignatoryId);
        const newCosignatory = {
          ...cosignatory,
          vote: payload.vote,
        };
        const newCosignatories = [
          ...cosignatories.slice(0, cosignatoryIndex),
          newCosignatory,
          ...cosignatories.slice(cosignatoryIndex + 1),
        ];
        state = state.setIn(['voting', 'cosignatories'], newCosignatories);
        return state;
      },
    },
    setResolutionStatus: {
      reducer: (state, { payload }) => {
        state = state.setIn(['info', 'status'], payload);
        return state;
      },
    },
    setResolutionDocument: {
      reducer: (state, { payload }) => {
        state = state.setIn(['info', 'document'], payload);
        return state;
      },
    },
    setResolutionComments: {
      reducer: (state, { payload }) => {
        state = state.setIn(['info', 'comments'], payload);
        return state;
      },
    },
    setResolutionCancelReason: {
      reducer: (state, { payload }) => {
        state = state.setIn(['info', 'cancelReason'], payload);
        return state;
      },
    },
    setChartFilters: {
      reducer: (state, { payload }) => {
        state = state.setIn(['chart', 'filtersConfig'], payload);
        return state;
      },
    },
  },
});
