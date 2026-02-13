import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';

import { IC_SEARCH } from '../../constants/image.constants';

import s from './search-field.module.scss';

const SearchField = ({ onSubmit, className, ...props }) => (
  <form className={s.searchWrap} submit={onSubmit}>
    <button className={s.searchButton}>
      <img src={IC_SEARCH} alt="search" />
    </button>
    <input {...props} className={cn(className, s.searchInput)} />
  </form>
);

SearchField.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  className: PropTypes.string,
};

SearchField.defaultProps = {
  className: '',
};

export default SearchField;
