import { RESOLUTION_STATUSES, RESOLUTION_STATUSES_BACKEND } from '../../constants/resolution.constants';

export const getSwitcherOptions = (pathname = '') => [
  {
    title: RESOLUTION_STATUSES.All,
    id: RESOLUTION_STATUSES_BACKEND.All,
    isActive: pathname === '',
  },
  {
    title: RESOLUTION_STATUSES.Upcoming,
    id: RESOLUTION_STATUSES_BACKEND.Upcoming,
    isActive: pathname === RESOLUTION_STATUSES_BACKEND.Upcoming,
  },
  {
    title: RESOLUTION_STATUSES.InProgress,
    id: RESOLUTION_STATUSES_BACKEND.InProgress,
    isActive: pathname === RESOLUTION_STATUSES_BACKEND.InProgress,
  },
  {
    title: RESOLUTION_STATUSES.Closed,
    id: RESOLUTION_STATUSES_BACKEND.Closed,
    isActive: pathname === RESOLUTION_STATUSES_BACKEND.Closed,
  },
];
