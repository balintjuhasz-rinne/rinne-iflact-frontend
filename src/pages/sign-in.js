import React from 'react';
import { useRouter } from 'next/router';
import CosecAuthorizationForm from '../containers/forms/cosec-authorization-form';

import UnregisterScreen from '../layouts/unregister-screen';

const SignIn = () => {
  const router = useRouter();
  const { redirect: redirectLink } = router.query;

  return (
    <UnregisterScreen>
      <CosecAuthorizationForm redirectLink={redirectLink} />
    </UnregisterScreen>
  );
};

export default SignIn;
