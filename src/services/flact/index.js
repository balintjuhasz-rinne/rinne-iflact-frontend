import config from '../../utils/config';

import AuthService from './auth.service';
import UserService from './user.service';
import CosignatoriesService from './cosignatories.service';
import CompaniesService from './companies.service';
import ActivitiesService from './activities.service';
import ResolutionsService from './resolutions.service';
import CosecretariesService from './cosecretaries.service';
import TemplatesService from './templates.service';

class FlactService {

  constructor(url) {
    this.auth = new AuthService(url);
    this.user = new UserService(url);
    this.cosignatories = new CosignatoriesService(url);
    this.companies = new CompaniesService(url);
    this.activities = new ActivitiesService(url);
    this.resolutions = new ResolutionsService(url);
    this.cosecretaries = new CosecretariesService(url);
    this.templates = new TemplatesService(url);
  }

}

const flactService = new FlactService(config.BACKEND_API);
export default flactService;
