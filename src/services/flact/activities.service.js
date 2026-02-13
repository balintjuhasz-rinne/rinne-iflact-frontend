import BaseApiService from './base.api.service';

class ActivitiesService extends BaseApiService {

  async getAllActivities() {
    return this.client.get('/v1/activities');
  }

  async getCompanyActivities(companyId) {
    return this.client.get('/v1/activities', {
      companyId,
    });
  }

  async getResolutionActivities(resolutionId) {
    return this.client.get('/v1/activities/', {
      resolutionId,
    });
  }

  async getUserActivities(userId) {
    return this.client.get('/v1/activities/', {
      userId,
    });
  }

}

export default ActivitiesService;
