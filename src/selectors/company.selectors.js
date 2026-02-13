import { createSelector } from 'reselect';
import { sortTable } from '../helpers/functions.helper';

export const getCompanySelector = createSelector(
  (state) => state.company.get('info'),
  (state) => state.company.get('coSignatories'),
  (state) => state.company.get('coWorkers'),
  (info, coSignatories, coWorkers) => ({
    info: info.toJS(),
    coSignatories: coSignatories.toJS(),
    coWorkers: coWorkers.toJS(),
  }),
);

export const getCompanyLogsSelector = createSelector(
  (state) => state.company.getIn(['logs', 'list']),
  (state) => state.company.getIn(['logs', 'sortConfig']),
  (state) => state.company.getIn(['logs', 'page']),
  (list, sortConfig, page) => ({
    sortConfig,
    page,
    list: list
      .toJS()
      .sort((a, b) => sortTable(a, b, sortConfig)),
  }),
);

export const getCompanyResolutionsSelector = createSelector(
  (state) => state.company.getIn(['resolutions', 'list']),
  (state) => state.company.getIn(['resolutions', 'filterConfig']),
  (state) => state.company.getIn(['resolutions', 'sortConfig']),
  (list, filterConfig, sortConfig) => ({
    sortConfig,
    filterConfig,
    list: list
      .toJS()
      .sort((a, b) => sortTable(a, b, sortConfig)),
  }),
);
