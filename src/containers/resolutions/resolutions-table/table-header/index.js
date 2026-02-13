import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import TableHead from '../../../../components/table/table-head';
import TableHeadCell from '../../../../components/table/table-head-cell';
import { makeResolutionsSelector } from '../../../../selectors/resolutions.selectors';
import { setSortConfig } from '../../../../actions/resolutions.actions';
import { RESOLUTIONS_SORT_FIELDS } from '../../../../constants/sort.constants';
import s from './table-header.module.scss';

const TableHeader = () => {
  const { sortConfig: { sortParam, sortOrder } } = useSelector(makeResolutionsSelector);
  const dispatch = useDispatch();

  const onSort = async (field) => {
    const direction = (sortParam === field)
      ? sortOrder * -1 : 1;
    await dispatch(setSortConfig({ sortParam: field, sortOrder: direction }));
  };

  return (
    <TableHead className={s.head}>
      <TableHeadCell
        alignment="center"
        onClick={() => onSort(RESOLUTIONS_SORT_FIELDS.ID)}
        isActiveUp={!!(sortParam === RESOLUTIONS_SORT_FIELDS.ID && sortOrder === 1)}
        isActiveDown={!!(sortParam === RESOLUTIONS_SORT_FIELDS.ID && sortOrder === -1)}
      >
        ID
      </TableHeadCell>
      <TableHeadCell
        onClick={() => onSort(RESOLUTIONS_SORT_FIELDS.NAME)}
        isActiveUp={!!(sortParam === RESOLUTIONS_SORT_FIELDS.NAME && sortOrder === 1)}
        isActiveDown={!!(sortParam === RESOLUTIONS_SORT_FIELDS.NAME && sortOrder === -1)}
      >
        Contract name
      </TableHeadCell>
      <TableHeadCell isSortable={false}>
        {/*
        onClick={() => onSort(RESOLUTIONS_SORT_FIELDS.COMPANY)}
        isActiveUp={!!(sortParam === RESOLUTIONS_SORT_FIELDS.COMPANY && sortOrder === 1)}
        isActiveDown={!!(sortParam === RESOLUTIONS_SORT_FIELDS.COMPANY && sortOrder === -1)}
        */}
        Company name
      </TableHeadCell>
      <TableHeadCell isSortable={false}>
        {/* onClick={() => onSort(RESOLUTIONS_SORT_FIELDS.CREATED)}
        isActiveUp={!!(sortParam === RESOLUTIONS_SORT_FIELDS.CREATED && sortOrder === 1)}
        isActiveDown={!!(sortParam === RESOLUTIONS_SORT_FIELDS.CREATED && sortOrder === -1)} */}
        Created by
      </TableHeadCell>
      <TableHeadCell isSortable={false} alignment="center">Status</TableHeadCell>
      <TableHeadCell
        onClick={() => onSort(RESOLUTIONS_SORT_FIELDS.START)}
        isActiveUp={!!(sortParam === RESOLUTIONS_SORT_FIELDS.START && sortOrder === 1)}
        isActiveDown={!!(sortParam === RESOLUTIONS_SORT_FIELDS.START && sortOrder === -1)}
      >
        Start date
      </TableHeadCell>
      <TableHeadCell
        onClick={() => onSort(RESOLUTIONS_SORT_FIELDS.END)}
        isActiveUp={!!(sortParam === RESOLUTIONS_SORT_FIELDS.END && sortOrder === 1)}
        isActiveDown={!!(sortParam === RESOLUTIONS_SORT_FIELDS.END && sortOrder === -1)}
      >
        End date
      </TableHeadCell>
      <TableHeadCell
        onClick={() => onSort(RESOLUTIONS_SORT_FIELDS.RESOLVE)}
        isActiveUp={!!(sortParam === RESOLUTIONS_SORT_FIELDS.RESOLVE && sortOrder === 1)}
        isActiveDown={!!(sortParam === RESOLUTIONS_SORT_FIELDS.RESOLVE && sortOrder === -1)}
      >
        Closed date
      </TableHeadCell>
    </TableHead>
  );
};

export default TableHeader;
