import flactService from '../services/flact';
import { setCookieByName, removeCookieByName } from '../helpers/cookie.helpers';
import { clearUser } from './user.actions';

export const signUp = async (password, token) => {
  const { accessToken } = await flactService.auth.signUp({
    password, token,
  });
  setCookieByName('Authorization', accessToken);
};

export const signIn = async (email, password) => {
  const { accessToken } = await flactService.auth.signIn({ email, password });
  setCookieByName('Authorization', accessToken);
};

export const signOut = () => async (dispatch) => {
  await flactService.auth.signOut();
  await removeCookieByName('Authorization');
  await dispatch(clearUser());
};

export const resetPassword = async (email) => flactService.auth.resetPassword(email);

export const recoverPassword = async (token, password) => flactService.auth.recoverPassword(token, password);
