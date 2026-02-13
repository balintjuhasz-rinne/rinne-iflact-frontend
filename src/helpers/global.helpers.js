import {
  REGISTRATION_PATHS, VERIFY_DATA_PATH, RECOVER_PASSWORD_PATH, SIGNIN_PATH,
} from '../constants/router.constants';

// eslint-disable-next-line max-len
export const isUnregisteredPage = (route) => REGISTRATION_PATHS.includes(route) || route.includes(VERIFY_DATA_PATH) || route.includes(RECOVER_PASSWORD_PATH) || route.includes(SIGNIN_PATH);
