import BaseApiService from './base.api.service';

class UserService extends BaseApiService {

  /**
   * Get information for the current user
   * @returns {Promise<any>}
  */
  async getUser(token) {
    const options = token ? {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    } : {};
    return this.client.get('/v1/users/me', null, options);
  }

  async updateUser(data) {
    return this.client.patch('/v1/users/me/', data);
  }

  async getUserColleagues(id) {
    return this.client.get(`/v1/users/${id}/colleagues`);
  }

  async updateUserNotifications(data) {
    return this.client.put('/v1/users/me/notifications', data);
  }

  async getUserByToken(token = '') {
    return this.client.get(`/v1/users/by-token/${token}`);
  }

  async changePassword(data) {
    return this.client.patch('/v1/users/me/password', data);
  }

  async getUserLogs(id, filters) {
    return this.client.get(`/v1/users/${id}/logs`, filters);
  }

  async deleteUser() {
    return this.client.del('/v1/users/me');
  }

}

export default UserService;
