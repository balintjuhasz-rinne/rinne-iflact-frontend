import * as yup from 'yup';
import { CLIENT_ERRORS } from '../../constants/error.constants';

export const schema = yup.object().shape({
  name: yup.string().required(CLIENT_ERRORS.REQUIRED),
  surname: yup.string(),
  personalId: yup.string().max(12, CLIENT_ERRORS.PERSONAL_ID_FIELD).nullable(),
  phoneNumber: yup.string(),
  correspondenceAddress: yup.string().nullable(),
  residentialAddress: yup.string().nullable(),
  workplaces: yup.array()
    .of(
      yup.object().shape({
        positions: yup.array()
          .test('positions', 'Required positions',
            (value) => value.some((item) => item.isActive)),
        vetoPower: yup.boolean(),
        votingValue: yup.number()
          .typeError(CLIENT_ERRORS.REQUIRED),
      }),
    ),
});
