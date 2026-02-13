import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import TableHead from '../../../../components/table/table-head';
import TableHeadCell from '../../../../components/table/table-head-cell';

import { makeCosignatoryMessagesSelector } from '../../../../selectors/cosignatory.selectors';
import { setMessagesSortConfig } from '../../../../actions/cosignatory.actions';
import { COSIGNATORY_MESSAGES_SORT_FIELDS } from '../../../../constants/sort.constants';

import s from './table-head.module.scss';

const TableHeader = () => {
  const dispatch = useDispatch();
  const { messagesSortConfig } = useSelector(makeCosignatoryMessagesSelector);

  const onSort = (field) => {
    const direction = (messagesSortConfig.field === field) ? messagesSortConfig.direction * -1 : 1;
    dispatch(setMessagesSortConfig(field, direction));
  };

  return (
    <TableHead className={s.wrap}>
      <TableHeadCell
        onClick={() => onSort(COSIGNATORY_MESSAGES_SORT_FIELDS.DATE)}
        isActiveUp={!!(messagesSortConfig.field === COSIGNATORY_MESSAGES_SORT_FIELDS.DATE && messagesSortConfig.direction === 1)}
        isActiveDown={!!(messagesSortConfig.field === COSIGNATORY_MESSAGES_SORT_FIELDS.DATE && messagesSortConfig.direction === -1)}
      >Date & Time
      </TableHeadCell>
      <TableHeadCell isSortable={false}>Message</TableHeadCell>
      <TableHeadCell isSortable={false}>Delivery</TableHeadCell>
      <TableHeadCell
        onClick={() => onSort(COSIGNATORY_MESSAGES_SORT_FIELDS.TYPE)}
        isActiveUp={!!(messagesSortConfig.field === COSIGNATORY_MESSAGES_SORT_FIELDS.TYPE && messagesSortConfig.direction === 1)}
        isActiveDown={!!(messagesSortConfig.field === COSIGNATORY_MESSAGES_SORT_FIELDS.TYPE && messagesSortConfig.direction === -1)}
      >Type
      </TableHeadCell>
      <TableHeadCell className={s.action} isSortable={false}>Action</TableHeadCell>
    </TableHead>
  );
};

TableHead.propTypes = {};

export default TableHeader;
