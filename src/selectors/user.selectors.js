import { createSelector } from 'reselect';
import { sortTable } from '../helpers/functions.helper';

export const getUserSelector = createSelector(
  (state) => state.user.toJS(),
  (user) => ({ user }),
);

export const getUserRoleSelector = createSelector(
  (state) => state.user.get('role'),
  (role) => ({ role }),
);

export const getUserIdSelector = createSelector(
  (state) => state.user.get('id'),
  (id) => (id),
);

export const getUserLogsSelector = createSelector(
  (state) => state.user.getIn(['logs', 'list']),
  (state) => state.user.getIn(['logs', 'sortConfig']),
  (state) => state.user.getIn(['logs', 'page']),
  (list, sortConfig, page) => ({
    sortConfig,
    page,
    list: list
      .toJS()
      .sort((a, b) => sortTable(a, b, sortConfig)),
  }),
);

export const getUserCompanyIdSelector = createSelector(
  (state) => state.user.get('workplaces'),
  (workplaces) => workplaces[0].companyId,
);
