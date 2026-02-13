import React, { memo } from 'react';
import PropTypes from 'prop-types';
import s from './page-wrap.module.scss';

const PageWrap = ({ children }) => (
  <div className={s.wrap}>
    {children}
  </div>
);

PageWrap.propTypes = {
  children: PropTypes.node.isRequired,
};

export default memo(PageWrap);
