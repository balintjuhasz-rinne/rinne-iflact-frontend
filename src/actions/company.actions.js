import flactService from '../services/flact';
import companyReducer from '../reducers/company.reducer';
import { getResolutions } from './resolutions.actions';
import { setCompaniesPageList } from './companies.actions';
import { USER_ROLES } from '../constants/user.constants';
import { logNamesCompany } from '../constants/other.constants';
import { formatLogValue, rmEmptyFilterDataFields } from '../helpers/functions.helper';

const { actions: companyActions } = companyReducer;

export const setCompanyResolutionsFilter = (filter) => (dispatch) => {
  dispatch(companyActions.setCompanyResolutionsFilter(filter));
};

export const setCompanyResolutionsSort = (field, direction) => async (dispatch) => {
  dispatch(companyActions.setCompanyResolutionsSort({ field, direction }));
};

export const setCompanyLogsSort = (field, direction) => async (dispatch) => {
  dispatch(companyActions.setCompanyLogsSort({ field, direction }));
};

export const getUsers = async (companyId) => {
  const { users } = await flactService.companies.getUsers(0, 30, companyId);
  return users;
};

export const setCompany = (companyId, company) => async (dispatch) => {
  const info = company || await flactService.companies.getCompany(companyId);
  const { users } = await flactService.companies.getUsers(companyId);

  const { coWorkers, coSignatories } = users.reduce((acc, current) => {
    if (current.role === USER_ROLES.CO_SEC) {
      acc.coWorkers.push(current);
    } else {
      acc.coSignatories.push(current);
    }
    return acc;
  }, { coWorkers: [], coSignatories: [] });

  dispatch(companyActions.setCompany({ info, coSignatories, coWorkers }));
};

export const setCompanyResolutions = (companyId) => async (dispatch, getState) => {
  const filterConfigFromState = getState().company.getIn(['resolutions', 'filterConfig']);
  const filterConfig = rmEmptyFilterDataFields(filterConfigFromState);
  const { resolutionsInfo } = await getResolutions({ companyId, ...filterConfig });
  dispatch(companyActions.setCompanyResolutions({ resolutions: resolutionsInfo.map(({ resolution }) => resolution) }));
};

export const setCompanyLogs = (companyId, filters) => async (dispatch) => {
  const { logs } = await flactService.companies.getLogs(companyId, filters);
  const formattedLogs = logs.map((log) => ({
    ...log,
    parameter: logNamesCompany[log.parameter],
    oldValue: formatLogValue(log.parameter, log.oldValue),
    newValue: formatLogValue(log.parameter, log.newValue),
  }));
  dispatch(companyActions.setCompanyLogs(formattedLogs));
};

export const setCompanyLogsPage = (pageNumber) => async (dispatch) => {
  dispatch(companyActions.setCompanyLogsPage(pageNumber));
};

export const createCompany = (company, currentPage) => async (dispatch) => {
  company.profile = company.profile ? company.profile : null;
  company.website = company.website ? company.website : null;
  company.comment = company.comment ? company.comment : null;
  await flactService.companies.createCompany(company);
  await dispatch(setCompaniesPageList(currentPage));
};

export const updateCompany = (company) => async (dispatch) => {
  company.profile = company.profile ? company.profile : null;
  company.website = company.website ? company.website : null;
  company.comment = company.comment ? company.comment : null;
  await flactService.companies.updateCompany(company.id, company);
  await dispatch(setCompany(company.id));
};

export const deleteCompany = (companyId) => async (dispatch) => {
  await flactService.companies.deleteCompany(companyId);
  dispatch(setCompaniesPageList(1));
};
