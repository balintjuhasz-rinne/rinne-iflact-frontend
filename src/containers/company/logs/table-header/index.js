import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import TableHead from '../../../../components/table/table-head';
import { getCompanyLogsSelector } from '../../../../selectors/company.selectors';
import { setCompanyLogsSort } from '../../../../actions/company.actions';
import { LOGS_SORT_FIELDS } from '../../../../constants/sort.constants';
import TableHeadCell from '../../../../components/table/table-head-cell';
import s from './table-header.module.scss';

const CompanyLogsThead = () => {
  const { sortConfig } = useSelector(getCompanyLogsSelector);
  const dispatch = useDispatch();

  const onSort = (field) => {
    const direction = (sortConfig.field === field) ? sortConfig.direction * -1 : 1;
    dispatch(setCompanyLogsSort(field, direction));
  };

  useEffect(() => {
    dispatch(setCompanyLogsSort(LOGS_SORT_FIELDS.DATE, -1));
  }, []);

  return (
    <TableHead className={s.thead}>
      <TableHeadCell
        onClick={() => onSort(LOGS_SORT_FIELDS.DATE)}
        isActiveUp={!!(sortConfig.field === LOGS_SORT_FIELDS.DATE && sortConfig.direction === 1)}
        isActiveDown={!!(sortConfig.field === LOGS_SORT_FIELDS.DATE && sortConfig.direction === -1)}
      >Date & Time
      </TableHeadCell>
      <TableHeadCell
        onClick={() => onSort(LOGS_SORT_FIELDS.NAME)}
        isActiveUp={!!(sortConfig.field === LOGS_SORT_FIELDS.NAME && sortConfig.direction === 1)}
        isActiveDown={!!(sortConfig.field === LOGS_SORT_FIELDS.NAME && sortConfig.direction === -1)}
      >Username
      </TableHeadCell>
      <TableHeadCell
        onClick={() => onSort(LOGS_SORT_FIELDS.PARAMETR)}
        isActiveUp={!!(sortConfig.field === LOGS_SORT_FIELDS.PARAMETR && sortConfig.direction === 1)}
        isActiveDown={!!(sortConfig.field === LOGS_SORT_FIELDS.PARAMETR && sortConfig.direction === -1)}
      >
        Parameter
      </TableHeadCell>
      <TableHeadCell
        isSortable={false}
      >
        Old value
      </TableHeadCell>
      <TableHeadCell
        isSortable={false}
      >
        New value
      </TableHeadCell>
      <TableHeadCell
        isSortable={false}
      >
        Action
      </TableHeadCell>
    </TableHead>
  );
};

export default CompanyLogsThead;
