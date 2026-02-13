import * as yup from 'yup';
import { format } from 'date-fns';
import { CLIENT_ERRORS } from '../../../constants/error.constants';

export const schema = yup.object().shape({
  companyId: yup.string()
    .required(CLIENT_ERRORS.REQUIRED)
    .nullable()
    .transform((curr, orig) => (orig === '' ? null : curr)),
  name: yup.string()
    .required(CLIENT_ERRORS.REQUIRED)
    .max(128, 'Maximum 128 symbols'),
  type: yup.string()
    .required(CLIENT_ERRORS.REQUIRED),
  votingStartDate: yup.string()
    .required(CLIENT_ERRORS.REQUIRED),
  votingEndDate: yup.date()
    .required(CLIENT_ERRORS.REQUIRED)
    .nullable()
    .transform((curr, orig) => (orig === '' ? null : curr))
    .min(new Date(), `Date needs to be after ${format(new Date(), 'dd/MM/yyyy')}`),
  description: yup.string()
    .required(CLIENT_ERRORS.REQUIRED)
    .max(2000, 'max 2000 characters'),
  emergency: yup.boolean(),

  // --- NEW FIELDS ---
  commodityTrader: yup.string()
    .required(CLIENT_ERRORS.REQUIRED),
  commodityPurchaseAmount: yup
    .number()
    .typeError(CLIENT_ERRORS.REQUIRED)
    .required(CLIENT_ERRORS.REQUIRED)
    .min(0, 'Amount must be non-negative')
    .max(999999999.99, 'Amount is too large'),
  paymentIn: yup.string()
    .oneOf(['RLUSD', 'XRP', 'JPY', 'USD'])
    .required(CLIENT_ERRORS.REQUIRED),
  commodity: yup.string()
    .oneOf(['car', 'machinery', 'boat'])
    .required(CLIENT_ERRORS.REQUIRED),
  commodityUnit: yup.string()
    .oneOf(['pcs', 'weight'])
    .required(CLIENT_ERRORS.REQUIRED),
  commodityQuantity: yup
    .number()
    .typeError(CLIENT_ERRORS.REQUIRED)
    .required(CLIENT_ERRORS.REQUIRED)
    .min(0, 'Quantity must be non-negative'),
  commodityUniqueId: yup.string()
    .max(50, 'Max 50 characters'),
  commodityDescription: yup.string()
    .max(200, 'Max 200 characters'),
  sellAmount: yup
    .number()
    .typeError(CLIENT_ERRORS.REQUIRED)
    .required(CLIENT_ERRORS.REQUIRED)
    .min(0, 'Amount must be non-negative')
    .max(999999999.99, 'Amount is too large'),
  secondPaymentIn: yup.string()
    .oneOf(['RLUSD', 'XRP', 'JPY', 'USD'])
    .required(CLIENT_ERRORS.REQUIRED),
  agencyDeal: yup.boolean()
    .default(true),
});
