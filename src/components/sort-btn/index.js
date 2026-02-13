import React, { memo } from 'react';
import PropTypes from 'prop-types';
import SortIcon from '../icons/sort-icon';
import s from './sort-btn.module.scss';

const SortBtn = ({ children, active, ...props }) => (
  <button {...props} className={s.wrap}>
    {children}
    <SortIcon active={active} />
  </button>
);

SortBtn.propTypes = {
  children: PropTypes.node.isRequired,
  active: PropTypes.bool.isRequired,
};

export default memo(SortBtn);
