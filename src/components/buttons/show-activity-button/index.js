import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import { IC_DOUBLE_ARROW } from '../../../constants/image.constants';
import s from './show-activity-button.module.scss';

const ShowActivityButton = ({ className, ...props }) => (
  <button
    className={cn(s.btn, className)}
    {...props}
  >
    <img className={s.img} src={IC_DOUBLE_ARROW} alt="arrow" />
    Show latest activity
  </button>
);

ShowActivityButton.propTypes = {
  className: PropTypes.string,
};

ShowActivityButton.defaultProps = {
  className: '',
};

export default ShowActivityButton;
