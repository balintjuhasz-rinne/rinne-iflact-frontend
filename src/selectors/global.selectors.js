import { createSelector } from 'reselect';

export const getSidebarStateSelector = createSelector(
  (state) => state.global.get('isSidebarOpened'),
  (isSidebarOpened) => ({ isSidebarOpened }),
);
