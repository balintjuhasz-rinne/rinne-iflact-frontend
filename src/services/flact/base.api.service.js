/* eslint-disable no-underscore-dangle  */
import {
  get, post, patch, put, del,
} from '../../utils/api';

export default class BaseApiService {

  constructor(url) {
    this.url = url;
  }

  get client() {
    return {
      get: (...params) => this._get(...params),
      post: (...params) => this._post(...params),
      patch: (...params) => this._patch(...params),
      put: (...params) => this._put(...params),
      del: (...params) => this._del(...params),
    };
  }

  _get(method, data, options) {
    return get(`${this.url}${method}`, data, options);
  }

  _post(method, data, options) {
    return post(`${this.url}${method}`, data, options);
  }

  _patch(method, data, options) {
    return patch(`${this.url}${method}`, data, options);
  }

  _put(method, data, options) {
    return put(`${this.url}${method}`, data, options);
  }

  _del(method, data, options) {
    return del(`${this.url}${method}`, data, options);
  }

}
