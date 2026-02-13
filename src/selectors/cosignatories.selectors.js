import { createSelector } from 'reselect';

export const makeSelectCosignatories = createSelector(
  (state) => state.cosignatories.get('list'),
  (state) => state.cosignatories.get('sortConfig'),
  (state) => state.cosignatories.get('filterConfig'),
  (state) => state.cosignatories.get('currentPage'),
  (state) => state.cosignatories.get('pageCount'),
  (state) => state.cosignatories.get('limit'),
  (list, sortConfig, filterConfig, currentPage, pageCount, limit) => ({
    list,
    sortConfig,
    filterConfig,
    currentPage,
    pageCount,
    limit,
  }),
);

export const getCosignatoryInfoSelector = createSelector(
  (state) => state.cosignatory.toJS(),
  (cosignatory) => ({ cosignatory }),
);
