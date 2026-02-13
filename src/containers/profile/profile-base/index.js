import React, { memo } from 'react';
import PropTypes from 'prop-types';

import ProfileHeader from '../profile-header';
import ProfilePanel from '../profile-panel';
import ProfileTabPanel from '../profile-tab-panel';

import s from './profile-base.module.scss';

const ProfileBase = ({ children }) => (
  <>
    <ProfileHeader />
    <div className={s.wrap}>
      <ProfilePanel />
      <div className={s.dashboard}>
        <ProfileTabPanel />
        {children}
      </div>
    </div>
  </>
);

ProfileBase.propTypes = {
  children: PropTypes.node.isRequired,
};

export default memo(ProfileBase);
