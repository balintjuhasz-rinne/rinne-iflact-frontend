import React from 'react';
import PropTypes from 'prop-types';
import DatePicker from 'react-datepicker';
import cn from 'classnames';
import { format } from 'date-fns';
import s from './date-input.module.scss';

const DateRangeInput = ({
  selectedDate, onChange,
  placeholder, isStartDate,
  isEndDate, startDate, error,
  endDate, label, wrapClassName,
  ...props
}) => (
  <div className={cn(s.wrap, wrapClassName, { [s.error]: error })}>
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
      selectsRange
      customInput={(
        <div>
          {startDate || endDate
            ? (
              <>
                {startDate && format(new Date(startDate), 'dd.MM.yyyy')}&nbsp;
                {endDate && `- ${ format(new Date(endDate), 'dd.MM.yyyy')}`}
              </>
            ) : placeholder}

        </div>
      )}
      {...props}
    />
    {error && <span className={s.inputError}>{error}</span>}
  </div>
);

DateRangeInput.propTypes = {
  selectedDate: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.instanceOf(Date),
  ]),
  onChange: PropTypes.func.isRequired,
  placeholder: PropTypes.string,
  isStartDate: PropTypes.bool,
  isEndDate: PropTypes.bool,
  startDate: PropTypes.instanceOf(Date),
  endDate: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.instanceOf(Date),
  ]),
  label: PropTypes.string,
  error: PropTypes.string,
  wrapClassName: PropTypes.string,
};

DateRangeInput.defaultProps = {
  selectedDate: '',
  placeholder: '',
  isStartDate: false,
  isEndDate: false,
  startDate: '',
  endDate: '',
  label: '',
  wrapClassName: '',
  error: '',
};
export default DateRangeInput;
