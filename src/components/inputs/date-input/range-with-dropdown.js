import React from 'react';
import PropTypes from 'prop-types';
import DatePicker from 'react-datepicker';
import cn from 'classnames';
import { format } from 'date-fns';
import Dropdown from '../../dropdown';
import s from './date-input.module.scss';

const DateRangeInputWithDropdown = ({
  selectedDate,
  onChange,
  isStartDate,
  isEndDate, startDate, error,
  endDate, wrapClassName,
  dropdownOptions, activeOption, onDropdownChange,
  ...props
}) => (
  <div className={cn(wrapClassName, s.wrap, { [s.error]: error })}>
    <Dropdown
      options={dropdownOptions}
      className={s.dropdown}
      setActive={onDropdownChange}
      activeOption={activeOption}
      isAttached={false}
      manualOption={startDate || endDate
        ? (
          <>
            {startDate && format(new Date(startDate), 'dd.MM.yyyy')}&nbsp;
            {endDate && `- ${ format(new Date(endDate), 'dd.MM.yyyy')}`}
          </>
        )
        : null}
    />
    <DatePicker
      onChange={onChange}
      popperPlacement="bottom-end"
      selectStart={isStartDate}
      selectEnd={isEndDate}
      startDate={startDate}
      endDate={endDate}
      dateFormat="dd.MM.yyyy"
      autoComplete="off"
      wrapperClassName={s.datepicker}
      selectsRange
      float="right"
      {...props}
    />
    {error && <span className={s.inputError}>{error}</span>}
  </div>
);

DateRangeInputWithDropdown.propTypes = {
  dropdownOptions: PropTypes.array.isRequired,
  activeOption: PropTypes.object.isRequired,
  onDropdownChange: PropTypes.func.isRequired,
  selectedDate: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  placeholder: PropTypes.string,
  isStartDate: PropTypes.bool,
  isEndDate: PropTypes.bool,
  startDate: PropTypes.string,
  endDate: PropTypes.string,
  error: PropTypes.string,
  wrapClassName: PropTypes.string,
};

DateRangeInputWithDropdown.defaultProps = {
  selectedDate: '',
  placeholder: '',
  isStartDate: false,
  isEndDate: false,
  startDate: '',
  endDate: '',
  wrapClassName: '',
  error: '',
};
export default DateRangeInputWithDropdown;
