import flactService from '../services/flact';
import companiesReducer from '../reducers/companies.reducer';
import { PAGES_LIMIT } from '../constants/companies.constants';

const { actions: companiesActions } = companiesReducer;

// Set companies divided for pagination
export const setCompaniesPageList = (currentPage, search, sortOrder) => async (dispatch) => {
  const skip = PAGES_LIMIT * (currentPage - 1);
  const limit = PAGES_LIMIT;
  const { companies, count } = await flactService.companies.getCompanies(skip, limit, search, sortOrder);

  dispatch(companiesActions.setCompaniesPageList({ list: companies, count }));
};

export const setCompaniesList = () => async (dispatch) => {
  const { companies, count } = await flactService.companies.getCompanies(0, 0);
  dispatch(companiesActions.setCompaniesList({
    list: companies,
    count,
  }));
};

export const setCompaniesCurrentPage = (page) => (dispatch) => {
  dispatch(companiesActions.setCompaniesCurrentPage(page));
};

export const getAllCompaniesNameAndId = async () => flactService.companies.getAllCompaniesNameAndId();
