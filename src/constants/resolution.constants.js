export const RESOLUTION_TYPES = {
  BOARD_OF_DIRECTORS_RESOLUTION: {
    title: 'Tawarruq',
    defaultMin: 51,
  },
  MEMBERS_SHAREHOLDERS_AFFAIR: {
    title: 'Murabaha',
    defaultMin: 51,
  },
  BOARD_OF_DIRECTORS_SPECIAL_RESOLUTION: {
    title: 'Ijarah',
    defaultMin: 75,
  },
};

export const RESOLUTION_TYPES_BACKEND = {
  All: '',
  BOARD_OF_DIRECTORS_RESOLUTION: 'BOARD_OF_DIRECTORS_RESOLUTION',
  MEMBERS_SHAREHOLDERS_AFFAIR: 'MEMBERS_SHAREHOLDERS_AFFAIR',
  BOARD_OF_DIRECTORS_SPECIAL_RESOLUTION: 'BOARD_OF_DIRECTORS_SPECIAL_RESOLUTION',
};

export const RESOLUTION_STATUSES = {
  All: 'All',
  InProgress: 'In progress',
  Closed: 'Closed',
  Upcoming: 'Upcoming',
  Canceled: 'Cancelled',
  Accepted: 'Accepted',
  Rejected: 'Rejected',
};

export const RESOLUTION_STATUSES_BACKEND = {
  All: '',
  InProgress: 'InProgress',
  Closed: 'Closed',
  Upcoming: 'Upcoming',
  Accepted: 'Accepted',
  Rejected: 'Rejected',
  Canceled: 'Canceled',
};

export const RESOLUTION_STATUSES_CLOSED = [
  RESOLUTION_STATUSES_BACKEND.Canceled,
  RESOLUTION_STATUSES_BACKEND.Rejected,
  RESOLUTION_STATUSES_BACKEND.Accepted,
];

export const DEFAULT_NOTICE_PERIOD = 14;

export const VOTE_STATUSES = {
  FOR: 'For',
  AGAINST: 'Against',
  NOT_VOTED: 'NotVote',
  ABSTAIN: 'Abstain',
};

export const VOTE_STATUSES_TITLES = {
  For: 'Approve',
  Against: 'Reject',
  NotVote: 'No action',
  Abstain: 'Abstain',
};

export const RESOLUTIONS_TYPES_FILTER = [
  {
    title: 'All types',
    id: RESOLUTION_TYPES_BACKEND.All,
    isActive: true,
  }, {
    title: 'Tawarruq',
    id: RESOLUTION_TYPES_BACKEND.BOARD_OF_DIRECTORS_RESOLUTION,
    isActive: true,
  }, {
    title: 'Ijarah',
    id: RESOLUTION_TYPES_BACKEND.BOARD_OF_DIRECTORS_SPECIAL_RESOLUTION,
    isActive: true,
  }, {
    title: 'Murabaha',
    id: RESOLUTION_TYPES_BACKEND.MEMBERS_SHAREHOLDERS_AFFAIR,
    isActive: true,
  },
];

export const RESOLUTIONS_STATUSES_FILTER = {
  All: 'All statuses',
  [RESOLUTION_STATUSES_BACKEND.InProgress]: 'In progress',
  [RESOLUTION_STATUSES_BACKEND.Closed]: 'Closed',
  [RESOLUTION_STATUSES_BACKEND.Upcoming]: 'Upcoming',
  [RESOLUTION_STATUSES_BACKEND.Canceled]: 'Cancelled',
  [RESOLUTION_STATUSES_BACKEND.Accepted]: 'Accepted',
  [RESOLUTION_STATUSES_BACKEND.Rejected]: 'Rejected',
};

export const RESOLUTIONS_CLOSED_DATES = {
  endDate: 'Deferred Payment date',
  resolveDate: 'Voting closed date',
};

export const RESOLUTIONS_PAGE_LIMIT = 12;
