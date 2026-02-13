import React from 'react';
import PropTypes from 'prop-types';

import Modal from '../../../components/modal';
import EditResolution from '../../edit-resolution';

const EditResolutionModal = ({ closeModal }) => (
  <Modal closeModal={closeModal} title="Edit Resolution">
    <EditResolution />
  </Modal>
);

EditResolutionModal.propTypes = {
  closeModal: PropTypes.func.isRequired,
};

export default EditResolutionModal;
