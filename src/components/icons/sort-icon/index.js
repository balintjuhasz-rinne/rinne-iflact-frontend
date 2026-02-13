import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { IC_SORT } from '../../../constants/image.constants';
import styles from './sort-icon.module.scss';

const SortIcon = memo(({ active, icon = IC_SORT }) => (
  <div className={active ? styles.icon : styles.iconActive}>
    <img src={icon} alt="" />
  </div>
));

SortIcon.propTypes = {
  active: PropTypes.bool,
  icon: PropTypes.string,
};
SortIcon.defaultProps = {
  active: false,
  icon: IC_SORT,
};

export default SortIcon;
