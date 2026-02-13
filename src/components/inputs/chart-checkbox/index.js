import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';

import Checkbox from '../checkbox';

import s from './checkbox-chart.module.scss';

const ChartCheckbox = ({ wrapClassName, color, ...props }) => (
  <div className={cn(wrapClassName, s.wrapper, s[color])}>
    <span className={s.mark} />
    <Checkbox {...props} align="right" type="gray" />
  </div>
);

ChartCheckbox.propTypes = {
  color: PropTypes.oneOf(['gray', 'orange']),
  wrapClassName: PropTypes.string,
};

ChartCheckbox.defaultProps = {
  color: 'gray',
  wrapClassName: '',
};

export default ChartCheckbox;
