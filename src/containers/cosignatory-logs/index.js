import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import PageLoader from '../../components/page-loader';
import EmptyScreen from '../../components/empty-screen';
import TableHeader from './cosignatory-logs-table/table-header';
import TableList from './cosignatory-logs-table/table-list';
import { normalizeError } from '../../helpers/functions.helper';
import { setCosignatoryLogs, setCosignatoryLogsPage } from '../../actions/cosignatory.actions';
import { showModal } from '../../actions/modal.actions';
import { ERROR_MODAL } from '../../constants/modal.constants';
import { PAGE_LIMIT } from '../../constants/sort.constants';
import { getCosignatoryLogsSelector } from '../../selectors/cosignatory.selectors';
import Pagination from '../../components/pagination';
// import LogsFilter from '../../components/logs-filter';

const CosignatoryLogs = () => {
  const dispatch = useDispatch();

  const [isLoading, setLoading] = useState(false);
  const { list, page, registrationCompleted } = useSelector(getCosignatoryLogsSelector);
  const { query: { id } } = useRouter();

  const setPage = (pageNumber) => {
    dispatch(setCosignatoryLogsPage(pageNumber));
  };

  // const setFilters = (filters) => {
  //   dispatch(setCosignatoryLogs(id, filters));
  // };

  useEffect(() => {
    (async () => {

      try {
        setLoading(true);
        await dispatch(setCosignatoryLogs(id));
      } catch (e) {
        const error = normalizeError(e);
        dispatch(showModal(ERROR_MODAL, { error }));
        throw new Error(e);
      } finally {
        setLoading(false);
      }
    })();
  }, [registrationCompleted]);

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

export default CosignatoryLogs;
