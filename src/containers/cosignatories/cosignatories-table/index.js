import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import TableHeader from './table-header';

import TableList from './table-list';
import Pagination from '../../../components/pagination';
import { makeSelectCosignatories } from '../../../selectors/cosignatories.selectors';
import { setCurrentPage } from '../../../actions/cosignatories.actions';

const CosignatoriesTable = () => {
  const dispatch = useDispatch();
  const { currentPage, pageCount } = useSelector(makeSelectCosignatories);

  const setPage = (page) => {
    dispatch(setCurrentPage(page));
  };

  return (
    <>
      <TableHeader />
      <TableList />
      <Pagination
        page={+currentPage}
        count={pageCount}
        setPage={setPage}
      />
    </>
  );
};

export default CosignatoriesTable;
