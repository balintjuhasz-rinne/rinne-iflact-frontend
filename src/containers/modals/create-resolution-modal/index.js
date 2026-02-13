import React from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';

import Modal from '../../../components/modal';
import CreateResolutionForm from '../../forms/create-resolution-form';

import { getNewResolutionSelector } from '../../../selectors/resolutions.selectors';

const CreateResolutionModal = ({ closeModal }) => {
  const { newResolution: { step } } = useSelector(getNewResolutionSelector);
  const title = step === 3 ? 'Preview main Terms' : 'Create New Financing';
  return (
    <Modal closeModal={closeModal} title={title}>
      <CreateResolutionForm />
    </Modal>
  );
};

CreateResolutionModal.propTypes = {
  closeModal: PropTypes.func.isRequired,
};

export default CreateResolutionModal;
