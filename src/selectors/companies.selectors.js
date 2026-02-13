import { createSelector } from 'reselect';
import { filterCompanies } from '../helpers/companies.helpers';

export const getCompaniesPageSelector = createSelector(
  (state) => state.companies.get('pageList'),
  (state) => state.companies.get('count'),
  (state) => state.companies.get('currentPage'),
  (state) => state.companies.get('filterConfig'),
  (pageList, count, currentPage, filterConfig) => {
    filterConfig = filterConfig.toJS();
    const list = pageList.toJS().filter((item) => filterCompanies(item, filterConfig));
    return {
      list, count, currentPage, filterConfig,
    };
  },
);

export const getCompaniesSelector = createSelector(
  (state) => state.companies.get('list'),
  (list) => ({ list: list.toJS() }),
);
