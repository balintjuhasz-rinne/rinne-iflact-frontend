import { createSelector } from 'reselect';
import { VOTE_STATUSES } from '../constants/resolution.constants';

const isUserVoted = (vote) => (vote !== VOTE_STATUSES.NOT_VOTED);

export const getResolutionInfoSelector = createSelector(
  (state) => state.resolution.get('info'),
  (info) => ({
    info: info.toJS(),
  }),
);

export const getResolutionCosignatoriesSelector = createSelector(
  (state) => state.resolution.getIn(['voting', 'cosignatories']),
  (cosignatories) => {
    const isEditable = cosignatories ? cosignatories.every((item) => !isUserVoted(item.vote)) : false;
    return {
      cosignatories,
      isEditable,
    };
  },
);

export const makeResolutionVotingSelector = createSelector(
  (state) => state.resolution.get('voting'),
  (voting) => {
    const { threshold, cosignatories = [] } = voting.toJS();
    const cosignatoriesFor = cosignatories.filter((cosignatory) => cosignatory.vote === VOTE_STATUSES.FOR);
    const cosignatoriesAgainst = cosignatories.filter((cosignatory) => cosignatory.vote === VOTE_STATUSES.AGAINST);
    const cosignatoriesAbstain = cosignatories.filter((cosignatory) => cosignatory.vote === VOTE_STATUSES.ABSTAIN);
    const cosignatoriesNotVoted = cosignatories.filter((cosignatory) => cosignatory.vote === VOTE_STATUSES.NOT_VOTED);

    return {
      threshold: Math.ceil(threshold),
      cosignatories,
      cosignatoriesFor,
      cosignatoriesAgainst,
      cosignatoriesAbstain,
      cosignatoriesNotVoted,
    };
  },
);

export const getChartFilters = createSelector(
  (state) => state.resolution.getIn(['chart', 'filtersConfig']),
  (filtersConfig) => ({
    filtersConfig,
  }),
);

export const makeVotingChartCosignatories = createSelector(
  (state) => state.resolution.getIn(['voting', 'cosignatories']),
  (cosignatories) => {
    cosignatories = cosignatories ? cosignatories.filter((item) => item.vote !== VOTE_STATUSES.NOT_VOTED) : [];
    return {
      cosignatories,
    };
  },
);
