import React from 'react';
import cn from 'classnames';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { getUserIdSelector, getUserRoleSelector } from '../../selectors/user.selectors';
import { IC_ALERT } from '../../constants/image.constants';
import Link from '../custom-link';
import TableRow from '../table/table-row';
import TableCell from '../table/table-cell';
import StatusLabels from '../status-labels';
import { RESOLUTION_PATH, RESOLUTION } from '../../constants/router.constants';
import { createDynamicPath } from '../../helpers/url.helpers';
import { isVoted } from '../../helpers/resolutions.helpers';
import s from './table-list.module.scss';
import { formatTimeToTimezone } from '../../helpers/functions.helper';

const TableList = ({ list }) => {

  const userId = useSelector(getUserIdSelector);
  const { role } = useSelector(getUserRoleSelector);

  return (
    <div>
      {list.map(({
        resolution: {
          id,
          name,
          company,
          cosec,
          emergency,
          status,
          votingStartDate,
          votingEndDate,
          resolveDate,
        },
        voting: { cosignatories },
      }) => (
        <Link
          href={RESOLUTION_PATH}
          as={createDynamicPath(RESOLUTION, id)}
          className={s.link}
          key={id}
        >
          <TableRow className={cn(s.item, { [s.voted]: isVoted(cosignatories, userId, role) })}>
            <TableCell className={s.itemId} alignment="center">{id}</TableCell>
            <TableCell className={s.name}>
              {emergency && <img className={s.icon} src={IC_ALERT} alt="alert" />}
              {name}
            </TableCell>
            <TableCell className={s.smText}>{company?.name}</TableCell>
            <TableCell className={s.smText}>{cosec?.name} {cosec?.surname ?? ''}</TableCell>
            <TableCell alignment="center">
              <StatusLabels label={status} />
            </TableCell>
            <TableCell className={s.smText}>{formatTimeToTimezone((votingStartDate), 'DD.MM.YYYY')}</TableCell>
            <TableCell className={s.smText}>{formatTimeToTimezone(votingEndDate, 'DD.MM.YYYY')}</TableCell>
            <TableCell className={s.smText}>
              {resolveDate !== '0001-01-01T00:00:00Z' ? formatTimeToTimezone(resolveDate, 'DD.MM.YYYY') : '-'}
            </TableCell>
          </TableRow>
        </Link>
      ))}
    </div>
  );
};

TableList.propTypes = {
  list: PropTypes.array.isRequired,
};

export default TableList;
