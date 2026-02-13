import React, { memo } from 'react';
// import PropTypes from 'prop-types';
import styles from './pagination-by-one.module.scss';

const PaginationByOne = () => (
  <svg
    className={styles.icon}
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
  >
    <path fill="#113083" d="M11.415 11.29l3-2.998-.706-.705L10 11.29 13.71 15l.704-.71-2.999-3z" />
  </svg>
);

PaginationByOne.propTypes = {};
PaginationByOne.defaultProps = {};

export default memo(PaginationByOne);
