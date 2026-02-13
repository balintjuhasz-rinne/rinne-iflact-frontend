import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import TableHead from '../../../../components/table/table-head';
import TableHeadCell from '../../../../components/table/table-head-cell';
import { makeCosignatoryResolutionsSelector } from '../../../../selectors/cosignatory.selectors';
import { setResolutionsSortConfig } from '../../../../actions/cosignatory.actions';
import { RESOLUTIONS_SORT_FIELDS } from '../../../../constants/sort.constants';
import s from './table-header.module.scss';

const TableHeader = () => {
  const { resolutionsSortConfig: sortConfig } = useSelector(makeCosignatoryResolutionsSelector);
  const dispatch = useDispatch();

  const onSort = (field) => {
    const direction = (sortConfig.field === field) ? sortConfig.direction * -1 : 1;
    dispatch(setResolutionsSortConfig(field, direction));
  };

  return (
    <TableHead className={s.head}>
      <TableHeadCell
        alignment="center"
        onClick={() => onSort(RESOLUTIONS_SORT_FIELDS.ID)}
        isActiveUp={!!(sortConfig.field === RESOLUTIONS_SORT_FIELDS.ID && sortConfig.direction === 1)}
        isActiveDown={!!(sortConfig.field === RESOLUTIONS_SORT_FIELDS.ID && sortConfig.direction === -1)}
      >
        ID
      </TableHeadCell>
      <TableHeadCell
        onClick={() => onSort(RESOLUTIONS_SORT_FIELDS.NAME)}
        isActiveUp={!!(sortConfig.field === RESOLUTIONS_SORT_FIELDS.NAME && sortConfig.direction === 1)}
        isActiveDown={!!(sortConfig.field === RESOLUTIONS_SORT_FIELDS.NAME && sortConfig.direction === -1)}
      >
        Contract name
      </TableHeadCell>
      <TableHeadCell
        onClick={() => onSort(RESOLUTIONS_SORT_FIELDS.COMPANY)}
        isActiveUp={!!(sortConfig.field === RESOLUTIONS_SORT_FIELDS.COMPANY && sortConfig.direction === 1)}
        isActiveDown={!!(sortConfig.field === RESOLUTIONS_SORT_FIELDS.COMPANY && sortConfig.direction === -1)}
      >
        Company name
      </TableHeadCell>
      <TableHeadCell
        onClick={() => onSort(RESOLUTIONS_SORT_FIELDS.CREATED)}
        isActiveUp={!!(sortConfig.field === RESOLUTIONS_SORT_FIELDS.CREATED && sortConfig.direction === 1)}
        isActiveDown={!!(sortConfig.field === RESOLUTIONS_SORT_FIELDS.CREATED && sortConfig.direction === -1)}
      >
        Created by
      </TableHeadCell>
      <TableHeadCell isSortable={false} alignment="center">Status</TableHeadCell>
      <TableHeadCell
        onClick={() => onSort(RESOLUTIONS_SORT_FIELDS.START)}
        isActiveUp={!!(sortConfig.field === RESOLUTIONS_SORT_FIELDS.START && sortConfig.direction === 1)}
        isActiveDown={!!(sortConfig.field === RESOLUTIONS_SORT_FIELDS.START && sortConfig.direction === -1)}
      >
        Start date
      </TableHeadCell>
      <TableHeadCell
        onClick={() => onSort(RESOLUTIONS_SORT_FIELDS.END)}
        isActiveUp={!!(sortConfig.field === RESOLUTIONS_SORT_FIELDS.END && sortConfig.direction === 1)}
        isActiveDown={!!(sortConfig.field === RESOLUTIONS_SORT_FIELDS.END && sortConfig.direction === -1)}
      >
        End date
      </TableHeadCell>
      <TableHeadCell
        onClick={() => onSort(RESOLUTIONS_SORT_FIELDS.RESOLVE)}
        isActiveUp={!!(sortConfig.field === RESOLUTIONS_SORT_FIELDS.RESOLVE && sortConfig.direction === 1)}
        isActiveDown={!!(sortConfig.field === RESOLUTIONS_SORT_FIELDS.RESOLVE && sortConfig.direction === -1)}
      >
        Closed date
      </TableHeadCell>
    </TableHead>
  );
};

export default TableHeader;
