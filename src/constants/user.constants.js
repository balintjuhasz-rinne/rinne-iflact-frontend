export const USER_ROLES = {
  CO_SEC: 'CO_SECRETARY',
  CO_SIGNATORY: 'CO_SIGNATORY',
  ADMIN: 'ADMIN',
};

export const USER_POSITIONS = {
  DIRECTOR: 'Director',
  SHARE_HOLDER: 'Shareholder',
  CHAIRMAN: 'Chairman',
};

export const USER_POSITIONS_BACKEND = {
  Director: 'DIRECTOR',
  Shareholder: 'SHARE_HOLDER',
};

export const DEFAULT_VOTING_VALUE = 1;

export const DEFAULT_DROPDOWN_POSITIONS = [
  {
    title: USER_POSITIONS.DIRECTOR,
    id: USER_POSITIONS_BACKEND.Director,
    isActive: false,
  },
  {
    title: USER_POSITIONS.SHARE_HOLDER,
    id: USER_POSITIONS_BACKEND.Shareholder,
    isActive: false,
  },
];

export const USER_STATUS = {
  ACTIVE: 'ACTIVE',
  INACTIVE: 'INACTIVE',
};

export const USER_STATUS_FILTER = {
  '': 'All users ',
  [USER_STATUS.ACTIVE]: 'Active users ',
  [USER_STATUS.INACTIVE]: 'Inactive users ',
};

export const USER_COSIGNATORY_DEFAULT_STATUS = {
  title: 'All users ',
};
