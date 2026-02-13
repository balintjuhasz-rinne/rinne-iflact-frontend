import React, { useEffect } from 'react';
import { useRouter } from 'next/router';

import { SIGNIN_PATH } from '../../constants/router.constants';

const VerifyDataPage = () => {
  const router = useRouter();
  useEffect(() => {
    router.push(SIGNIN_PATH);
  }, []);

  return (
    <div />
  );

};

export default VerifyDataPage;
