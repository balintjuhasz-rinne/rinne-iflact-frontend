import React from 'react';
import cn from 'classnames';
import PropTypes from 'prop-types';
import { IC_DOUBLE_ARROW } from '../../../constants/image.constants';
import s from './hide-activity-button.module.scss';

const HideActivityButton = ({ className, ...props }) => (
  <button
    className={cn(s.btn, className)}
    {...props}
  >
    Hide
    <img className={s.img} src={IC_DOUBLE_ARROW} alt="arrow" />
  </button>
);

HideActivityButton.propTypes = {
  className: PropTypes.string,
};

HideActivityButton.defaultProps = {
  className: '',
};

export default HideActivityButton;
