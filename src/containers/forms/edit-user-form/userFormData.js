import {
  USER_ROLES,
  USER_POSITIONS,
  USER_POSITIONS_BACKEND,
} from '../../../constants/user.constants';

export const positionsOptions = [
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

export const getEmalNotificationsFields = (role) => {
  if (role === USER_ROLES.CO_SIGNATORY) {
    return [{
      field: 'emailBeforeFinancialYearEnd',
      hint: 'calendar days before every financial year end',
    }];
  }
  return [
    {
      field: 'emailBeforeIncorporation',
      hint: 'days before the Anniversary of incorporation date',
    }, {
      field: 'emailBeforeFinancialYearEnd',
      hint: 'calendar days before every financial year end',
    }, {
      field: 'emailBeforeAGM',
      hint: 'days before the 15 month anniversary of the last AGM',
    },
  ];
};

export const getSmsNotificationsFields = (role) => {
  if (role === USER_ROLES.CO_SIGNATORY) {
    return [{
      field: 'smsBeforeFinancialYearEnd',
      hint: 'calendar days before every financial year end',
    }];
  }
  return [
    {
      field: 'smsBeforeIncorporation',
      hint: 'days before the Anniversary of incorporation date',
    }, {
      field: 'smsBeforeFinancialYearEnd',
      hint: 'calendar days before every financial year end',
    }, {
      field: 'smsBeforeAGM',
      hint: 'days before the 15 month anniversary of the last AGM',
    },
  ];
};
