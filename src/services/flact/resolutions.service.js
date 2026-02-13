import BaseApiService from './base.api.service';

class ResolutionsService extends BaseApiService {

  async getResolutions(filters) {
    return this.client.get('/v1/resolutions', filters);
  }

  async getResolution(id) {
    return this.client.get(`/v1/resolutions/${id}`);
  }

  async getResolutionIds() {
    return this.client.get('/v1/resolutions/ids');
  }

  async voteOnResolution(resolutionId, voteValue) {
    return this.client.post('/v1/resolutions/vote', {
      resolutionId,
      vote: voteValue,
    });
  }

  async cancelResolution(id, options) {
    return this.client.patch(`/v1/resolutions/${id}/cancel`, options);
  }

  async createResolution(resolution) {
    return this.client.post('/v1/resolutions/', resolution);
  }

  async editResolution(resolutionId, documentsIds) {
    return this.client.patch(`/v1/resolutions/${resolutionId}/document`, {
      documentsIds,
    });
  }

  async getResolutionComments(id) {
    return this.client.get(`/v1/resolutions/${id}/comments`);
  }

  async createOrEditComment(resolutionId, text) {
    return this.client.patch(`/v1/resolutions/${resolutionId}/comment`, { text });
  }

  async deleteResolutionComment(resolutionId) {
    return this.client.del(`/v1/resolutions/${resolutionId}/comment`);
  }

}

export default ResolutionsService;
