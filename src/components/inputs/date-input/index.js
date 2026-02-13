import React from 'react';
import PropTypes from 'prop-types';
import DatePicker from 'react-datepicker';
import cn from 'classnames';

import s from './date-input.module.scss';

const DateInput = ({
  selectedDate, onChange,
  placeholder, isStartDate,
  isEndDate, startDate, error,
  endDate, label, wrapClassName,
  ...props
}) => (
  <div className={cn(wrapClassName, s.wrap, { [s.error]: error })}>
    {label && <span className={s.label}>{label}</span>}
    <DatePicker
      selected={selectedDate}
      onChange={onChange}
      placeholderText={placeholder}
      selectStart={isStartDate}
      selectEnd={isEndDate}
      startDate={startDate}
      endDate={endDate}
      dateFormat="dd.MM.yyyy"
      autoComplete="off"
      {...props}
    />
    {error && <span className={s.inputError}>{error}</span>}
  </div>
);

DateInput.propTypes = {
  selectedDate: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.instanceOf(Date),
  ]),
  onChange: PropTypes.func.isRequired,
  placeholder: PropTypes.string,
  isStartDate: PropTypes.bool,
  isEndDate: PropTypes.bool,
  startDate: PropTypes.string,
  endDate: PropTypes.string,
  label: PropTypes.string,
  error: PropTypes.string,
  wrapClassName: PropTypes.string,
};

DateInput.defaultProps = {
  selectedDate: null,
  placeholder: '',
  isStartDate: false,
  isEndDate: false,
  startDate: '',
  endDate: '',
  label: '',
  wrapClassName: '',
  error: '',
};
export default DateInput;
