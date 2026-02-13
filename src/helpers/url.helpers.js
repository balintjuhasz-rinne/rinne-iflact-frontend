import { LINKS_REG_EXP } from '../constants/other.constants';

export const createDynamicPath = (path, id) => path.replace(/:id/, id);

export const addTrailingSlash = (path) => {
  if (!path.match(/\//)) return path;
  const splitted = path.split('#');
  let pathname = splitted[0];
  pathname = pathname.slice(-1) === '/' ? pathname : `${pathname}/`;
  if (splitted.length > 1) {
    pathname += `#${splitted[1]}`;
  }
  return pathname;
};

export const removeTrailingSlash = (path) => path.replace(/\/$/, '');

export const isActivePath = (current, supposed) => {
  const currentPath = addTrailingSlash(current);
  const supposedPath = addTrailingSlash(supposed);
  return currentPath.includes(supposedPath) || currentPath === supposedPath;
};

export const textSeparator = (text) => text.replace(LINKS_REG_EXP, '');

export const linkSeparator = (text) => text.match(LINKS_REG_EXP);
