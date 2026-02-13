import { createSelector } from 'reselect';
import { sortTable } from '../helpers/functions.helper';

export const makeTemplatesSelector = createSelector(
  (state) => state.templates.get('list'),
  (state) => state.templates.get('sortConfig'),
  (list, sortConfig) => {
    list = list.sort((a, b) => sortTable(a, b, sortConfig));
    return {
      list: list.toJS(),
      sortConfig,
    };
  },
);
