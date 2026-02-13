import * as yup from 'yup';
import { CLIENT_ERRORS } from '../../../constants/error.constants';

export const schema = yup.object().shape({
  name: yup.string()
    .required(CLIENT_ERRORS.REQUIRED),
  registrationNumber: yup.string()
    .required(CLIENT_ERRORS.REQUIRED),
  email: yup.string()
    .required(CLIENT_ERRORS.REQUIRED)
    .email(CLIENT_ERRORS.INVALID_EMAIL),

  phoneNumber: yup.string()
    .required(CLIENT_ERRORS.REQUIRED),

  address: yup.string()
    .required(CLIENT_ERRORS.REQUIRED),
  website: yup.string()
    .matches(/^([^\s]+\.\S{2,}|)$/, 'website must be a valid URL'),
  profile: yup.string().max(500, 'max 500 characters'),
  comment: yup.string().max(500, 'max 500 characters'),
});
