import { format } from 'date-fns';
import { formatToTimeZone } from 'date-fns-timezone';
import React from 'react';
import Axios from 'axios';
import fileDownload from 'js-file-download';
import { SERVER_ERRORS } from '../constants/error.constants';
import { IC_SUCCESS_TRANSPARENT } from '../constants/image.constants';
import { logParametersBackend } from '../constants/other.constants';
import { USER_SORT_PARAM } from '../constants/sort.constants';
import { USER_POSITIONS, USER_STATUS } from '../constants/user.constants';
import config from '../utils/config';
import { capitalizeFirst } from '../utils/string.utils';
import {
  transformPositionsToString,
  transformDropdownPositionsForBackend, transformDropdownPositionsFromBackend,
} from './account.helpers';

export const normalizeError = (e, defaultError = SERVER_ERRORS.DEFAULT) => {
  const error = e?.response?.data?.errors || [];
  const errorName = (error[0] && error[0].message) ? error[0].message : error;
  return SERVER_ERRORS[errorName] || e.message || defaultError;
};

export const getObjectProperty = (object, path = '', defaultValue = '') => {
  if (path === USER_SORT_PARAM.POSITION) {
    const positions = object.workplaces.map((item) => item.positions).flat();
    return transformPositionsToString(positions);
  } if (path === USER_SORT_PARAM.SHARES) {
    const sharesValues = object.workplaces.map((item) => item.votingValue).filter((item) => item);
    return Math.max(...sharesValues);
  } if (path === USER_SORT_PARAM.COMPANY) {
    return object?.workplaces?.[0]?.company?.name || object?.company?.name;
  }

  if (path === 'resolveDate') {
    return object.resolveDate;
  }
  if (path === 'startDate') {
    return object.votingStartDate;
  }
  if (path === 'endDate') {
    return object.votingEndDate;
  }

  return path ? path.split('.').reduce((o, p) => (o ? o[p] : defaultValue), object) : object;
};

export const sortTable = (a, b, sortConfig) => {
  a = getObjectProperty(a, sortConfig.field);
  b = getObjectProperty(b, sortConfig.field);

  if (a === b) {
    return -1;
  }

  return a < b ? -1 * sortConfig.direction : sortConfig.direction;
};

export const allowNumbersAndDot = (value) => value.replace(/[^0-9.]/g, '').replace(/(\..*)\./g, '$1');

export const allowOnlyNumbers = (value) => value.replace(/[^0-9]/g, '').replace(/(\..*)\./g, '$1');

export const validateFileType = (fileType) => {
  const validTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/x-icon'];
  return validTypes.includes(fileType);
};

export const isValidFileSize = (size, limit) => size / 1024 / 1024 < limit;

export const formFileSize = (size) => {
  if (size < 1000000) return `${Math.floor(size / 1000) }kb`;
  return `${Math.floor(size / 1000000) }mb`;
};

export const repalceFieldValues = (field, values) => values.forEach((value) => {
  field[value] = field[value] ? field[value] : null;
});

export const getDropdownOption = (options, param) => options.find((item) => item.id === param);

export const isPageListEmpty = (list, filterConfig) => {
  let hasFilter = false;
  if (filterConfig) {
    const filterOptions = Object.keys(filterConfig);
    hasFilter = filterOptions.some((option) => filterConfig[option] !== '');
  }
  return !hasFilter && list.length < 1;
};

export const isEmptyObject = (obj) => Object.keys(obj).length === 0 && obj.constructor === Object;

export const isBoolean = (val) => typeof val === 'boolean';

export const isDefined = (val) => (val !== undefined && val !== null);

export const isFilterNotFound = (list, filterConfig) => {
  const filterOptions = Object.keys(filterConfig);
  const hasFilter = filterOptions.some((option) => filterConfig[option] !== '');
  return hasFilter && list.length < 1;
};

export const formatLogValue = (parameter, value) => {

  switch (parameter) {
    case logParametersBackend.incorporationDate:
    case logParametersBackend.nextMeetingDate:
    case logParametersBackend.financialYearEndDate:
      return value ? format(new Date(value), 'dd MMMM yyyy') : '';
    case logParametersBackend.position:
      if (value) {
        const arr = value.split(', ');
        const newVal = arr.map((item) => USER_POSITIONS[item]).join(', ');
        return newVal;
      }
      return value;
    case logParametersBackend.vetoPower:
      return value === 'true' ? <img src={IC_SUCCESS_TRANSPARENT} alt="success" /> : '-';
    case logParametersBackend.emailNotification:
    case logParametersBackend.smsNotification:
      return value === 'true' ? 'On' : 'Off';
    case logParametersBackend.status:
      return capitalizeFirst(USER_STATUS[value]);
    default:
      return value;
  }
};

export const prepareDropdownOption = (obj) => Object.entries(obj).map((el) => ({
  id: el[0],
  title: el[1],
}));

export const formatTimeToTimezone = (date, template) => formatToTimeZone(
  new Date(date), template, { timeZone: config.TIMEZONE },
);

export const formatTimezone = (date, start = false) => {
  if (!date) {
    return null;
  }
  const time = start ? '00:00:00' : '23:59:59';
  return formatTimeToTimezone(date, `YYYY-MM-DD[T]${time}Z`);
};

export const downloadHandler = (url, filename) => {
  Axios.get(url, {
    responseType: 'blob',
  }).then((res) => {
    fileDownload(res.data, filename);
  });
};

export const compareCosignerProfileFormData = (vetoPower, hasVetoPower, positions, pos, oldVoting, votingValue) => {

  const newPositions = transformDropdownPositionsForBackend(pos);
  const oldPositions = transformDropdownPositionsFromBackend(positions);

  const compare = vetoPower === hasVetoPower
                  && oldVoting === votingValue
                  && newPositions.every((item) => oldPositions.includes(item))
                  && newPositions.length === oldPositions.length;
  return compare;
};

export const rmEmptyFormDataFields = (data) => {
  if (!data) return data;
  return Object.keys(data).forEach((item) => {
    if (data[item] === '') data[item] = null;
  });
};

export const rmEmptyFilterDataFields = (data) => {
  if (!data) return data;
  const formattedData = { ...data };
  Object.keys(formattedData).forEach((item) => {
    if (formattedData[item] === null || formattedData[item] === '') formattedData[item] = undefined;
  });
  return formattedData;
};

export const removeFalsyFromObject = (obj) => {
  const newObj = {};
  Object.keys(obj).forEach((prop) => {
    if (obj[prop]) { newObj[prop] = obj[prop]; }
  });
  return newObj;
};
