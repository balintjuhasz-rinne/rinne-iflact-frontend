import {
  isAfter, isBefore, isSameDay, isWithinInterval,
} from 'date-fns';
import {
  RESOLUTIONS_TYPES_FILTER,
  RESOLUTION_STATUSES,
  RESOLUTION_STATUSES_BACKEND,
  RESOLUTION_TYPES_BACKEND,
  VOTE_STATUSES,
} from '../constants/resolution.constants';
import { USER_ROLES } from '../constants/user.constants';

export const isClosedResolution = (resolutionStatus) => resolutionStatus === RESOLUTION_STATUSES_BACKEND.Canceled
  || resolutionStatus === RESOLUTION_STATUSES_BACKEND.Accepted
  || resolutionStatus === RESOLUTION_STATUSES_BACKEND.Rejected;

export const filterByStatus = (filterConfig, status) => {
  let itemStatus = status;
  if (isClosedResolution(status)) {
    itemStatus = RESOLUTION_STATUSES_BACKEND.Closed;
  }
  return filterConfig.status === RESOLUTION_STATUSES_BACKEND.All || itemStatus === filterConfig.status;
};

export const generateRangeMarks = (min, max, step = 5) => {
  const marks = { [min]: min, [max]: max };
  for (let i = min; i < max + 1; i += 1) {
    if (i % step === 0) marks[i] = i;
  }
  return marks;
};

export const makeResolutionStatus = (startDate, endDate) => {
  const inProgress = isWithinInterval(
    new Date(2014, 0, 3),
    { start: new Date(2014, 0, 1), end: new Date(2014, 0, 7) },
  ) || isSameDay(new Date(startDate), new Date()) || isSameDay(new Date(endDate), new Date());
  const upComing = isBefore(new Date(startDate), new Date());
  const closed = isAfter(new Date(endDate), new Date());
  if (inProgress) {
    return RESOLUTION_STATUSES.InProgress;
  } if (upComing) {
    return RESOLUTION_STATUSES.Upcoming;
  } if (closed) {
    return RESOLUTION_STATUSES.Closed;
  }
  return 'Not identified';
};

export const getVotingPercentage = (votedUsers, totalUsers, resolutionType, countAfterDot = 2) => {
  if (votedUsers.length === 0 || totalUsers.length === 0) {
    return Number(0).toFixed(countAfterDot);
  }
  if (resolutionType === RESOLUTION_TYPES_BACKEND.BOARD_OF_DIRECTORS_RESOLUTION
     || resolutionType === RESOLUTION_TYPES_BACKEND.BOARD_OF_DIRECTORS_SPECIAL_RESOLUTION) {
    return ((votedUsers.length / totalUsers.length) * 100).toFixed(countAfterDot);
  }
  const shareholdersVotedPercent = votedUsers.reduce((acc, item) => acc + item.votingValue, 0);
  return shareholdersVotedPercent.toFixed(countAfterDot);
};

const checkAllTypesSelected = (types) => types.every(({ id: typeId, isActive }) => {
  if (typeId) return isActive;
  return true;
});

export const onTypesInit = (selected) => {
  if (!selected) return RESOLUTIONS_TYPES_FILTER;
  const chengedTypes = RESOLUTIONS_TYPES_FILTER.map((type) => ({
    ...type,
    ...(!selected.includes(type.id)) && { isActive: false },
  }));
  chengedTypes[0].isActive = checkAllTypesSelected(chengedTypes);
  return chengedTypes;
};

export const onTypesChange = (id, types) => {
  const chengedTypes = types
    .map((type) => ({
      ...type,
      ...((type.id === id) && { isActive: !type.isActive }),
      ...(!id && { isActive: !types[0].isActive }),
    }));
  chengedTypes[0].isActive = checkAllTypesSelected(chengedTypes);
  return chengedTypes;
};

export const prepareTypesToRedux = (types) => {
  if (types.every(({ isActive }) => isActive)) return null;
  return types.map(({ isActive, id }) => (isActive ? id : '')).filter(Boolean);
};

export const isVoted = (cosignatories, userId, role) => {
  if (role !== USER_ROLES.CO_SIGNATORY) return false;
  const vote = cosignatories.find(({ id }) => id === userId)?.vote;
  return vote && vote !== VOTE_STATUSES.NOT_VOTED;
};

export const isDirectorsResolution = (type) => [
  RESOLUTION_TYPES_BACKEND.BOARD_OF_DIRECTORS_RESOLUTION,
  RESOLUTION_TYPES_BACKEND.BOARD_OF_DIRECTORS_SPECIAL_RESOLUTION,
].includes(type);
