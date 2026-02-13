import cn from 'classnames';
import React from 'react';
import { useSelector } from 'react-redux';
import AvatarIcon from '../../../../components/avatar-icon';
import Link from '../../../../components/custom-link';
import TableCell from '../../../../components/table/table-cell';
import TableRow from '../../../../components/table/table-row';
import InactiveUserTab from '../../../../components/user-inactive';
import { IC_SUCCESS_TRANSPARENT } from '../../../../constants/image.constants';
import {
  COSIGNATORY_PROFILE,
  COSIGNATORY_PROFILE_PATH,
} from '../../../../constants/router.constants';
import {
  USER_STATUS,
  USER_POSITIONS,
} from '../../../../constants/user.constants';
import { createDynamicPath } from '../../../../helpers/url.helpers';
import { makeSelectCosignatories } from '../../../../selectors/cosignatories.selectors';
import s from './table-list.module.scss';

const TableList = () => {
  const { currentPage, limit, list } = useSelector(makeSelectCosignatories);
  return (
    <div className={s.cosignatoriesList}>
      {list.map(({
        id, avatar, name, surname, summary = {}, status,
      }, idx) => {
        const {
          vetoPower,
          companiesCount,
          firstCompany,
          minVotingValue,
          maxVotingValue,
          isDirector,
          isShareholder,
        } = summary;

        const positions = [
          ...(isDirector ? [USER_POSITIONS.DIRECTOR] : []),
          ...(isShareholder ? [USER_POSITIONS.SHARE_HOLDER] : []),
        ].join(', ');

        const votingValues = (minVotingValue !== maxVotingValue) ? `${minVotingValue}-${maxVotingValue}%` : `${maxVotingValue}%`;

        return (
          <Link
            href={COSIGNATORY_PROFILE_PATH}
            as={createDynamicPath(COSIGNATORY_PROFILE, id)}
            className={s.link}
            key={id}
          >
            <TableRow className={cn(s.cosignatoriesListItem, { [s.inactive]: status === USER_STATUS.INACTIVE })}>
              <TableCell className={s.itemId} alignment="center">{limit * (currentPage - 1) + (idx + 1)}.</TableCell>
              <TableCell className={s.itemPersonality}>
                <AvatarIcon
                  avatar={avatar?.path}
                  name={name}
                  surname={surname}
                  className={s.avatar}
                />
                <div>
                  <span>{name}&nbsp;</span>
                  <span>{surname}</span>
                  {status === USER_STATUS.INACTIVE && (
                    <InactiveUserTab text="Inactive" />
                  )}
                </div>
              </TableCell>
              <TableCell>
                {firstCompany?.name}
                {companiesCount > 1 && (
                  <>
                    , ... <span className={s.plus}>+{companiesCount - 1}</span>
                  </>
                )}
              </TableCell>
              <TableCell className={s.itemPosition}>{positions}</TableCell>
              <TableCell alignment="right">
                {isShareholder ? `${votingValues}` : '-'}
              </TableCell>
              <TableCell alignment="center">
                {vetoPower ? (
                  <img src={IC_SUCCESS_TRANSPARENT} alt="hasVetoPower" />
                ) : (
                  <span>-</span>
                )}
              </TableCell>
            </TableRow>
          </Link>
        );
      })}
    </div>
  );
};

export default TableList;
