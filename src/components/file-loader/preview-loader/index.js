import React from 'react';
import PropTypes from 'prop-types';
import { IC_CLOSE, IC_PDF } from '../../../constants/image.constants';
import s from './preview-loader.module.scss';

const PreviewLoader = ({ title, size, removeFile }) => (
  <div className={s.wrap}>
    <p className={s.hint}>This document will be viewable by the users </p>
    <div className={s.row}>
      <img className={s.pdf} src={IC_PDF} alt="pdf" />
      <div className={s.info}>
        <p className={s.title}>{title}</p>
        <span className={s.size}>{size}</span>
      </div>
      <button type="button" className={s.remove} onClick={() => removeFile()}>
        <img src={IC_CLOSE} alt="remove" />
      </button>
    </div>
  </div>
);

PreviewLoader.propTypes = {
  title: PropTypes.string.isRequired,
  removeFile: PropTypes.func.isRequired,
  size: PropTypes.string.isRequired,
};

export default PreviewLoader;
