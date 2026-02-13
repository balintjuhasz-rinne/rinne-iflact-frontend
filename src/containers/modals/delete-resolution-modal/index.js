import React from 'react';
import PropTypes from 'prop-types';

import Button from '../../../components/buttons/primary-button';
import Modal from '../../../components/modal';

import s from './delete-company-modal.module.scss';

const DeleteResolutionModal = ({ deleteResolution, closeModal }) => {

  const onDeleteResolution = async () => {
    await deleteResolution();
    closeModal();
  };

  return (
    <Modal closeModal={closeModal} className={s.wrap}>
      <h2 className={s.title}>Delete resolution</h2>
      <p className={s.text}>Please confirm deliting resolution</p>
      <div className={s.panel}>
        <Button theme="white" value="Cancel" onClick={closeModal} />
        <Button theme="gray" value="Delete" onClick={onDeleteResolution} />
      </div>
    </Modal>
  );
};

DeleteResolutionModal.propTypes = {
  closeModal: PropTypes.func.isRequired,
  deleteResolution: PropTypes.func.isRequired,
};

export default DeleteResolutionModal;
