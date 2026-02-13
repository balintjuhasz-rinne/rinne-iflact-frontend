import { useRouter } from 'next/router';
import React, { useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setAllActivities } from '../../actions/activities.actions';
import { showModal } from '../../actions/modal.actions';
import {
  clearFilterConfig,
  setCurrentPage,
  setFilterConfig,
  setResolutionIds,
  setResolutions,
  setSortConfig,
} from '../../actions/resolutions.actions';
import HideActivityButton from '../../components/buttons/hide-activity-button';
import Button from '../../components/buttons/primary-button';
import ShowActivityButton from '../../components/buttons/show-activity-button';
import Dimmer from '../../components/dimmer';
import EmptyFilter from '../../components/empty-filter';
import EmptyScreen from '../../components/empty-screen';
import LatestActivity from '../../components/latest-activity';
import PageLoader from '../../components/page-loader';
import Pagination from '../../components/pagination';
import ResolutionsList from '../../components/resolutions-list';
import Switcher from '../../components/switcher';
import { VIEW_VARIANTS } from '../../constants/global.constants';
import {
  CREATE_RESOLUTION_MODAL, ERROR_MODAL,
} from '../../constants/modal.constants';
import { RESOLUTIONS_PATH } from '../../constants/router.constants';
import { USER_ROLES } from '../../constants/user.constants';
import {
  isDefined, isFilterNotFound, isPageListEmpty, normalizeError,
} from '../../helpers/functions.helper';
import DashboardWrapper from '../../layouts/dashboard-wrapper';
import { getAllActivitiesSelector } from '../../selectors/activities.selectors';
import {
  getResolutionsView, makeResolutionsSelector,
} from '../../selectors/resolutions.selectors';
import { getUserRoleSelector } from '../../selectors/user.selectors';
import { getSwitcherOptions } from './get-switcher-options';
import s from './resolutions-base.module.scss';
import ResolutionsFilter from './resolutions-filter';
import ResolutionsHeader from './resolutions-header';
import ResolutionsTable from './resolutions-table';

const Resolutions = () => {
  const router = useRouter();
  const dispatch = useDispatch();

  const showCreateResolutionModal = () => {
    dispatch(showModal(CREATE_RESOLUTION_MODAL));
  };

  const {
    list, sortConfig, filterConfig, currentPage, pageCount,
  } = useSelector(makeResolutionsSelector);

  const { role } = useSelector(getUserRoleSelector);
  const { allActivities: activitiesList } = useSelector(getAllActivitiesSelector);
  const resolutionsView = useSelector(getResolutionsView);
  const [isLoading, setLoading] = useState(false);
  const [isQueryFiltersSetted, setIsQueryFiltersSetted] = useState(false);
  const [isActivityShow, setIsActivityShow] = useState(false);

  const isShowEmptyScreen = useMemo(() => isPageListEmpty(list, filterConfig), [list, filterConfig]);
  const isShowEmptyFilter = useMemo(() => isFilterNotFound(list, filterConfig), [list, filterConfig]);
  const isTableView = resolutionsView === VIEW_VARIANTS.TABLE;

  useEffect(() => {
    const {
      page, sortOrder, sortParam, types, isVote, ...filters
    } = router.query;

    dispatch(setCurrentPage(page));
    dispatch(setFilterConfig({
      ...filters,
      ...(types && { types: typeof types === 'string' ? [types] : types }),
      ...(isDefined(isVote) && { isVote: isVote === 'true' }),
    }));
    dispatch(setSortConfig({
      ...(sortParam && { sortParam }),
      ...(sortParam && { sortOrder: +sortOrder }),
    }));
    setIsQueryFiltersSetted(true);
  }, [router.asPath]);

  useEffect(() => {
    if (!isQueryFiltersSetted) {
      return;
    }
    router.push({
      pathname: RESOLUTIONS_PATH.slice(0, -1),
      query: {
        page: currentPage,
        ...filterConfig,
        ...sortConfig,
      },
    });
    (async () => {
      try {
        setLoading(true);
        await dispatch(setResolutions());
      } catch (err) {
        const error = normalizeError(err);
        dispatch(showModal(ERROR_MODAL, { error }));
      } finally {
        setLoading(false);
      }
    })();
  }, [
    currentPage,
    // subscribe to filters
    filterConfig.resolutionId,
    filterConfig.searchString,
    filterConfig.companyId,
    filterConfig.status,
    filterConfig.isVote,
    JSON.stringify(filterConfig.types),
    // subscribe to dates filters
    filterConfig.startDateFrom,
    filterConfig.startDateTo,
    filterConfig.resolveDateFrom,
    filterConfig.resolveDateTo,
    filterConfig.endDateFrom,
    filterConfig.endDateTo,
    // subscribe to sorting
    sortConfig.sortParam,
    sortConfig.sortOrder,
  ]);

  useEffect(() => () => {
    dispatch(clearFilterConfig());
  }, []);

  useEffect(() => {
    (async () => {
      try {
        await dispatch(setResolutionIds());
        await dispatch(setAllActivities());
      } catch (e) {
        const error = normalizeError(e);
        dispatch(showModal(ERROR_MODAL, { error }));
      }
    })();
  }, []);

  const setPage = (newPage) => {
    dispatch(setCurrentPage(newPage));
  };

  const switcherOptions = getSwitcherOptions(filterConfig.status);

  const changeStatus = (option) => {
    dispatch(setCurrentPage());

    dispatch(setFilterConfig({
      ...filterConfig,
      status: option.id,
    }));

    dispatch(setSortConfig({
      ...sortConfig.sortParam && { sortParam: sortConfig.sortParam },
      ...sortConfig.sortOrder && { sortOrder: sortConfig.sortOrder },
    }));

  };

  return (
    <>
      {isLoading && <PageLoader />}
      {isShowEmptyScreen
        ? (
          <EmptyScreen text="No resolutions">
            {role !== USER_ROLES.CO_SIGNATORY && (
              <Button
                value="Create new financing"
                theme="orange"
                onClick={showCreateResolutionModal}
              />
            )}
          </EmptyScreen>
        ) : (
          <>
            <ResolutionsHeader />
            <div className={s.wrap}>
              <DashboardWrapper>
                <div className={s.wrap}>
                  <Switcher setActive={changeStatus} options={switcherOptions} />
                  <ShowActivityButton onClick={() => setIsActivityShow(true)} />
                </div>
                <ResolutionsFilter />
                {isShowEmptyFilter
                  ? <EmptyFilter className={s.emptyFilter} />
                  : isTableView ? <ResolutionsTable /> : <ResolutionsList list={list} />}
                <Pagination
                  page={+currentPage}
                  count={pageCount}
                  setPage={setPage}
                />
              </DashboardWrapper>
              {isActivityShow && (
                <Dimmer onClick={() => setIsActivityShow(false)} />
              )}
              {isActivityShow && (
                <div className={s.activity}>
                  <LatestActivity
                    list={activitiesList}
                    hide={<HideActivityButton onClick={() => setIsActivityShow(false)} />}
                  />
                </div>
              )}
            </div>
          </>
        )}
    </>
  );
};

export default Resolutions;
