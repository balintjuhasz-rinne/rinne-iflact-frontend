import React, { memo } from 'react';
import Sidebar from '../../layouts/sidebar';
import SidebarNav from './sidebar-nav';

const SidebarCosignatory = () => (
  <Sidebar>
    <SidebarNav />
  </Sidebar>
);
export default memo(SidebarCosignatory);
