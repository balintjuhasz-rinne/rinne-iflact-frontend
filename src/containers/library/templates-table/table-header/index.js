import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import TableHead from '../../../../components/table/table-head';
import TableHeadCell from '../../../../components/table/table-head-cell';

import { makeTemplatesSelector } from '../../../../selectors/templates.selectors';
import { setSortConfig } from '../../../../actions/templates.actions';
import { TEMPLATES_SORT_FIELDS } from '../../../../constants/sort.constants';

import s from './table-header.module.scss';

const TemplatesTableHeader = () => {
  const dispatch = useDispatch();
  const { sortConfig } = useSelector(makeTemplatesSelector);

  const onSort = (field) => {
    const direction = (sortConfig.field === field) ? sortConfig.direction * -1 : 1;
    dispatch(setSortConfig(field, direction));
  };

  return (
    <TableHead className={s.thead}>
      <TableHeadCell
        onClick={() => onSort(TEMPLATES_SORT_FIELDS.NAME)}
        isActiveUp={!!(sortConfig.field === TEMPLATES_SORT_FIELDS.NAME && sortConfig.direction === 1)}
        isActiveDown={!!(sortConfig.field === TEMPLATES_SORT_FIELDS.NAME && sortConfig.direction === -1)}
      >Name
      </TableHeadCell>
      <TableHeadCell
        onClick={() => onSort(TEMPLATES_SORT_FIELDS.CREATED)}
        isActiveUp={!!(sortConfig.field === TEMPLATES_SORT_FIELDS.CREATED && sortConfig.direction === 1)}
        isActiveDown={!!(sortConfig.field === TEMPLATES_SORT_FIELDS.CREATED && sortConfig.direction === -1)}
      >Creation Date
      </TableHeadCell>
      <TableHeadCell alignment="right" isSortable={false} />
    </TableHead>
  );
};

export default TemplatesTableHeader;
