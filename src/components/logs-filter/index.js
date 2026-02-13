import endOfDay from 'date-fns/endOfDay';
import startOfDay from 'date-fns/startOfDay';
import PropTypes from 'prop-types';
import React, { useState } from 'react';
import Button from '../buttons/primary-button';
import DateRangeInput from '../inputs/date-input/range';
import Input from '../inputs/primary-input';
import s from './logs-filter.module.scss';

const LogsFilter = ({ setLogsFilters }) => {

  const [name, setName] = useState('');
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  const onNameChange = (e) => {
    setName(e.target.value);
  };

  const onDateChange = (dates) => {
    const [start, end] = dates;
    setStartDate(start);
    setEndDate(end ?? null);
  };

  const setFilters = () => {
    setLogsFilters({
      ...(name && { name }),
      ...(startDate && { startDate: startOfDay(startDate, true) }),
      ...((endDate || startDate) && { endDate: endOfDay(endDate ?? startDate) }),
    });
  };

  const clearFilters = () => {
    setName('');
    setStartDate(null);
    setEndDate(null);
    setLogsFilters({});
  };

  return (
    <div className={s.filter}>
      <div className={s.filterInputs}>
        <div className={s.inputWrap}>
          <Input placeholder="Username" className={s.input} value={name} onChange={(e) => onNameChange(e)} />
        </div>
        <div className={s.dateWrap}>
          <DateRangeInput
            selectedDate={startDate}
            startDate={startDate}
            endDate={endDate}
            onChange={onDateChange}
            placeholder="Date range"
            shouldCloseOnSelect={false}
          />
        </div>
      </div>
      <div className={s.filterButtons}>
        <Button value="Apply filters" className={s.button} onClick={setFilters} />
        <Button value="Clear" className={s.button} theme="transparent" onClick={clearFilters} />
      </div>
    </div>
  );
};

LogsFilter.propTypes = {
  setLogsFilters: PropTypes.func.isRequired,
};

export default LogsFilter;
