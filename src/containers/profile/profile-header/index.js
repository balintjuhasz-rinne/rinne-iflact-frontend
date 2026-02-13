import React from 'react';
import Header from '../../../layouts/header';
import s from './header-profile.module.scss';

const ProfileHeader = () => (
  <Header>
    <div className={s.wrap}>
      <h2 className={s.title}>My account info</h2>
    </div>
  </Header>
);

ProfileHeader.propTypes = {
};

export default ProfileHeader;
