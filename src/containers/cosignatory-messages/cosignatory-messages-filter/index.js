import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Button from '../../../components/buttons/primary-button';
import Dropdown from '../../../components/dropdown';
import DateInput from '../../../components/inputs/date-input';

import { setMessagesFilterConfig } from '../../../actions/cosignatory.actions';
import { IC_FILTER } from '../../../constants/image.constants';
import { getDropdownOption } from '../../../helpers/functions.helper';
import { makeCosignatoryMessagesSelector } from '../../../selectors/cosignatory.selectors';

import typesDropdownOptions from './dropdown-options';
import s from './cosignatory-messages-filter.module.scss';

const CosignatoryMessagesFilter = () => {
  const dispatch = useDispatch();
  const { messagesFilterConfig } = useSelector(makeCosignatoryMessagesSelector);
  const [activeType, setActiveType] = useState(getDropdownOption(typesDropdownOptions, messagesFilterConfig.type) || { title: '', id: '' });
  const [date, setDate] = useState(messagesFilterConfig.date || '');

  const onDropdownChange = (id) => {
    const active = getDropdownOption(typesDropdownOptions, id);
    setActiveType(active);
  };

  const onDateChange = (dateValue) => {
    setDate(dateValue);
  };

  const setFilters = () => {
    dispatch(setMessagesFilterConfig({
      date,
      type: activeType.id,
    }));
  };

  const clearFilters = () => {
    setActiveType({ title: '', id: '' });
    setDate('');
    dispatch(setMessagesFilterConfig({
      date: '',
      type: '',
    }));
  };

  return (
    <div className={s.filter}>
      <img className={s.filterIcon} src={IC_FILTER} alt="filter" />
      <div className={s.filterInputs}>
        <div className={s.dateWrap}>
          <DateInput
            selectedDate={date}
            onChange={onDateChange}
            placeholder="Choose date"
          />
        </div>
        <Dropdown
          options={typesDropdownOptions}
          placeholder={activeType?.title ? '' : 'Message type'}
          className={s.dropdown}
          setActive={onDropdownChange}
          activeOption={activeType}
        />
      </div>
      <div className={s.filterButtons}>
        <Button value="Apply filters" className={s.button} onClick={setFilters} />
        <Button value="Clear" className={s.button} theme="transparent" onClick={clearFilters} />
      </div>
    </div>
  );
};

export default CosignatoryMessagesFilter;
