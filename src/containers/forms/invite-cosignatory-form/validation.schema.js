import * as yup from 'yup';
import { CLIENT_ERRORS } from '../../../constants/error.constants';

export const schema = yup.object().shape({
  name: yup.string().required(CLIENT_ERRORS.REQUIRED),
  surname: yup.string(),
  personalId: yup.string().max(12, CLIENT_ERRORS.PERSONAL_ID_FIELD),
  email: yup.string().required(CLIENT_ERRORS.REQUIRED).email(CLIENT_ERRORS.INVALID_EMAIL),
  phoneNumber: yup.string(),
  correspondenceAddress: yup.string(),
  residentialAddress: yup.string(),
  workplaces: yup.array()
    .of(
      yup.object().shape({
        title: yup.string().required(CLIENT_ERRORS.REQUIRED),
        companyId: yup.number().nullable().required(CLIENT_ERRORS.CHOOSE_COMPANY),
        positions: yup.array()
          .test('positions', 'Required positions',
            (value) => value.some((item) => item.isActive)),
        vetoPower: yup.boolean(),
        votingValue: yup.number()
          .typeError(CLIENT_ERRORS.REQUIRED),
      }),
    ),
});
