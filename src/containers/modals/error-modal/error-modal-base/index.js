import React from 'react';
import PropTypes from 'prop-types';

import Button from '../../../../components/buttons/primary-button';

import { ERROR } from '../../../../constants/image.constants';

import s from './error-modal-base.module.scss';

const ErrorModalBase = ({ error, closeModal }) => (
  <>
    <img src={ERROR} alt="error" className={s.image} />
    <h6 className={s.title}>{error}</h6>
    <Button theme="gray" onClick={closeModal} className={s.button} value="ok" />
  </>
);

ErrorModalBase.propTypes = {
  error: PropTypes.string,
  closeModal: PropTypes.func.isRequired,
};

ErrorModalBase.defaultProps = {
  error: '',
};

export default ErrorModalBase;
