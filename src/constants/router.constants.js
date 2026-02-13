import { addTrailingSlash } from '../helpers/url.helpers';

export const INDEX_PATH = '/';
export const SIGNUP_PATH = '/sign-up';
export const SIGNIN_PATH = '/sign-in';
export const RESET_PASSWORD_PATH = '/reset-password';
export const VERIFY_DATA_PATH = '/verify-data';
export const RECOVER_PASSWORD_PATH = '/recover-password';
export const COMPANIES_PATH = '/companies/';
export const LIBRARY_PATH = '/library/';
export const COSIGNATORIES_PATH = '/cosignatories/';
export const COSIGNATORY_PROFILE_PATH = '/cosignatories/[id]/profile/';
export const COSIGNATORY_PROFILE = '/cosignatories/:id/profile/';
export const COSIGNATORY_OPEN_APPROVALS_PATH = '/cosignatories/[id]/open-approvals/';
export const COSIGNATORY_OPEN_APPROVALS = '/cosignatories/:id/open-approvals/';
export const COSIGNATORY_PREVIOUS_APPROVALS_PATH = '/cosignatories/[id]/previous-approvals/';
export const COSIGNATORY_PREVIOUS_APPROVALS = '/cosignatories/:id/previous-approvals/';
export const COSIGNATORY_MESSAGE_HISTORY_PATH = '/cosignatories/[id]/message-history/';
export const COSIGNATORY_MESSAGE_HISTORY = '/cosignatories/:id/message-history/';
export const COSIGNATORY_LOGS_PATH = '/cosignatories/[id]/logs/';
export const COSIGNATORY_LOGS = '/cosignatories/:id/logs/';

export const RESOLUTIONS_PATH = '/resolutions/';
export const RESOLUTION_PATH = '/resolutions/[id]/';
export const RESOLUTION = '/resolutions/:id/';
export const RESOLUTION_REPORT_PATH = '/resolutions/[id]/report';
export const RESOLUTION_REPORT = '/resolutions/:id/report';

export const MY_ACCOUNT_PATH = '/account/';
export const MY_ACCOUNT_INFO_PATH = `${MY_ACCOUNT_PATH}personal-info/`;
export const MY_ACCOUNT_LOGS_PATH = `${MY_ACCOUNT_PATH}logs/`;

export const SUBSCRIPTIONS_PATH = '/subscriptions/';

export const REGISTRATION_PATHS = [addTrailingSlash(SIGNIN_PATH), SIGNIN_PATH, addTrailingSlash(SIGNUP_PATH), SIGNUP_PATH,
  addTrailingSlash(VERIFY_DATA_PATH), VERIFY_DATA_PATH, RESET_PASSWORD_PATH, addTrailingSlash(RESET_PASSWORD_PATH), RESET_PASSWORD_PATH,
  addTrailingSlash(RECOVER_PASSWORD_PATH),
];
