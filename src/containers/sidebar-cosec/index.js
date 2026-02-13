import React, { memo } from 'react';
import Sidebar from '../../layouts/sidebar';
import SidebarNav from './sidebar-nav';

const SidebarCosec = () => (
  <Sidebar>
    <SidebarNav />
  </Sidebar>
);
export default memo(SidebarCosec);
