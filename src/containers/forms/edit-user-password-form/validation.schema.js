import * as yup from 'yup';
import { REQUIRED, CLIENT_ERRORS } from '../../../constants/error.constants';

export const schema = yup.object().shape({
  oldPassword: yup.string()
    .min(8, CLIENT_ERRORS.PASSWORD_LENGTH)
    .required(REQUIRED)
    .matches(/(.*[A-Z].*)/, CLIENT_ERRORS.ONE_LETTER_IN_CAPITAL)
    .matches(/^(?=.*?[A-Z])(?=.*?[0-9]).{8,}$/, CLIENT_ERRORS.INCLUDES_LETTERS_AND_NUMBERS),

  newPassword: yup.string()
    .min(8, CLIENT_ERRORS.PASSWORD_LENGTH)
    .required(REQUIRED)
    .matches(/(.*[A-Z].*)/, CLIENT_ERRORS.ONE_LETTER_IN_CAPITAL)
    .matches(/^(?=.*?[A-Z])(?=.*?[0-9]).{8,}$/, CLIENT_ERRORS.INCLUDES_LETTERS_AND_NUMBERS),

  confirmNewPassword: yup.string()
    .min(8, CLIENT_ERRORS.PASSWORD_LENGTH)
    .required(REQUIRED)
    .matches(/(.*[A-Z].*)/, CLIENT_ERRORS.ONE_LETTER_IN_CAPITAL)
    .matches(/^(?=.*?[A-Z])(?=.*?[0-9]).{8,}$/, CLIENT_ERRORS.INCLUDES_LETTERS_AND_NUMBERS)
    .oneOf([yup.ref('newPassword'), null], CLIENT_ERRORS.PASSWORD_MATCH)
    .when('newPassword', (password, field) => {
      field.oneOf([yup.ref('newPassword'), password], CLIENT_ERRORS.PASSWORD_MATCH);
    }),

});
