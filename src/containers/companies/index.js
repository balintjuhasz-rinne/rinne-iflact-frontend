import React, { useState, useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/router';

import CompaniesHeader from './header';
import Panel from './panel';
import CompaniesList from './companies-list';
import Pagination from '../../components/pagination';
import EmptyScreen from '../../components/empty-screen';
import CompaniesFilter from './companies-filter';
import PageLoader from '../../components/page-loader';
import DashboardWrapper from '../../layouts/dashboard-wrapper';
import LatestActivity from '../../components/latest-activity';

import { COMPANIES_PATH } from '../../constants/router.constants';
import { getAllActivitiesSelector } from '../../selectors/activities.selectors';
import { getCompaniesPageSelector } from '../../selectors/companies.selectors';
import { setAllActivities } from '../../actions/activities.actions';
import { setCompaniesPageList, setCompaniesCurrentPage } from '../../actions/companies.actions';
import { normalizeError } from '../../helpers/functions.helper';
import { showModal } from '../../actions/modal.actions';
import { PAGES_LIMIT, SORT_ORDER } from '../../constants/companies.constants';
import { ERROR_MODAL } from '../../constants/modal.constants';

import s from './companies.module.scss';

const statuses = [
  { title: 'Active' },
  { title: 'Closed' },
];

const Companies = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const { allActivities: activitiesList } = useSelector(getAllActivitiesSelector);
  const [activeStatus, setActiveStatus] = useState(0);
  const [isSortAZ, setSort] = useState(true);
  const [isLoading, setLoading] = useState(true);
  const [searchText, setSearchText] = useState('');
  const { currentPage, list, count } = useSelector(getCompaniesPageSelector);

  useEffect(() => {
    let { page } = router.query;
    if (page === undefined) page = 1;
    dispatch(setCompaniesCurrentPage(page));
  }, []);

  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        await dispatch(setCompaniesPageList(currentPage, searchText, isSortAZ ? SORT_ORDER.ASC : SORT_ORDER.DESC));
        await dispatch(setAllActivities());
      } catch (e) {
        const error = normalizeError(e);
        dispatch(showModal(ERROR_MODAL, { error }));
      } finally {
        setLoading(false);
      }
    })();
  }, [currentPage, activeStatus, searchText, isSortAZ]);

  const setPage = (page) => {
    dispatch(setCompaniesCurrentPage(page));
    router.push({
      pathname: COMPANIES_PATH.slice(0, -1),
      query: { page },
    });
  };

  const paginationCount = Math.ceil(count / PAGES_LIMIT);

  return (
    <>
      <CompaniesHeader />
      <div className={s.wrap}>
        <DashboardWrapper>
          {isLoading && <PageLoader />}
          <Panel
            isSortAZ={isSortAZ}
            setSort={setSort}
            setProgressStatus={setActiveStatus}
            activeStatus={activeStatus}
            statuses={statuses}
          />
          <CompaniesFilter changeSearchText={useCallback((text) => setSearchText(text), [])} />
          {!list.length ? <EmptyScreen text="Your companies will be displayed here." /> : <CompaniesList list={list} /> }
          {paginationCount > 1 && (
            <Pagination
              page={+currentPage}
              count={paginationCount}
              setPage={setPage}
            />
          )}
        </DashboardWrapper>
        <LatestActivity list={activitiesList} />
      </div>
    </>
  );
};

export default Companies;
