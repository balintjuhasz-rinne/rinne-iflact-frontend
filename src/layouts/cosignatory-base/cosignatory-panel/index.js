import React from 'react';
import { useSelector } from 'react-redux';

import UserAvatar from '../../../components/user-avatar';
import { USER_STATUS } from '../../../constants/user.constants';

import { getCosignatoryInfoSelector } from '../../../selectors/cosignatory.selectors';
import s from './cosignatory-panel.module.scss';

const CosignatoryPanel = () => {
  const {
    info: {
      phoneNumber, email, avatar, name, surname, status,
    },
  } = useSelector(getCosignatoryInfoSelector);
  const isActive = status === USER_STATUS.ACTIVE;

  return (
    <div className={s.cosignatoryPanel}>
      <div className={s.info}>
        <div className={s.photo}>
          <UserAvatar img={avatar?.path} name={name} surname={surname} isActive={isActive} />
        </div>
        <div className={s.phone}>{phoneNumber}</div>
        <a className={s.email} href={`mailto:${email}`} target="_blank" rel="noopener noreferrer">{email}</a>
      </div>
    </div>
  );
};

export default CosignatoryPanel;
