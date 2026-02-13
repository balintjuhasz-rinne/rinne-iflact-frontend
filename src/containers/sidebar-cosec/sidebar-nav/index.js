import React from 'react';
import cn from 'classnames';
import { useRouter } from 'next/router';
import NextLink from 'next/link';
import { useSelector } from 'react-redux';
import Link from '../../../components/custom-link';
import { isActivePath } from '../../../helpers/url.helpers';
import {
  COSIGNATORIES_PATH,
  COMPANIES_PATH,
  RESOLUTIONS_PATH,
  LIBRARY_PATH,
} from '../../../constants/router.constants';
import {
  IC_CO_SIGNATORIES,
  IC_CLIENTS,
  IC_LIBRARY,
  IC_DOCUMENT_APPROVALS,
} from '../../../constants/image.constants';
import { getSidebarStateSelector } from '../../../selectors/global.selectors';
import s from './sidebar-nav.module.scss';

const SidebarNav = () => {
  const { asPath } = useRouter();
  const router = useRouter();
  const {
    pathname,
    query: { ...params },
  } = router;

  const { isSidebarOpened } = useSelector(getSidebarStateSelector);

  return (
    <nav className={cn(s.nav, { [s.on]: isSidebarOpened })}>
      <NextLink
        href={{
          pathname: COSIGNATORIES_PATH,
          query: {
            ...(pathname === COSIGNATORIES_PATH.slice(0, -1)) && { ...params },
          },
        }}
      >

        <a title="Cosignatories" className={cn(s.navItem, { [s.active]: isActivePath(asPath, COSIGNATORIES_PATH) })}>
          <span className={s.icon}>
            <img src={IC_CO_SIGNATORIES} alt="cosignatories" />
          </span>
          <span className={s.navText}>Users</span>
        </a>
      </NextLink>
      <Link
        title="Clients"
        href={COMPANIES_PATH}
        className={cn(s.navItem, { [s.active]: isActivePath(asPath, COMPANIES_PATH) })}
      >
        <span className={s.icon}><img src={IC_CLIENTS} alt="clients" /></span>
        <span className={s.navText}>Clients</span>
      </Link>
      <Link
        title="Library"
        href={LIBRARY_PATH}
        className={cn(s.navItem, { [s.active]: isActivePath(asPath, LIBRARY_PATH) })}
      >
        <span className={s.icon}><img src={IC_LIBRARY} alt="library" /></span>
        <span className={s.navText}>Library</span>
      </Link>
      <NextLink
        href={{
          pathname: RESOLUTIONS_PATH,
          query: {
            ...(pathname === RESOLUTIONS_PATH.slice(0, -1)) && { ...params },
          },
        }}
      >
        <a
          title="Contracts"
          className={cn(s.navItem, { [s.active]: isActivePath(asPath, RESOLUTIONS_PATH) })}
        >
          <span className={s.icon}><img src={IC_DOCUMENT_APPROVALS} alt="contracts" /></span>
          <span className={s.navText}>Contracts</span>
        </a>
      </NextLink>
    </nav>
  );
};

export default SidebarNav;
