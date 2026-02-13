import BaseApiService from './base.api.service';

class AuthService extends BaseApiService {

  /**
   * User sing up
   * @param {string} email
   * @param {string} password
   * @returns {Promise<any>}
   */
  async signUp({
    password, token = null,
  }) {
    return this.client.post('/v1/auth/sign-up', {
      password, token,
    });
  }

  /**
   * User sing in
   * @param {string} email
   * @param {string} password
   * @returns {Promise<any>}
   */
  async signIn({ email, password }) {
    return this.client.post('/v1/auth/sign-in', { email, password });
  }

  /**
   * User sing out
   * @returns {Promise<any>}
   */
  async signOut() {
    return this.client.post('/v1/auth/sign-out');
  }

  async resetPassword(email) {
    return this.client.post('/v1/auth/reset-password', {
      email,
    });
  }

  async recoverPassword(token = '', password) {
    return this.client.post('/v1/auth/recover-password', {
      token,
      password,
    });
  }

}

export default AuthService;
