import * as yup from 'yup';
import { CLIENT_ERRORS } from '../../../constants/error.constants';

export const schema = yup.object().shape({
  email: yup.string().required(CLIENT_ERRORS.REQUIRED).email(CLIENT_ERRORS.INVALID_EMAIL),
  gdpr: yup.boolean().oneOf([true], CLIENT_ERRORS.GDPR),
  password: yup.string()
    .min(8, CLIENT_ERRORS.PASSWORD_LENGTH)
    .required(CLIENT_ERRORS.REQUIRED)
    .matches(/(.*[A-Z].*)/, CLIENT_ERRORS.ONE_LETTER_IN_CAPITAL)
    .matches(/^(?=.*?[A-Z])(?=.*?[0-9]).{8,}$/, CLIENT_ERRORS.INCLUDES_LETTERS_AND_NUMBERS),
});
