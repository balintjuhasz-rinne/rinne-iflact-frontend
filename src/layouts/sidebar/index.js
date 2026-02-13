import React, { memo } from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import { useDispatch, useSelector } from 'react-redux';

import Dimmer from '../../components/dimmer';

import SidebarInfo from './sidebar-info';
import SidebarAccount from './sidebar-account';
import SidebarNav from './sidebar-nav';
import SidebarLogo from './sidebar-logo';
import SidebarFooter from './sidebar-footer';

import { getSidebarStateSelector } from '../../selectors/global.selectors';

import s from './sidebar.module.scss';
import { setSidebarState } from '../../actions/global.actions';

const Sidebar = ({ children }) => {
  const { isSidebarOpened } = useSelector(getSidebarStateSelector);
  const dispatch = useDispatch();

  return (
    <aside className={cn(s.root, { [s.on]: isSidebarOpened })}>
      {isSidebarOpened && <Dimmer onClick={() => dispatch(setSidebarState())} />}
      <div className={s.wrap}>
        <SidebarNav />
        <SidebarLogo />
        <SidebarInfo />
        {children}
        <SidebarAccount />
        <SidebarFooter />
      </div>
    </aside>
  );
};

Sidebar.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.node,
    PropTypes.element,
  ]).isRequired,
};

export default memo(Sidebar);
