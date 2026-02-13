import { EXPIRES_TIME } from '../constants/global.constants';

export const formatCookieExpires = (time) => (new Date(time)).toUTCString();

export const getCookieByName = (name) => {
  const v = document.cookie.match(`(^|;) ?${name}=([^;]*)(;|$)`);
  return v ? v[2] : null;
};

export const setCookieByName = (field, value, expires) => {
  const expiresTime = expires || (Date.now() + EXPIRES_TIME);
  const formatExpiresTime = formatCookieExpires(expiresTime);
  document.cookie = `${field}=${value}; expires=${formatExpiresTime}; path=/`;
};

export const removeCookieByName = (name) => {
  document.cookie = `${name}=; Max-Age=-99999999; path=/`;
};
