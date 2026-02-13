import flactService from '../services/flact';
import resoutionsReducer from '../reducers/resolutions.reducer';
import { VIEW_LOCALSTORAGE_PARAM_NAME } from '../constants/global.constants';
import { SORT_DIRECTION } from '../constants/sort.constants';
import { rmEmptyFilterDataFields } from '../helpers/functions.helper';
import { RESOLUTIONS_PAGE_LIMIT } from '../constants/resolution.constants';

const { actions: resolutionsActions } = resoutionsReducer;

export const getResolutions = async (filters) => flactService.resolutions.getResolutions(filters);

export const setResolutions = () => async (dispatch, getState) => {
  const page = getState().resolutions.get('currentPage');

  const skip = RESOLUTIONS_PAGE_LIMIT * (page - 1);
  const filterConfigFromState = getState().resolutions.get('filterConfig');
  const { sortParam, sortOrder } = getState().resolutions.get('sortConfig');
  const filterConfig = rmEmptyFilterDataFields(filterConfigFromState);

  const { resolutionsInfo, count } = await getResolutions({
    ...filterConfig,
    ...sortParam && {
      sortParam,
      sortOrder: SORT_DIRECTION[sortOrder],
    },
    skip,
    limit: RESOLUTIONS_PAGE_LIMIT,
  });
  await dispatch(resolutionsActions.setResolutions({
    list: resolutionsInfo,
    pageCount: Math.ceil(count / RESOLUTIONS_PAGE_LIMIT),
  }));
};

export const setResolutionIds = () => async (dispatch) => {
  const ids = await flactService.resolutions.getResolutionIds();
  await dispatch(resolutionsActions.setResolutionsIds(ids));
};

export const setCurrentPage = (currentPage = 1) => async (dispatch) => {
  dispatch(resolutionsActions.setCurrentPage(+currentPage));
};

export const setFilterConfig = (filterConfig = {}) => (dispatch) => {
  dispatch(resolutionsActions.setFilterConfig(filterConfig));
};

export const clearFilterConfig = () => (dispatch) => {
  dispatch(resolutionsActions.clearFilterConfig());
};

export const setSortConfig = (sortConfig = {}) => async (dispatch) => {
  dispatch(resolutionsActions.setSortConfig(sortConfig));
};

export const prepareNewResolution = (data) => async (dispatch) => {
  dispatch(resolutionsActions.prepareNewResolution(data));
};

export const setResolutionsView = (view) => async (dispatch) => {
  localStorage.setItem(VIEW_LOCALSTORAGE_PARAM_NAME, view);
  dispatch(resolutionsActions.setResolutionsView(view));
};

export const createResolution = (data) => async (dispatch) => {
  await flactService.resolutions.createResolution(data);
  dispatch(resolutionsActions.clearNewResolution());
  dispatch(setResolutions());
};
