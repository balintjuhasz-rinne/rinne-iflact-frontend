import React from 'react';
import { useSelector, useDispatch } from 'react-redux';

import TableHead from '../../../../components/table/table-head';
import TableHeadCell from '../../../../components/table/table-head-cell';

import { makeSelectCosignatories } from '../../../../selectors/cosignatories.selectors';
import { setSortConfig } from '../../../../actions/cosignatories.actions';

import { USER_SORT_PARAM } from '../../../../constants/sort.constants';
import s from './table-header.module.scss';

const TableHeader = () => {
  const { sortConfig: { sortParam, sortOrder } } = useSelector(makeSelectCosignatories);

  const dispatch = useDispatch();

  const onSort = async (field) => {
    const direction = (sortParam === field)
      ? sortOrder * -1 : 1;
    await dispatch(setSortConfig({ sortParam: field, sortOrder: direction }));
  };
  return (
    <TableHead className={s.cosignatoriesTableHead}>
      <TableHeadCell isSortable={false} alignment="center">#</TableHeadCell>
      <TableHeadCell
        onClick={() => onSort(USER_SORT_PARAM.NAME)}
        isActiveUp={!!(sortParam === USER_SORT_PARAM.NAME && sortOrder === 1)}
        isActiveDown={!!(sortParam === USER_SORT_PARAM.NAME && sortOrder === -1)}
      >Name
      </TableHeadCell>
      <TableHeadCell
        onClick={() => onSort(USER_SORT_PARAM.COMPANY)}
        isActiveUp={!!(sortParam === USER_SORT_PARAM.COMPANY && sortOrder === 1)}
        isActiveDown={!!(sortParam === USER_SORT_PARAM.COMPANY && sortOrder === -1)}
      >
        Company
      </TableHeadCell>
      <TableHeadCell
        onClick={() => onSort(USER_SORT_PARAM.POSITION)}
        isActiveUp={!!(sortParam === USER_SORT_PARAM.POSITION && sortOrder === 1)}
        isActiveDown={!!(sortParam === USER_SORT_PARAM.POSITION && sortOrder === -1)}
      >
        Position
      </TableHeadCell>
      <TableHeadCell
        alignment="right"
        onClick={() => onSort(USER_SORT_PARAM.SHARES)}
        isActiveUp={!!(sortParam === USER_SORT_PARAM.SHARES && sortOrder === 1)}
        isActiveDown={!!(sortParam === USER_SORT_PARAM.SHARES && sortOrder === -1)}
      >
        Shares Owned
      </TableHeadCell>
      <TableHeadCell alignment="center" isSortable={false}>Veto power</TableHeadCell>
    </TableHead>
  );
};

export default TableHeader;
