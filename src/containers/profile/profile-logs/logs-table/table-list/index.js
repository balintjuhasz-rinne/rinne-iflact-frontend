import React from 'react';
import PropTypes from 'prop-types';
import { format } from 'date-fns';
import TableRow from '../../../../../components/table/table-row';
import TableCell from '../../../../../components/table/table-cell';
import AvatarIcon from '../../../../../components/avatar-icon';
import UserLogPreview from '../../../../../components/user-log-preview';
import { logNamesProfile } from '../../../../../constants/other.constants';

import s from './table-list.module.scss';

const LogsTableList = ({ list }) => (
  <div className={s.cosignatoriesList}>
    {list.map(({
      id,
      createdAt,
      author: { name, surname, avatar },
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
          {parameter}
        </TableCell>
        <TableCell className={s.cell}>
          {(relatedUser && parameter === logNamesProfile.deactivation)
            ? <UserLogPreview relatedUser={relatedUser} />
            : oldValue}
        </TableCell>
        <TableCell className={s.cell}>
          {(relatedUser && parameter === logNamesProfile.invitation)
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
