import React from 'react';
import cn from 'classnames';
import { useRouter } from 'next/router';
import Link from '../../../components/custom-link';
import { isActivePath } from '../../../helpers/url.helpers';
import {
  RESOLUTIONS_PATH,
} from '../../../constants/router.constants';

import {
  IC_DOCUMENT_APPROVALS,
} from '../../../constants/image.constants';
import s from './sidebar-nav.module.scss';

const SidebarNav = () => {
  const { asPath } = useRouter();
  return (
    <div className={s.nav}>
      <nav>
        <Link href={RESOLUTIONS_PATH} className={cn(s.navItem, { [s.active]: isActivePath(asPath, RESOLUTIONS_PATH) })}>
          <span className={s.icon}>
            <img src={IC_DOCUMENT_APPROVALS} alt="contracts" />
          </span>
          <span className={s.navText}>Contracts</span>
        </Link>
      </nav>
    </div>
  );
};

export default SidebarNav;
