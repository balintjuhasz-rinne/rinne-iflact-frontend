import * as yup from 'yup';
import { CLIENT_ERRORS } from '../../../constants/error.constants';

const notificationsValidateRequired = (fieldName) => ({
  name: fieldName,
  message: CLIENT_ERRORS.REQUIRED_SHORT,
  test: (value) => value !== true,
});

const notificationsValidateMax = (fieldName) => ({
  name: fieldName,
  message: 'max 365',
  test: (value) => {
    if (typeof value === 'undefined') {
      return true;
    }
    return +value <= 365;
  },
});

export const cosecSchema = yup.object().shape({
  name: yup.string()
    .required(CLIENT_ERRORS.REQUIRED),
  surname: yup.string(),
  email: yup.string()
    .required(CLIENT_ERRORS.REQUIRED)
    .email(CLIENT_ERRORS.INVALID_EMAIL),
  cosecPosition: yup.string()
    .required(CLIENT_ERRORS.REQUIRED),
  phoneNumber: yup.string(),

  emailBeforeIncorporation: yup.mixed()
    .test(notificationsValidateRequired('emailBeforeIncorporation'))
    .test(notificationsValidateMax('emailBeforeIncorporation')),
  emailBeforeFinancialYearEnd: yup.mixed()
    .test(notificationsValidateRequired('emailBeforeFinancialYearEnd'))
    .test(notificationsValidateMax('emailBeforeFinancialYearEnd')),
  emailBeforeAGM: yup.mixed()
    .test(notificationsValidateRequired('emailBeforeAGM'))
    .test(notificationsValidateMax('emailBeforeAGM')),

  smsBeforeIncorporation: yup.mixed()
    .test(notificationsValidateRequired('smsBeforeIncorporation'))
    .test(notificationsValidateMax('smsBeforeIncorporation')),
  smsBeforeFinancialYearEnd: yup.mixed()
    .test(notificationsValidateRequired('smsBeforeFinancialYearEnd'))
    .test(notificationsValidateMax('smsBeforeFinancialYearEnd')),
  smsBeforeAGM: yup.mixed()
    .test(notificationsValidateRequired('smsBeforeAGM'))
    .test(notificationsValidateMax('smsBeforeAGM')),
});

export const cosignotarySchema = yup.object().shape({
  name: yup.string()
    .required(CLIENT_ERRORS.REQUIRED),
  surname: yup.string(),
  email: yup.string()
    .required(CLIENT_ERRORS.REQUIRED)
    .email(CLIENT_ERRORS.INVALID_EMAIL),
  phoneNumber: yup.string(),
  correspondenceAddress: yup.string(),
  residentialAddress: yup.string(),
  personalId: yup.string().max(12, CLIENT_ERRORS.PERSONAL_ID_FIELD),

  emailBeforeFinancialYearEnd: yup.mixed()
    .test(notificationsValidateRequired('emailBeforeFinancialYearEnd'))
    .test(notificationsValidateMax('emailBeforeFinancialYearEnd')),

  smsBeforeFinancialYearEnd: yup.mixed()
    .test(notificationsValidateRequired('smsBeforeFinancialYearEnd'))
    .test(notificationsValidateMax('smsBeforeFinancialYearEnd')),
});
