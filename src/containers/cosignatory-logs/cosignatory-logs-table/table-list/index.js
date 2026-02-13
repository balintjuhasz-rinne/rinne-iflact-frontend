import cn from 'classnames';
import { format } from 'date-fns';
import PropTypes from 'prop-types';
import React from 'react';
import AvatarIcon from '../../../../components/avatar-icon';
import UserLogPreview from '../../../../components/user-log-preview';
import TableCell from '../../../../components/table/table-cell';
import TableRow from '../../../../components/table/table-row';
import s from './table-list.module.scss';
import { logNamesCosignatory } from '../../../../constants/other.constants';

const LogsTableList = ({ list }) => (
  <div className={s.cosignatoriesList}>
    {list.map(({
      id,
      createdAt,
      author: { name, surname, avatar },
      company,
      parameter,
      oldValue,
      newValue,
      relatedUser,
    }) => (
      <TableRow className={s.row} key={id}>
        <TableCell className={s.gray}>
          {format(new Date(createdAt), 'dd MMMM yyyy, hh:mm a')}
        </TableCell>
        <TableCell className={s.cell}>
          <AvatarIcon avatar={avatar?.path} name={name} surname={surname} />
          <span className={s.name}>{`${name } ${ surname ?? ''}`}</span>
        </TableCell>
        <TableCell className={s.gray}>
          {company && `${company.name}: `}{parameter}
        </TableCell>
        <TableCell className={cn(s.cell, s.value)}>
          {(relatedUser && parameter === logNamesCosignatory.deactivation)
            ? <UserLogPreview relatedUser={relatedUser} />
            : oldValue}
        </TableCell>
        <TableCell className={cn(s.cell, s.value)}>
          {(relatedUser && parameter === logNamesCosignatory.invitation)
            ? <UserLogPreview relatedUser={relatedUser} />
            : newValue}
        </TableCell>
      </TableRow>
    ))}
  </div>
);

LogsTableList.propTypes = {
  list: PropTypes.array.isRequired,
};

export default LogsTableList;
