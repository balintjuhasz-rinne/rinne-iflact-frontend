import { createSelector } from 'reselect';

export const makeResolutionsSelector = createSelector(
  (state) => state.resolutions.get('list'),
  (state) => state.resolutions.get('filterConfig'),
  (state) => state.resolutions.get('sortConfig'),
  (state) => state.resolutions.get('currentPage'),
  (state) => state.resolutions.get('pageCount'),
  (state) => state.resolutions.get('ids'),
  (list, filterConfig, sortConfig, currentPage, pageCount, ids) => ({
    list: list.toJS(),
    filterConfig,
    sortConfig,
    currentPage,
    pageCount,
    ids,
  }),
);

export const getNewResolutionSelector = createSelector(
  (state) => state.resolutions.get('newResolution'),
  (newResolution) => ({
    newResolution: newResolution.toJS(),
  }),
);

export const getResolutionsView = createSelector(
  (state) => state.resolutions.get('view'),
  (view) => view,
);
