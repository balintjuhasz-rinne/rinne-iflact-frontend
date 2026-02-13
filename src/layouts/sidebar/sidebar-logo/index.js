import React from 'react';
import { LOGO } from '../../../constants/image.constants';
import s from './sidebar-logo.module.scss';

const SidebarLogo = () => (
  <div className={s.logo}>
    <img src={LOGO} alt="Rinne" />
  </div>
);

export default SidebarLogo;
