import BaseApiService from './base.api.service';

class TemplatesService extends BaseApiService {

  async getTemplates() {
    return this.client.get('/v1/templates');
  }

  async uploadTemplate(fileId) {
    return this.client.post('/v1/templates', { fileId });
  }

  async removeTemplate(id) {
    return this.client.del(`/v1/templates/${id}`);
  }

}

export default TemplatesService;
