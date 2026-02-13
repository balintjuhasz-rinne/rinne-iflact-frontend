import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { format } from 'date-fns';
import cn from 'classnames';
import TableRow from '../../../../components/table/table-row';
import TableCell from '../../../../components/table/table-cell';
import { downloadHandler, normalizeError } from '../../../../helpers/functions.helper';

import { makeTemplatesSelector } from '../../../../selectors/templates.selectors';
import { removeTemplate } from '../../../../actions/templates.actions';
import { showModal } from '../../../../actions/modal.actions';
import { ERROR_MODAL } from '../../../../constants/modal.constants';
import { IC_PDF, IC_DOWNLOAD, IC_TRASH } from '../../../../constants/image.constants';

import s from './table-list.module.scss';

const TemplatesTableList = () => {
  const { list } = useSelector(makeTemplatesSelector);
  const [disabled, setDisabled] = useState(null);
  const dispatch = useDispatch();

  const onRemove = async (id) => {
    try {
      setDisabled(id);
      await dispatch(removeTemplate(id));
    } catch (e) {
      const error = normalizeError(e);
      dispatch(showModal(ERROR_MODAL, {
        error,
      }));
    } finally {
      setDisabled(null);
    }
  };

  return (
    <>
      <div className={s.cosignatoriesList}>
        {list.map(({
          id, file, createdAt,
        }) => (
          <TableRow className={s.row} key={id}>
            <TableCell className={cn(s.cell, s.file)}>
              <img src={IC_PDF} className={s.typeIcon} alt={file?.originalName} />
              <span>{file?.originalName}</span>
            </TableCell>
            <TableCell className={s.date}>{format(new Date(createdAt), 'dd MMM yyyy, hh:mm a')}</TableCell>
            <TableCell className={s.cellLast}>
              <button
                className={s.btn}
                onClick={() => downloadHandler(file?.path, file?.originalName)}
              >
                <img className={s.icon} src={IC_DOWNLOAD} alt="download" />
              </button>
              <button
                className={s.btn}
                onClick={() => onRemove(id)}
                disabled={disabled === id}
              >
                <img className={s.icon} src={IC_TRASH} alt="delete" />
              </button>
            </TableCell>
          </TableRow>
        ))}
      </div>
    </>
  );
};

export default TemplatesTableList;
