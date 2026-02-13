import cn from 'classnames';
import { format } from 'date-fns';
import PropTypes from 'prop-types';
import React from 'react';
import { useDispatch } from 'react-redux';
import { resendCosignatoryInvite } from '../../../../actions/cosignatory.actions';
import { showModal } from '../../../../actions/modal.actions';
import AvatarIcon from '../../../../components/avatar-icon';
import UserLogPreview from '../../../../components/user-log-preview';
import StatusLabels from '../../../../components/status-labels';
import TableCell from '../../../../components/table/table-cell';
import TableRow from '../../../../components/table/table-row';
import { ERROR_MODAL, SUCCESS_MODAL } from '../../../../constants/modal.constants';
import { logNamesCompany } from '../../../../constants/other.constants';
import { normalizeError } from '../../../../helpers/functions.helper';
import s from './table-list.module.scss';

const LogsTableList = ({ list }) => {

  const dispatch = useDispatch();

  const resendMessage = async (email) => {
    try {
      await resendCosignatoryInvite(email);
      dispatch(showModal(SUCCESS_MODAL, {
        text: 'The message was successfully resent',
      }));
    } catch (e) {
      if (e?.response?.data?.errors[0].field === 'inviteToken') {
        dispatch(showModal(ERROR_MODAL, { error: 'User is already registered' }));
        return;
      }
      const error = normalizeError(e);
      dispatch(showModal(ERROR_MODAL, { error }));
    }
  };

  return (
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
            <span className={s.name}>{`${name} ${ surname ?? ''}`}</span>
          </TableCell>
          <TableCell className={s.gray}>
            {parameter}
          </TableCell>
          <TableCell className={cn(s.cell, s.comment)}>
            {(relatedUser && parameter === logNamesCompany['cosign-deactivation'])
              ? <UserLogPreview relatedUser={relatedUser} />
              : oldValue}
          </TableCell>
          <TableCell className={cn(s.cell, s.comment)}>
            {(relatedUser && [logNamesCompany['cosign-invitation'], logNamesCompany['cosec-invitation']].includes(parameter))
              ? <UserLogPreview relatedUser={relatedUser} />
              : newValue}
          </TableCell>
          <TableCell className={cn(s.cell, { [s.withLabel]: !relatedUser?.registrationCompleted })}>
            {(relatedUser && [logNamesCompany['cosign-invitation'], logNamesCompany['cosec-invitation']].includes(parameter))
              && (
                <>
                  {!relatedUser.registrationCompleted && <StatusLabels label="Pending" className={s.label} />}
                  <button
                    onClick={() => resendMessage(relatedUser.email)}
                    className={s.resendButton}
                  >
                    Re-send
                  </button>
                </>
              )}
          </TableCell>
        </TableRow>
      ))}
    </div>
  );
};

LogsTableList.propTypes = {
  list: PropTypes.array.isRequired,
};

export default LogsTableList;
