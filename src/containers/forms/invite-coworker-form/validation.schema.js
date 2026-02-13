import * as yup from 'yup';
import { CLIENT_ERRORS } from '../../../constants/error.constants';

export const schema = yup.object().shape({
  name: yup.string().required(CLIENT_ERRORS.REQUIRED),
  surname: yup.string(),
  cosecPosition: yup.string()
    .required(CLIENT_ERRORS.REQUIRED)
    .min(1, 'Minimum 1 symbol'),
  email: yup.string()
    .required(CLIENT_ERRORS.REQUIRED)
    .email(CLIENT_ERRORS.INVALID_EMAIL),
  phoneNumber: yup.string(),
});
