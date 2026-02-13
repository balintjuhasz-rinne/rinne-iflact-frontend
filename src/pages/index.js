import React, { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useSelector } from 'react-redux';

import { getUserRoleSelector } from '../selectors/user.selectors';
import { USER_ROLES } from '../constants/user.constants';
import { COSIGNATORIES_PATH, RESOLUTIONS_PATH } from '../constants/router.constants';

const HomePage = () => {
  const { role } = useSelector(getUserRoleSelector);
  const router = useRouter();
  useEffect(() => {
    if (role === USER_ROLES.CO_SEC) {
      router.push(COSIGNATORIES_PATH);
    }
    if (role === USER_ROLES.CO_SIGNATORY) {
      router.push(RESOLUTIONS_PATH);
    }
  });
  return (
    <div />
  );
};

HomePage.getInitialProps = () => {};

export default HomePage;
