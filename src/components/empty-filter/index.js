import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';

import { IC_EMPTY_FILTER } from '../../constants/image.constants';

import s from './empty-filter.module.scss';

const EmptyFilter = ({ className }) => (
  <div className={cn(className, s.wrapper)}>
    <img className={s.icon} src={IC_EMPTY_FILTER} alt="Empty filter" />
    <span className={s.text}>No search results found. Try another filter.</span>
  </div>
);

EmptyFilter.propTypes = {
  className: PropTypes.string,
};

EmptyFilter.defaultProps = {
  className: '',
};
export default EmptyFilter;
