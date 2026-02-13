import config from '../utils/config';
import { post } from '../utils/api';

export const uploadFile = (data, type) => post(`${config.STATIC_DOMAIN}/static/v1/files/${type}`, data);
