import React from 'react';
import PropTypes from 'prop-types';
import Modal from '../../../components/modal';
import CreateCompanyForm from '../../forms/create-company-form';

const CreateCompanyModal = ({ closeModal }) => (
  <Modal
    closeModal={closeModal}
    title="Add Company"
  >
    <CreateCompanyForm />
  </Modal>
);

CreateCompanyModal.propTypes = {
  closeModal: PropTypes.func.isRequired,
};

export default CreateCompanyModal;
