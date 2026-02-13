import * as yup from 'yup';

export const schema = yup.object().shape({
  cancelReason: yup.string().max(500, 'max 500 characters'),
});
