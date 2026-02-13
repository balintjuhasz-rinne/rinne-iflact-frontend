import flactService from '../services/flact';
import cosignatoriesReducer from '../reducers/cosignatories.reducer';
import { SORT_DIRECTION } from '../constants/sort.constants';
import { rmEmptyFilterDataFields } from '../helpers/functions.helper';

const { actions: cosignatoriesActions } = cosignatoriesReducer;

export const setCosignatories = () => async (dispatch, getState) => {
  const state = getState();
  const {
    limit, filterConfig: filterConfigFromState, currentPage,
  } = state.cosignatories.toJS();
  const { sortParam, sortOrder } = getState().cosignatories.get('sortConfig');

  const filterConfig = rmEmptyFilterDataFields(filterConfigFromState);
  const {
    cosignatories, count,
  } = await flactService.cosignatories.getCosignatories({
    skip: limit * (currentPage - 1),
    limit,
    ...filterConfig,
    ...sortParam && {
      sortParam,
      sortOrder: SORT_DIRECTION[sortOrder],
    },
  });

  dispatch(cosignatoriesActions.setCosignatories({
    pageCount: Math.ceil(count / limit),
    list: cosignatories,
  }));
};

export const setCurrentPage = (currentPage = 1) => async (dispatch) => {
  dispatch(cosignatoriesActions.setCurrentPage(+currentPage));
};

export const setSortConfig = (sortConfig = {}) => async (dispatch) => {
  dispatch(cosignatoriesActions.setSortConfig(sortConfig));
};

export const setFilterConfig = (filterConfig = {}) => async (dispatch) => {
  dispatch(cosignatoriesActions.setFilterConfig(filterConfig));
};

export const clearFilterConfig = () => (dispatch) => {
  dispatch(cosignatoriesActions.clearFilterConfig());
};

export const getCosignatoriesEmails = async () => flactService.cosignatories.getCosignatoriesEmails();
