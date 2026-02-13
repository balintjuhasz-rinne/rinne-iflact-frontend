import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useRouter } from 'next/router';

import Header from '../../../layouts/header';
import Button from '../../../components/buttons/primary-button';

import { getResolutionInfoSelector, getResolutionCosignatoriesSelector } from '../../../selectors/resolution.selectors';
import { getUserRoleSelector } from '../../../selectors/user.selectors';
import { USER_ROLES } from '../../../constants/user.constants';
import { IC_BACK } from '../../../constants/image.constants';
import { CANCEL_RESOLUTION_MODAL, EDIT_RESOLUTION_MODAL } from '../../../constants/modal.constants';
import { RESOLUTION_STATUSES, RESOLUTION_STATUSES_BACKEND } from '../../../constants/resolution.constants';
import { showModal } from '../../../actions/modal.actions';

import s from './resolution-header.module.scss';

const ResolutionHeader = () => {

  const {
    info: {
      id, name, company, status,
    },
  } = useSelector(getResolutionInfoSelector);
  const { isEditable } = useSelector(getResolutionCosignatoriesSelector);
  const { role } = useSelector(getUserRoleSelector);

  const dispatch = useDispatch();
  const router = useRouter();

  return (
    <Header className={s.wrap}>
      <button className={s.backButton} onClick={router.back}>
        <img src={IC_BACK} alt="Back" />
      </button>
      <div className={s.info}>
        <span className={s.name}>{name}</span>
        <div className={s.infoBottom}>
          <span className={s.infoBottomItem}>ID {id}</span>
          {company?.name && <span className={s.infoBottomItem}>{company.name}</span>}
          <span className={s.infoBottomItem}>{RESOLUTION_STATUSES[status]}</span>
        </div>
      </div>
      {role === USER_ROLES.CO_SEC && (
        <div className={s.buttons}>
          {status !== RESOLUTION_STATUSES_BACKEND.Canceled && status !== RESOLUTION_STATUSES_BACKEND.Closed && (
            <Button
              className={s.button}
              value="Cancel"
              theme="white"
              onClick={() => dispatch(showModal(CANCEL_RESOLUTION_MODAL, {
                id,
              }))}
            />
          ) }
          <Button
            className={s.button}
            value="Edit"
            theme="orange"
            disabled={!isEditable}
            onClick={() => dispatch(showModal(EDIT_RESOLUTION_MODAL))}
          />
        </div>
      )}
    </Header>
  );
};

export default ResolutionHeader;
