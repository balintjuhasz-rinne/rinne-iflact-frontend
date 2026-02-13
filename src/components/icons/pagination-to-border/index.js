import React, { memo } from 'react';
// import PropTypes from 'prop-types';
import styles from './pagination-to-border.module.scss';

const PaginationByOne = () => (
  <svg
    className={styles.icon}
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
  >
    <path fill="#113083" d="M9.415 11.704l3-3L11.708 8 8 11.704l3.71 3.71.704-.71-2.999-3z" />
    <path fill="#113083" d="M12.415 11.704l3-3L14.708 8 11 11.704l3.71 3.71.704-.71-2.999-3z" />
  </svg>
);

PaginationByOne.propTypes = {};
PaginationByOne.defaultProps = {};

export default memo(PaginationByOne);
