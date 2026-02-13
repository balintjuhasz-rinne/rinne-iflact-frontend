import React from 'react';
import PropTypes from 'prop-types';

import ErrorModalBase from './error-modal-base';

import Modal from '../../../components/modal';

import s from './error-modal.module.scss';

const ErrorModal = ({ error, closeModal }) => (
  <Modal closeModal={closeModal} className={s.wrap} overlayClassName={s.wrapOverlay}>
    <ErrorModalBase error={error} closeModal={closeModal} />
  </Modal>
);

ErrorModal.propTypes = {
  closeModal: PropTypes.func.isRequired,
  error: PropTypes.string.isRequired,
};

export default ErrorModal;
