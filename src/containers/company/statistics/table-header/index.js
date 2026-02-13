import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import TableHead from '../../../../components/table/table-head';
import { getCompanyResolutionsSelector } from '../../../../selectors/company.selectors';
import { setCompanyResolutionsSort } from '../../../../actions/company.actions';
import { STATISTICS_SORT_FIELDS } from '../../../../constants/sort.constants';
import TableHeadCell from '../../../../components/table/table-head-cell';
import s from './table-header.module.scss';

const CompanyResolutionsThead = () => {
  const { sortConfig } = useSelector(getCompanyResolutionsSelector);
  const dispatch = useDispatch();

  const onSort = (field) => {
    const direction = (sortConfig.field === field) ? sortConfig.direction * -1 : 1;
    dispatch(setCompanyResolutionsSort(field, direction));
  };

  useEffect(() => {
    dispatch(setCompanyResolutionsSort(STATISTICS_SORT_FIELDS.ID, -1));
  }, []);

  return (
    <TableHead className={s.thead}>
      <TableHeadCell
        onClick={() => onSort(STATISTICS_SORT_FIELDS.ID)}
        isActiveUp={!!(sortConfig.field === STATISTICS_SORT_FIELDS.ID && sortConfig.direction === 1)}
        isActiveDown={!!(sortConfig.field === STATISTICS_SORT_FIELDS.ID && sortConfig.direction === -1)}
      >ID
      </TableHeadCell>
      <TableHeadCell
        onClick={() => onSort(STATISTICS_SORT_FIELDS.NAME)}
        isActiveUp={!!(sortConfig.field === STATISTICS_SORT_FIELDS.NAME && sortConfig.direction === 1)}
        isActiveDown={!!(sortConfig.field === STATISTICS_SORT_FIELDS.NAME && sortConfig.direction === -1)}
      >Name
      </TableHeadCell>
      <TableHeadCell
        onClick={() => onSort(STATISTICS_SORT_FIELDS.CREATION_DATE)}
        isActiveUp={!!(sortConfig.field === STATISTICS_SORT_FIELDS.START_DATE && sortConfig.direction === 1)}
        isActiveDown={!!(sortConfig.field === STATISTICS_SORT_FIELDS.START_DATE && sortConfig.direction === -1)}
      >
        Creation Date
      </TableHeadCell>
      <TableHeadCell
        onClick={() => onSort(STATISTICS_SORT_FIELDS.START_DATE)}
        isActiveUp={!!(sortConfig.field === STATISTICS_SORT_FIELDS.START_DATE && sortConfig.direction === 1)}
        isActiveDown={!!(sortConfig.field === STATISTICS_SORT_FIELDS.START_DATE && sortConfig.direction === -1)}
      >
        Contract Date
      </TableHeadCell>
      <TableHeadCell
        onClick={() => onSort(STATISTICS_SORT_FIELDS.END_DATE)}
        isActiveUp={!!(sortConfig.field === STATISTICS_SORT_FIELDS.START_DATE && sortConfig.direction === 1)}
        isActiveDown={!!(sortConfig.field === STATISTICS_SORT_FIELDS.START_DATE && sortConfig.direction === -1)}
      >
        Deferred Payment date
      </TableHeadCell>
      <TableHeadCell
        onClick={() => onSort(STATISTICS_SORT_FIELDS.RESOLVE_DATE)}
        isActiveUp={!!(sortConfig.field === STATISTICS_SORT_FIELDS.END_DATE && sortConfig.direction === 1)}
        isActiveDown={!!(sortConfig.field === STATISTICS_SORT_FIELDS.END_DATE && sortConfig.direction === -1)}
      >
        Date of approval/Closure
      </TableHeadCell>
      <TableHeadCell
        onClick={() => onSort(STATISTICS_SORT_FIELDS.TYPE)}
        isActiveUp={!!(sortConfig.field === STATISTICS_SORT_FIELDS.TYPE && sortConfig.direction === 1)}
        isActiveDown={!!(sortConfig.field === STATISTICS_SORT_FIELDS.TYPE && sortConfig.direction === -1)}
      >Contract type
      </TableHeadCell>
      <TableHeadCell isSortable={false}>
        Status
      </TableHeadCell>
      <TableHeadCell alignment="right" isSortable={false} />
    </TableHead>
  );
};

export default CompanyResolutionsThead;
