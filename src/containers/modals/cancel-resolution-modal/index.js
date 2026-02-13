import PropTypes from 'prop-types';
import React from 'react';
import Modal from '../../../components/modal';
import CancelResolutionForm from '../../forms/cancel-resolution-form';
import s from './create-resolution-modal.module.scss';

const CancelResolutionModal = ({ closeModal, id }) => (
  <Modal
    closeModal={closeModal}
    title="You are going to cancel the Document approval"
    className={s.modal}
  >
    <CancelResolutionForm resolutionId={id} />
  </Modal>
);

CancelResolutionModal.propTypes = {
  closeModal: PropTypes.func.isRequired,
  id: PropTypes.number.isRequired,
};

export default CancelResolutionModal;
