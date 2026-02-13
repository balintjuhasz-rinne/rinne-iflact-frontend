import React, { memo } from 'react';
import PropTypes from 'prop-types';
import s from './global-wrap.module.scss';

const GlobalWrap = ({ children }) => (
  <div className={s.wrap}>
    {children}
  </div>
);

GlobalWrap.propTypes = {
  children: PropTypes.node.isRequired,
};

export default memo(GlobalWrap);
