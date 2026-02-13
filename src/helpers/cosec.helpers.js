import { isSameDay } from 'date-fns';
import { RESOLUTION_STATUSES_BACKEND } from '../constants/resolution.constants';
import { isClosedResolution } from './resolutions.helpers';

export const getCompanyDropdownOptions = (companiesList) => companiesList.map(({ name, id }) => ({
  title: name,
  id,
}));

export const cosignatoryResolutionsFilter = (item, filterConfig) => {
  if (filterConfig.status === RESOLUTION_STATUSES_BACKEND.Closed) {
    return (isClosedResolution(item.status) && item.company.name?.toLowerCase().includes(filterConfig.name?.toLowerCase()));
  }
  return (!isClosedResolution(item.status) && item.company.name?.toLowerCase().includes(filterConfig.name?.toLowerCase()));
};

export const cosignatoryMessagesFilter = (item, filterConfig) => {
  const filterByType = filterConfig.type === '' || item.type === filterConfig.type;
  const filterByDate = filterConfig.date === '' || isSameDay(new Date(item.updatedAt), new Date(filterConfig.date));
  return filterByType && filterByDate;
};
