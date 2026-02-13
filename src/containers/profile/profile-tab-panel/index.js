import React from 'react';
import { useSelector } from 'react-redux';
import { format } from 'date-fns';
import { useRouter } from 'next/router';
import { addTrailingSlash } from '../../../helpers/url.helpers';
import SwitcherLink from '../../../components/switcher/switcher-link';

import {
  MY_ACCOUNT_PATH,
  MY_ACCOUNT_INFO_PATH,
  MY_ACCOUNT_LOGS_PATH,
} from '../../../constants/router.constants';
import { getUserSelector } from '../../../selectors/user.selectors';

import s from './profile-tab-panel.module.scss';
import { USER_ROLES } from '../../../constants/user.constants';

const ProfileTabPanel = () => {
  const { asPath } = useRouter();
  const trailingPath = addTrailingSlash(asPath);
  const { user: { registrationDate, role } } = useSelector(getUserSelector);

  const logsOption = {
    title: 'Logs',
    href: MY_ACCOUNT_LOGS_PATH,
    isActive: trailingPath === MY_ACCOUNT_LOGS_PATH,
  };

  const options = [
    {
      title: 'My Company',
      href: MY_ACCOUNT_PATH,
      isActive: trailingPath === MY_ACCOUNT_PATH,
    },
    {
      title: 'Personal Info',
      href: MY_ACCOUNT_INFO_PATH,
      isActive: trailingPath === MY_ACCOUNT_INFO_PATH,
    },
    ...(role === USER_ROLES.CO_SEC ? [logsOption] : []),
    // TODO:remove when this tabs will be implemented
    //  {
    //   title: 'Message History',
    //   href: `${MY_ACCOUNT_PATH}message-history`,
    //   isActive: active === 'message-history',
    // },
  ];

  return (
    <div className={s.wrap}>
      <SwitcherLink options={options} />
      <div className={s.regWrap}>
        <span className={s.reg}>Registered:</span>
        <span className={s.date}>
          {registrationDate && format(new Date(registrationDate), 'dd MMM yyyy, hh:mm aaaa')}
        </span>
      </div>
    </div>
  );
};

export default ProfileTabPanel;
