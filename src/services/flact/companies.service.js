import BaseApiService from './base.api.service';

class CompaniesService extends BaseApiService {

  /**
   * Get information for the current user
   * @returns {Promise<any>}
  */
  async getCompanies(skip, limit, name, sortOrder, sortParam = 'name') {
    return this.client.get('/v1/companies', {
      skip,
      limit,
      ...name && { name },
      ...sortOrder && { sortOrder },
      sortParam,
    });
  }

  async getCompany(id) {
    return this.client.get(`/v1/companies/${id}`);
  }

  async getAllCompaniesNameAndId() {
    return this.client.get('/v1/companies/names');
  }

  async getUsers(id) {
    return this.client.get(`/v1/companies/${id}/users/`);
  }

  async getLogs(id, filters) {
    return this.client.get(`/v1/companies/${id}/logs/`, filters);
  }

  async createCompany(company) {
    return this.client.post('/v1/companies/', { ...company });
  }

  async updateCompany(id, company = {}) {
    return this.client.put(`/v1/companies/${id}`, { ...company });
  }

  async deleteCompany(id) {
    return this.client.del(`/v1/companies/${id}`);
  }

}

export default CompaniesService;
