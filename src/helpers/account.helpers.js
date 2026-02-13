import { USER_POSITIONS, USER_POSITIONS_BACKEND, DEFAULT_DROPDOWN_POSITIONS } from '../constants/user.constants';

export const getInitials = (name, surname) => {
  const nameLeter = name?.split('')[0] || '';
  const surnameLetter = surname?.split('')[0] || '';
  return `${nameLeter}${surnameLetter}`.toUpperCase();
};

export const transformPositionsToString = (positionsArr = []) => {
  const namesArr = positionsArr.map((item) => USER_POSITIONS[item.name]).sort();
  return [...new Set(namesArr)].join(', ');
};

export const isDropdownShareholderActive = (droprownOptions) => (
  !!(droprownOptions.find((item) => item.id === USER_POSITIONS_BACKEND.Shareholder && item.isActive)
  ));

export const transformDropdownPositionsFromBackend = (dropdownOptions) => (
  dropdownOptions.map(({ name }) => name)
);

export const transformDropdownPositionsForBackend = (dropdownOptions) => (
  dropdownOptions.filter((item) => item.isActive).map((item) => item.id)
);

export const transformDropdownPositionsForStore = (dropdownOptions) => (
  dropdownOptions.filter((item) => item.isActive).map((item) => ({ name: item.id }
  )));

export const transformStoreToDropdownPositions = (storePositions) => (
  DEFAULT_DROPDOWN_POSITIONS.map((item) => ({
    ...item,
    isActive: storePositions ? storePositions.some((i) => i.name === item.id) : false,
  }))
);
