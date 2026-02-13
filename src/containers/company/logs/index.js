import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import { useDispatch, useSelector } from 'react-redux';

import Panel from '../panel';
import TableHeader from './table-header';
import TableList from './table-list';
import Header from '../header';
import DashboardWrapper from '../../../layouts/dashboard-wrapper';
import EmptyScreen from '../../../components/empty-screen';
import PageLoader from '../../../components/page-loader';
import Pagination from '../../../components/pagination';

import {
  setCompanyLogs,
  setCompanyLogsPage,
  setCompany,
} from '../../../actions/company.actions';
import { showModal } from '../../../actions/modal.actions';
import { getCompanySelector, getCompanyLogsSelector } from '../../../selectors/company.selectors';
import { normalizeError } from '../../../helpers/functions.helper';
import { ERROR_MODAL } from '../../../constants/modal.constants';
import { PAGE_LIMIT } from '../../../constants/sort.constants';
// import LogsFilter from '../../../components/logs-filter';

const Logs = ({ companyId }) => {
  const dispatch = useDispatch();
  const [isLoading, setLoading] = useState(false);
  const { info } = useSelector(getCompanySelector);
  const { list, page } = useSelector(getCompanyLogsSelector);

  const setPage = (pageNumber) => {
    dispatch(setCompanyLogsPage(pageNumber));
  };

  // const setFilters = (filters) => {
  //   dispatch(setCompanyLogs(companyId, filters));
  // };

  useEffect(() => {
    (async () => {
      try {
        await dispatch(setCompany(companyId));
        await dispatch(setCompanyLogs(companyId));
      } catch (err) {
        const error = normalizeError(err);
        dispatch(showModal(ERROR_MODAL, { error }));
      } finally { setLoading(false); }
    })();
  }, []);

  return (
    <>
      {isLoading && <PageLoader />}
      <Header title={info.name} companyId={+companyId} />
      <DashboardWrapper>
        <Panel company={companyId} active="logs" />
        {/* TODO: Back in next versions */}
        {/* <LogsFilter setLogsFilters={setFilters} /> */}
        {list.length > 0 ? (
          <>
            <TableHeader />
            <TableList list={list.slice((page - 1) * PAGE_LIMIT, PAGE_LIMIT * page)} />
          </>
        ) : (
          <EmptyScreen text="Logs list is empty" />
        )}
        {list.length > PAGE_LIMIT
          && (
            <Pagination
              page={page}
              count={Math.ceil(list.length / PAGE_LIMIT)}
              setPage={(count) => setPage(count)}
            />
          )}
      </DashboardWrapper>
    </>
  );
};

Logs.propTypes = {
  companyId: PropTypes.string.isRequired,
};

export default Logs;
