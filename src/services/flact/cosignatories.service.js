import BaseApiService from './base.api.service';

class CosignatoriesService extends BaseApiService {

  /**
   * Get information for the current user
   * @returns {Promise<any>}
  */
  async getCosignatories(filters) {
    return this.client.get('/v1/cosignatories', filters);
  }

  async createCosignatory(cosignatory = {}) {
    return this.client.post('/v1/cosignatories', cosignatory);
  }

  async deleteCosignatory(id) {
    return this.client.del(`/v1/cosignatories/${id}`);
  }

  async getCosignatory(id) {
    return this.client.get(`/v1/cosignatories/${id}`);
  }

  async createOrEditCosignatoryComment(id, text) {
    return this.client.patch(`/v1/cosignatories/${id}/comment`, { text });
  }

  async deleteCosignatoryComment(id) {
    return this.client.del(`/v1/cosignatories/${id}/comment`);
  }

  async updateCosignatory(id, cosignatory = {}) {
    return this.client.patch(`/v1/cosignatories/${id}`, {
      ...cosignatory,
    });
  }

  async inviteCosignatoryToCompanies(id, companies) {
    return this.client.post(`/v1/cosignatories/${id}/workplaces`, {
      ...companies,
    });
  }

  async getCosignatoryLogs(id) {
    return this.client.get(`/v1/users/${id}/logs`);
  }

  async getCosignatoryMessageHistory(id) {
    return this.client.get(`/v1/cosignatories/${id}/messages`);
  }

  async resendCosignatoryMessage(id, messageId) {
    return this.client.post(`/v1/cosignatories/${id}/messages/${messageId}/resend`, {});
  }

  async resendCosignatoryInvite(email) {
    return this.client.patch('/v1/invite/re-send', { email });
  }

  async changeStatusCosignatory(id, status) {
    return this.client.patch(`/v1/cosignatories/${id}/status`, {
      status,
    });
  }

  async deleteCosignatoryWorkplace(id, workplaceId) {
    return this.client.del(`/v1/cosignatories/${id}/workplaces/${workplaceId}`);
  }

  async getCosignatoriesEmails() {
    return this.client.get('/v1/cosignatories/partial/emails');
  }

}
export default CosignatoriesService;
