import endOfDay from 'date-fns/endOfDay';
import startOfDay from 'date-fns/startOfDay';
import React, { useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setCompanyResolutionsFilter } from '../../../../actions/company.actions';
import Button from '../../../../components/buttons/primary-button';
import Dropdown from '../../../../components/dropdown';
import DateRangeInput from '../../../../components/inputs/date-input/range';
import DateRangeInputWithDropdown from '../../../../components/inputs/date-input/range-with-dropdown';
import Input from '../../../../components/inputs/primary-input';
import {
  RESOLUTIONS_CLOSED_DATES,
  RESOLUTIONS_STATUSES_FILTER,
  RESOLUTIONS_TYPES_FILTER,
  RESOLUTION_STATUSES_BACKEND,
} from '../../../../constants/resolution.constants';
import { getDropdownOption, prepareDropdownOption } from '../../../../helpers/functions.helper';
import { onTypesChange } from '../../../../helpers/resolutions.helpers';
import { getCompanyResolutionsSelector } from '../../../../selectors/company.selectors';
import s from './statistics-filter.module.scss';

const StatisticsFilter = () => {

  const dispatch = useDispatch();
  const { filterConfig } = useSelector(getCompanyResolutionsSelector);

  const dropdownEndTypeOptions = useMemo(() => prepareDropdownOption(RESOLUTIONS_CLOSED_DATES), []);
  const dropdownStatusOptions = useMemo(() => prepareDropdownOption(RESOLUTIONS_STATUSES_FILTER), []);

  const [inputValue, setInputValue] = useState('');
  const [resolutionsType, setResolutionsType] = useState(RESOLUTIONS_TYPES_FILTER);
  const [resolutionsStatus, setResolutionsStatus] = useState(
    getDropdownOption(dropdownStatusOptions, filterConfig.status) || dropdownStatusOptions[0],
  );
  const endTypeId = filterConfig.endDateFrom ? 'endDate' : filterConfig.resolveDateFrom ? 'resolveDateFrom' : null;
  const [resolutionsEndType, setResolutionsEndType] = useState(
    getDropdownOption(dropdownEndTypeOptions, endTypeId) || dropdownEndTypeOptions[0],
  );
  const [creationStartDate, setCreationStartDate] = useState(filterConfig.creationDateFrom || null);
  const [creationEndDate, setCreationEndDate] = useState(filterConfig.creationDateTo || null);
  const [votingStartDate, setVotingStartDate] = useState(filterConfig.startDateFrom || null);
  const [votingEndDate, setVotingEndDate] = useState(filterConfig.startDateTo || null);
  const [resolveStartDate, setResolveStartDate] = useState(filterConfig[`${resolutionsEndType.id}From`] || null);
  const [resolveEndDate, setResolveEndDate] = useState(filterConfig[`${resolutionsEndType.id}To`] || null);

  const onInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const onDropdownChange = (id, options, setState) => {
    setState(getDropdownOption(options, id));
  };

  const setFilters = () => {
    dispatch(setCompanyResolutionsFilter({
      resolutionIdentity: inputValue,
      status: RESOLUTION_STATUSES_BACKEND[resolutionsStatus?.id],
      ...(creationStartDate && {
        creationDateFrom: startOfDay(creationStartDate, true),
        creationDateTo: endOfDay(creationEndDate ?? creationStartDate),
      }),
      ...(votingStartDate && {
        startDateFrom: startOfDay(votingStartDate, true),
        startDateTo: endOfDay(votingEndDate ?? votingStartDate),
      }),
      ...(resolveStartDate && {
        [`${resolutionsEndType.id}From`]: startOfDay(resolveStartDate, true),
        [`${resolutionsEndType.id}To`]: endOfDay(resolveEndDate ?? resolveStartDate),
      }),
      types: resolutionsType.map(({ isActive, id }) => (isActive ? id : '')).filter(Boolean),
    }));
  };

  const onDateChange = (dates, setStartDate, setEndDate) => {
    const [start, end] = dates;
    setStartDate(start);
    setEndDate(end ?? null);
  };

  const clearFilters = () => {
    setInputValue('');
    setResolutionsType(RESOLUTIONS_TYPES_FILTER);
    setResolutionsStatus(dropdownStatusOptions[0]);
    setResolutionsEndType(dropdownEndTypeOptions[0]);
    setCreationStartDate(null);
    setCreationEndDate(null);
    setVotingStartDate(null);
    setVotingEndDate(null);
    setResolveStartDate(null);
    setResolveEndDate(null);
    dispatch(setCompanyResolutionsFilter({}));
  };

  useEffect(() => {
    window.addEventListener('beforeunload', clearFilters());
    return () => window.removeEventListener('beforeunload', clearFilters());
  }, []);

  return (
    <div className={s.statisticsFilter}>
      <div className={s.filterInputs}>
        <Input
          placeholder="Document ID, name"
          wrapClassName={s.inputWrap}
          className={s.input}
          value={inputValue}
          onChange={(e) => onInputChange(e)}
        />
        <DateRangeInput
          selectedDate={creationStartDate}
          startDate={creationStartDate}
          endDate={creationEndDate}
          wrapClassName={s.date}
          onChange={(dates) => onDateChange(dates, setCreationStartDate, setCreationEndDate)}
          placeholder="Creation date range"
          shouldCloseOnSelect={false}
        />
        <DateRangeInput
          selectedDate={votingStartDate}
          startDate={votingStartDate}
          endDate={votingEndDate}
          wrapClassName={s.date}
          onChange={(dates) => onDateChange(dates, setVotingStartDate, setVotingEndDate)}
          placeholder="Contract Date range"
          shouldCloseOnSelect={false}
        />
        <DateRangeInputWithDropdown
          dropdownOptions={dropdownEndTypeOptions}
          activeOption={resolutionsEndType}
          onDropdownChange={(id) => onDropdownChange(id, dropdownEndTypeOptions, setResolutionsEndType)}
          selectedDate={resolveStartDate}
          startDate={resolveStartDate}
          endDate={resolveEndDate}
          wrapClassName={s.date}
          onChange={(dates) => onDateChange(dates, setResolveStartDate, setResolveEndDate)}
          shouldCloseOnSelect={false}
        />
        <Dropdown
          options={resolutionsType}
          className={s.dropdown}
          setActive={(id) => setResolutionsType(onTypesChange(id, resolutionsType))}
          activeOption={resolutionsType}
          isMultiple
          isAttached={false}
          placeholder="Contract type"
        />
        <Dropdown
          options={dropdownStatusOptions}
          className={s.dropdown}
          setActive={(id) => onDropdownChange(id, dropdownStatusOptions, setResolutionsStatus)}
          activeOption={resolutionsStatus}
          isAttached={false}
        />
      </div>
      <div className={s.filterButtons}>
        <Button value="Apply filters" className={s.button} onClick={setFilters} />
        <Button value="Clear" className={s.button} theme="transparent" onClick={clearFilters} />
      </div>
    </div>
  );
};

export default StatisticsFilter;
