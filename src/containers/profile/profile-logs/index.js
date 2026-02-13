import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import PageLoader from '../../../components/page-loader';
import EmptyScreen from '../../../components/empty-screen';
import TableHeader from './logs-table/table-header';
import TableList from './logs-table/table-list';
import { normalizeError } from '../../../helpers/functions.helper';
import { setUserLogs, setUserLogsPage } from '../../../actions/user.actions';
import { showModal } from '../../../actions/modal.actions';
import { ERROR_MODAL } from '../../../constants/modal.constants';
import { PAGE_LIMIT } from '../../../constants/sort.constants';
import { getUserLogsSelector, getUserSelector } from '../../../selectors/user.selectors';
// import LogsFilter from '../../../components/logs-filter';
import Pagination from '../../../components/pagination';

const ProfileLogs = () => {
  const dispatch = useDispatch();

  const [isLoading, setLoading] = useState(false);
  const { list, page } = useSelector(getUserLogsSelector);
  const { user: { id } } = useSelector(getUserSelector);

  const setPage = (pageNumber) => {
    dispatch(setUserLogsPage(pageNumber));
  };

  // const setFilters = (filters) => {
  //   dispatch(setUserLogs(id, filters));
  // };

  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        await dispatch(setUserLogs(id));
      } catch (e) {
        const error = normalizeError(e);
        dispatch(showModal(ERROR_MODAL, { error }));
        throw new Error(e);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  return (
    <>
      {isLoading && <PageLoader />}
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
    </>
  );
};

export default ProfileLogs;
