import React from 'react';
import PropTypes from 'prop-types';
import Modal from '../../../components/modal';
import EditCosecPassworForm from '../../forms/edit-user-password-form';

const EditUserPasswordModal = ({ closeModal, id }) => (
  <Modal closeModal={closeModal} title="Change password">
    <EditCosecPassworForm id={id} />
  </Modal>
);

EditUserPasswordModal.propTypes = {
  closeModal: PropTypes.func.isRequired,
  id: PropTypes.number.isRequired,
};

export default EditUserPasswordModal;
