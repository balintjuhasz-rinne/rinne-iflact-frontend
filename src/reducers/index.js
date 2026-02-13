import global from './global.reducer';
import user from './user.reducer';
import cosignatories from './cosignatories.reducer';
import companies from './companies.reducer';
import company from './company.reducer';
import cosignatory from './cosignatory.reducer';
import modals from './modal.reducer';
import activities from './activities.reducer';
import resolutions from './resolutions.reducer';
import resolution from './resolution.reducer';
import templates from './templates.reducer';

export default {
  global: global.reducer,
  user: user.reducer,
  cosignatories: cosignatories.reducer,
  companies: companies.reducer,
  company: company.reducer,
  cosignatory: cosignatory.reducer,
  modals: modals.reducer,
  activities: activities.reducer,
  resolutions: resolutions.reducer,
  resolution: resolution.reducer,
  templates: templates.reducer,
};
