import BaseApiService from './base.api.service';

class CosecretariesService extends BaseApiService {

  async inviteCosecretary(data) {
    return this.client.post('/v1/cosecretaries', data);
  }

}

export default CosecretariesService;
