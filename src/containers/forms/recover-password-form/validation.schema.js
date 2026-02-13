import * as yup from 'yup';
import { CLIENT_ERRORS } from '../../../constants/error.constants';

export const schema = yup.object().shape({
  password: yup.string()
    .min(8, CLIENT_ERRORS.PASSWORD_LENGTH)
    .required(CLIENT_ERRORS.REQUIRED)
    .matches(/(.*[A-Z].*)/, CLIENT_ERRORS.ONE_LETTER_IN_CAPITAL)
    .matches(/^(?=.*?[A-Z])(?=.*?[0-9]).{8,}$/, CLIENT_ERRORS.PASSWORD_CONDITION),
  confirmPassword: yup.string().required(CLIENT_ERRORS.REQUIRED)
    .oneOf([yup.ref('password'), null], CLIENT_ERRORS.PASSWORD_MATCH),
});
