import React from 'react';
import cn from 'classnames';
import { useRouter } from 'next/router';

import { useSelector } from 'react-redux';
import Link from '../../../components/custom-link';

import { isActivePath } from '../../../helpers/url.helpers';
import { MY_ACCOUNT_PATH } from '../../../constants/router.constants';
import { IC_MY_ACCOUNT } from '../../../constants/image.constants';
// import { getUserRoleSelector } from '../../../selectors/user.selectors';
import { getSidebarStateSelector } from '../../../selectors/global.selectors';

import s from './sidebar-account.module.scss';

const SidebarAccount = () => {
  const { asPath } = useRouter();
  // const { role } = useSelector(getUserRoleSelector);
  const { isSidebarOpened } = useSelector(getSidebarStateSelector);
  return (
    <nav className={cn(s.root, { [s.on]: isSidebarOpened })}>
      <Link
        title="My account"
        href={MY_ACCOUNT_PATH}
        className={cn(s.navItem, { [s.active]: isActivePath(asPath, MY_ACCOUNT_PATH) })}
      >
        <span className={s.icon}>
          <img src={IC_MY_ACCOUNT} alt="" />
        </span>
        <span className={s.navText}>My account</span>
      </Link>
      {/* TODO:remove comments when subscriptions will be implemented */}
      {/* {role !== USER_ROLES.CO_SIGNATORY && (
        <Link href={SUBSCRIPTIONS_PATH} className={cn(s.navItem, { [s.active]: isActivePath(asPath, SUBSCRIPTIONS_PATH) })}>
          <span className={s.icon}>
            <img src={IC_SUBSCRIPTIONS} alt="" />
          </span>
          <span className={s.navText}>Subscriptions</span>
        </Link>
      )} */}
    </nav>
  );
};

export default SidebarAccount;
