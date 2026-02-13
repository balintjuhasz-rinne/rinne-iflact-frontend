import React from 'react';
import { useSelector } from 'react-redux';
import { USER_ROLES } from '../../../constants/user.constants';

import { getUserSelector } from '../../../selectors/user.selectors';

import CosignatoryForm from './cosignatary-form';
import CosecretaryForm from './cosecretary-form';

const EditUserForm = () => {

  const { user } = useSelector(getUserSelector);

  return (
    <>
      {user.role === USER_ROLES.CO_SIGNATORY && <CosignatoryForm />}
      {user.role === USER_ROLES.CO_SEC && <CosecretaryForm />}
    </>
  );
};

export default EditUserForm;
