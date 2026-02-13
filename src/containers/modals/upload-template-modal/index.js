import React from 'react';
import PropTypes from 'prop-types';

import UploadTemplate from '../../upload-template';
import Modal from '../../../components/modal';

const UploadTemplateModal = ({ closeModal }) => (
  <Modal closeModal={closeModal} title="Upload Template">
    <UploadTemplate />
  </Modal>
);

UploadTemplateModal.propTypes = {
  closeModal: PropTypes.func.isRequired,
};

export default UploadTemplateModal;
