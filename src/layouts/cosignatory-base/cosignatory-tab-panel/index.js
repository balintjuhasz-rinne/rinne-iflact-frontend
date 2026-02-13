import React from 'react';
import { useRouter } from 'next/router';
import { useSelector } from 'react-redux';
import { format } from 'date-fns';

import SwitcherLink from '../../../components/switcher/switcher-link';

import {
  COSIGNATORY_PROFILE_PATH, COSIGNATORY_PROFILE, COSIGNATORY_OPEN_APPROVALS_PATH, COSIGNATORY_OPEN_APPROVALS,
  COSIGNATORY_PREVIOUS_APPROVALS_PATH, COSIGNATORY_PREVIOUS_APPROVALS, COSIGNATORY_MESSAGE_HISTORY,
  COSIGNATORY_MESSAGE_HISTORY_PATH, COSIGNATORY_LOGS_PATH, COSIGNATORY_LOGS,
} from '../../../constants/router.constants';
import { createDynamicPath, addTrailingSlash } from '../../../helpers/url.helpers';
import { getCosignatoryInfoSelector } from '../../../selectors/cosignatory.selectors';

import s from './cosignatory-tab-panel.module.scss';

const CosignatoryTabPanel = () => {
  const { pathname, query: { id } } = useRouter();
  const { info: { registrationDate } } = useSelector(getCosignatoryInfoSelector);
  const switcherOptions = [
    {
      title: 'Personal Info',
      href: COSIGNATORY_PROFILE_PATH,
      as: createDynamicPath(COSIGNATORY_PROFILE, id),
      isActive: addTrailingSlash(pathname) === COSIGNATORY_PROFILE_PATH,
    },
    {
      title: 'Open Approvals',
      href: COSIGNATORY_OPEN_APPROVALS_PATH,
      as: createDynamicPath(COSIGNATORY_OPEN_APPROVALS, id),
      isActive: addTrailingSlash(pathname) === COSIGNATORY_OPEN_APPROVALS_PATH,
    },
    {
      title: 'Previous Contracts',
      href: COSIGNATORY_PREVIOUS_APPROVALS_PATH,
      as: createDynamicPath(COSIGNATORY_PREVIOUS_APPROVALS, id),
      isActive: addTrailingSlash(pathname) === COSIGNATORY_PREVIOUS_APPROVALS_PATH,
    },
    {
      title: 'Message history',
      href: COSIGNATORY_MESSAGE_HISTORY_PATH,
      as: createDynamicPath(COSIGNATORY_MESSAGE_HISTORY, id),
      isActive: addTrailingSlash(pathname) === COSIGNATORY_MESSAGE_HISTORY_PATH,
    },
    {
      title: 'Logs',
      href: COSIGNATORY_LOGS_PATH,
      as: createDynamicPath(COSIGNATORY_LOGS, id),
      isActive: addTrailingSlash(pathname) === COSIGNATORY_LOGS_PATH,
    },
  ];
  const date = registrationDate ? format(new Date(registrationDate), 'dd MMM yyyy, hh:mm aaaa') : '-';
  return (
    <div className={s.wrap}>
      <SwitcherLink options={switcherOptions} />
      <div className={s.registered}>
        <span className={s.registeredText}>Registered:</span>
        <span className={s.registeredDate}>{date}</span>
      </div>
    </div>
  );
};

export default CosignatoryTabPanel;
