import React from 'react';
import PropTypes from 'prop-types';
import { IC_TRASH } from '../../../constants/image.constants';
import s from './preview-loader.module.scss';
import SizedImage from '../../sized-image';

const PreviewLoader = ({ path, removeFile }) => (
  <div className={s.wrap}>
    <SizedImage height={120} width={120} src={path} alt="" />

    <button type="button" className={s.remove} onClick={() => removeFile()}>
      <img src={IC_TRASH} alt="remove" />
    </button>
  </div>
);

PreviewLoader.propTypes = {
  path: PropTypes.string.isRequired,
  removeFile: PropTypes.func.isRequired,
};

export default PreviewLoader;
