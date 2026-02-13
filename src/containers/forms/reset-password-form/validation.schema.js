import * as yup from 'yup';
import { CLIENT_ERRORS } from '../../../constants/error.constants';

export const schema = yup.object().shape({
  email: yup.string().required(CLIENT_ERRORS.REQUIRED).email(CLIENT_ERRORS.INVALID_EMAIL),
});
