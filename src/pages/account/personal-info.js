import React from 'react';
import EditUserForm from '../../containers/forms/edit-user-form';
import ProfileBase from '../../containers/profile/profile-base';

const AccountInfoPage = () => (
  <ProfileBase>
    <EditUserForm />
  </ProfileBase>
);

export default AccountInfoPage;
