import React from 'react';
import PropTypes from 'prop-types';

import Modal from '../../../components/modal';
import Button from '../../../components/buttons/primary-button';

import s from './success-modal.module.scss';

const SuccessModal = ({ text, closeModal }) => (
  <Modal
    closeModal={closeModal}
    className={s.wrap}
    title="Success"
  >
    <p className={s.title}>{text}</p>
    <Button theme="gray" onClick={closeModal} className={s.button} value="ok" />
  </Modal>
);

SuccessModal.propTypes = {
  closeModal: PropTypes.func.isRequired,
  text: PropTypes.string,
};

SuccessModal.defaultProps = {
  text: '',
};

export default SuccessModal;
