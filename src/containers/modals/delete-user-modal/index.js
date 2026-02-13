import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { useRouter } from 'next/router';

import Button from '../../../components/buttons/primary-button';
import Modal from '../../../components/modal';

import { deleteUser } from '../../../actions/user.actions';
import { signOut } from '../../../actions/auth.actions';
import { SERVER_ERRORS } from '../../../constants/error.constants';
import { SIGNIN_PATH } from '../../../constants/router.constants';

import s from './delete-user-modal.module.scss';

const DeleteUserModal = ({ closeModal, role }) => {
  const dispatch = useDispatch();
  const [error, setError] = useState('');
  const router = useRouter();

  const onDeleteUser = async () => {
    try {
      const isUserDeleted = await deleteUser();
      if (isUserDeleted) {
        closeModal();
        await dispatch(signOut());
        router.push(SIGNIN_PATH);
      }

    } catch (err) {
      if (!err.response) return;
      err.response.data.errors.forEach(({ message }) => {
        setError(SERVER_ERRORS[message] || SERVER_ERRORS.DEFAULT);
      });
    }
  };

  return (
    <Modal closeModal={closeModal} className={s.wrap}>
      <h2 className={s.title}>
        Are you sure you want to remove the {role} account?
      </h2>
      <p className={s.text}>This action cannot be undone.</p>
      {error && <span className={s.error}>{error}</span>}
      <div className={s.panel}>
        <Button theme="white" value="Cancel" onClick={closeModal} />
        <Button theme="gray" value="Delete" onClick={onDeleteUser} />
      </div>
    </Modal>
  );
};

DeleteUserModal.propTypes = {
  closeModal: PropTypes.func.isRequired,
  role: PropTypes.string.isRequired,
};

export default DeleteUserModal;
