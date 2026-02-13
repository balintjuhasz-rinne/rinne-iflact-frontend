import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import cn from 'classnames';
import { format } from 'date-fns';

import { normalizeError } from '../../../../helpers/functions.helper';
import { setCosignatoryMessages, resendCosignatoryMessage } from '../../../../actions/cosignatory.actions';
import { showModal } from '../../../../actions/modal.actions';
import { ERROR_MODAL, SUCCESS_MODAL } from '../../../../constants/modal.constants';
import TableRow from '../../../../components/table/table-row';
import TableCell from '../../../../components/table/table-cell';

import { makeCosignatoryMessagesSelector, getCosignatoryInfoSelector } from '../../../../selectors/cosignatory.selectors';
import { MESSAGE_TYPES, MESSAGE_TYPES_BACKEND, MESSAGE_DELIVERY } from '../../../../constants/message.constants';

import { linkSeparator, textSeparator } from '../../../../helpers/url.helpers';

import s from './table-list.module.scss';

const TableList = () => {
  const dispatch = useDispatch();
  const { messages } = useSelector(makeCosignatoryMessagesSelector);
  const { info: { id: cosignatoryId } } = useSelector(getCosignatoryInfoSelector);

  const resendMessage = async (messageId) => {
    try {
      await resendCosignatoryMessage(cosignatoryId, messageId);
      await dispatch(setCosignatoryMessages(cosignatoryId));
      dispatch(showModal(SUCCESS_MODAL, {
        text: 'The message was successfully resent',
      }));
    } catch (e) {
      const error = normalizeError(e);
      dispatch(showModal(ERROR_MODAL, { error }));
      throw new Error(e);
    }
  };

  return (
    <div className={s.wrapper}>
      {messages.map(({
        updatedAt, text, type, delivery, id, link = linkSeparator(text),
      }) => (
        <TableRow className={s.tableRow} key={id}>
          <TableCell className={cn(s.cell, s.gray)}>{format(new Date(updatedAt), 'd MMMM, hh:mm aaaa')}</TableCell>
          <TableCell className={s.textLg}>{textSeparator(text)}
            <a href={link} target="_blank" rel="noopener noreferrer nofollow">{link}</a>
          </TableCell>
          <TableCell className={cn(s.cell, s.gray)}>{MESSAGE_DELIVERY[delivery]}</TableCell>
          <TableCell className={cn(s.cell, s.gray)}>{MESSAGE_TYPES[type]}</TableCell>
          {type !== MESSAGE_TYPES_BACKEND.REMINDER
           && (
             <TableCell className={cn(s.cell, s.blue)}>
               <button
                 onClick={() => resendMessage(id)}
                 className={s.actionButton}
               >
                 Re-send
               </button>
             </TableCell>
           )}
        </TableRow>
      ))}
    </div>
  );
};

export default TableList;
