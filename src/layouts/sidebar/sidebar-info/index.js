import React, { memo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import cn from 'classnames';

import { getUserSelector } from '../../../selectors/user.selectors';
import { getSidebarStateSelector } from '../../../selectors/global.selectors';
import { signOut } from '../../../actions/auth.actions';
import { getInitials } from '../../../helpers/account.helpers';
import { SIGNIN_PATH } from '../../../constants/router.constants';
import SizedImage from '../../../components/sized-image';

import s from './sidebar-account.module.scss';

const SidebarInfo = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const {
    user: { name, surname, avatar },
  } = useSelector(getUserSelector);
  const { isSidebarOpened } = useSelector(getSidebarStateSelector);

  const onLogout = async () => {
    try {
      await dispatch(signOut());
      await router.push(SIGNIN_PATH);
    } catch (e) {
      throw new Error(e);
    }
  };

  return (
    <div className={cn(s.root, { [s.on]: isSidebarOpened })}>
      <div className={s.wrap}>
        <div className={s.avatar}>
          {avatar?.path
            ? <SizedImage width={28} height={28} src={avatar.path} alt="" />
            : getInitials(name, surname)}
        </div>
        <div className={s.panel}>
          <span className={s.name}>{name} {surname}</span>
          <button className={s.action} onClick={() => onLogout()}>Log off</button>
        </div>
      </div>
    </div>
  );
};

export default memo(SidebarInfo);
