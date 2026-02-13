import endOfDay from 'date-fns/endOfDay';
import startOfDay from 'date-fns/startOfDay';
import { useRouter } from 'next/router';
import React, { useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllCompaniesNameAndId } from '../../../actions/companies.actions';
import { showModal } from '../../../actions/modal.actions';
import { setFilterConfig, setSortConfig, setCurrentPage } from '../../../actions/resolutions.actions';
import Button from '../../../components/buttons/primary-button';
import Dropdown from '../../../components/dropdown';
import { prepareTypesToRedux, onTypesChange, onTypesInit } from '../../../helpers/resolutions.helpers';
import DropdownWithDivide from '../../../components/dropdown/with-divide';
import Checkbox from '../../../components/inputs/checkbox';
import DateRangeInput from '../../../components/inputs/date-input/range';
import DateRangeInputWithDropdown from '../../../components/inputs/date-input/range-with-dropdown';
import ViewSwitcher from '../../../components/view-switcher';
import { ERROR_MODAL } from '../../../constants/modal.constants';
import { RESOLUTIONS_CLOSED_DATES, RESOLUTIONS_TYPES_FILTER, RESOLUTION_STATUSES } from '../../../constants/resolution.constants';
import { USER_ROLES } from '../../../constants/user.constants';
import { getDropdownOption, normalizeError, prepareDropdownOption } from '../../../helpers/functions.helper';
import { makeResolutionsSelector } from '../../../selectors/resolutions.selectors';
import { getUserRoleSelector } from '../../../selectors/user.selectors';
import s from './resolutions-filter.module.scss';

const ResolutionsFilter = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const {
    status, searchString, resolutionId, companyId, types,
  } = router.query;

  const { filterConfig, ids } = useSelector(makeResolutionsSelector);
  const { role } = useSelector(getUserRoleSelector);
  const [resolutionsTypes, setResolutionsTypes] = useState(onTypesInit(types));

  const dropdownEndTypeOptions = useMemo(() => prepareDropdownOption(RESOLUTIONS_CLOSED_DATES), []);

  const [resolutionsEndType, setResolutionsEndType] = useState(dropdownEndTypeOptions[0]);

  useEffect(() => {
    setResolutionsEndType(getDropdownOption(
      dropdownEndTypeOptions,
      filterConfig.endDateFrom ? 'endDate' : 'resolveDateFrom',
    ) || dropdownEndTypeOptions[0]);
  }, [filterConfig.endDateFrom, filterConfig.resolveDateFrom]);
  const [companyNames, setCompanyNames] = useState([]);
  const [searchValue, setSearchValue] = useState(null);

  const [needToVote, setNeedToVote] = useState(false);
  const [votingStartDate, setVotingStartDate] = useState(null);
  const [votingEndDate, setVotingEndDate] = useState(null);

  useEffect(() => {
    if (filterConfig.isVote === false) {
      setNeedToVote(true);
    }
  }, [filterConfig.isVote]);

  useEffect(() => {
    if (!filterConfig.startDateFrom) return;
    setVotingStartDate(startOfDay(new Date(filterConfig.startDateFrom)));
    if (!filterConfig.startDateTo) return;
    setVotingEndDate(endOfDay(new Date(filterConfig.startDateTo)));
  }, [filterConfig.startDateFrom, filterConfig.startDateTo]);

  const [resolveStartDate, setResolveStartDate] = useState(filterConfig[`${resolutionsEndType.id}From`] || null);
  const [resolveEndDate, setResolveEndDate] = useState(filterConfig[`${resolutionsEndType.id}To`] || null);
  useEffect(() => {
    if (!filterConfig.resolveDateFrom && !filterConfig.endDateFrom) return;
    setResolveStartDate(startOfDay(new Date(filterConfig.resolveDateFrom || filterConfig.endDateFrom)));
    if (!filterConfig.resolveDateTo && !filterConfig.endDateTo) return;
    setResolveEndDate(endOfDay(new Date(filterConfig.resolveDateTo || filterConfig.endDateTo)));
  }, [
    filterConfig.resolveDateFrom,
    filterConfig.resolveDateTo,
    filterConfig.endDateFrom,
    filterConfig.endDateTo,
    resolutionsEndType.id,
  ]);

  const dropdownOptions = {
    resolutions: ids?.map((item) => ({ id: item, title: item.toString(), type: 'resolutionId' })),
    companies: companyNames?.map((item) => ({ ...item, title: item.name, type: 'companyId' })),
  };

  const onSearchDropdownChange = (obj) => {
    setSearchValue(obj);
  };

  const onDropdownSearch = (e) => {
    setSearchValue({ title: e.target.value });
  };

  const onDateChange = (dates, setStartDate, setEndDate) => {
    const [start, end] = dates;
    setStartDate(start);
    setEndDate(end ?? null);
  };

  const onDropdownChange = (id, options, setState) => {
    setState(getDropdownOption(options, id));
  };

  const setFilters = () => {
    dispatch(setCurrentPage());
    const preparedTypes = prepareTypesToRedux(resolutionsTypes);
    dispatch(setFilterConfig({
      ...(searchValue?.type && { [searchValue.type]: searchValue.id }),
      ...(searchValue?.title && { searchString: searchValue.title }),
      ...(votingStartDate && {
        startDateFrom: startOfDay(votingStartDate, true).toISOString(),
        startDateTo: endOfDay(votingEndDate ?? votingStartDate).toISOString(),
      }),
      ...(resolveStartDate && {
        [`${resolutionsEndType.id}From`]: startOfDay(resolveStartDate, true).toISOString(),
        [`${resolutionsEndType.id}To`]: endOfDay(resolveEndDate ?? resolveStartDate).toISOString(),
      }),
      ...(preparedTypes?.length && { types: preparedTypes }),
      ...(needToVote && { isVote: !needToVote }),
      ...(filterConfig.status && { status: filterConfig.status }),
    }));
  };

  const clearFilters = () => {
    setSearchValue(null);
    setResolutionsTypes(RESOLUTIONS_TYPES_FILTER);
    setResolutionsEndType(dropdownEndTypeOptions[0]);
    setVotingStartDate(null);
    setVotingEndDate(null);
    setResolveStartDate(null);
    setResolveEndDate(null);
    setNeedToVote(false);
    dispatch(setFilterConfig());
    dispatch(setSortConfig());
    dispatch(setCurrentPage());
  };

  useEffect(() => {
    (async () => {
      try {
        const companyNamesAndId = await getAllCompaniesNameAndId();
        setCompanyNames(companyNamesAndId);
        if (!searchString) return;
        setSearchValue({
          id: resolutionId || companyId,
          title: resolutionId || companyNamesAndId.find(({ id }) => id === +companyId)?.name,
          ...resolutionId && { type: 'resolutionId' },
          ...companyId && { type: 'companyId' },
        });
      } catch (e) {
        const error = normalizeError(e);
        dispatch(showModal(ERROR_MODAL, { error }));
      }
    })();
  }, []);

  return (
    <div className={s.filter}>
      <div className={s.filterInputs}>
        <DropdownWithDivide
          options={dropdownOptions}
          placeholder={searchValue?.title ? '' : 'Company name, contract ID'}
          className={s.searchDropdown}
          setActive={onSearchDropdownChange}
          isSearchable
          isAttached={false}
          onSearch={onDropdownSearch}
          searchValue={searchValue?.title}
        />
        <Dropdown
          options={resolutionsTypes}
          className={s.dropdown}
          activeOption={resolutionsTypes}
          setActive={(id) => setResolutionsTypes(onTypesChange(id, resolutionsTypes))}
          isMultiple
          isAttached={false}
          placeholder="Contract type"
        />
        <DateRangeInput
          selected={votingStartDate}
          startDate={votingStartDate}
          endDate={votingEndDate}
          wrapClassName={s.date}
          onChange={(dates) => onDateChange(dates, setVotingStartDate, setVotingEndDate)}
          yarn
          placeholder="Contract Date range"
          shouldCloseOnSelect={false}
        />
        <DateRangeInputWithDropdown
          selected={resolveStartDate}
          dropdownOptions={dropdownEndTypeOptions}
          activeOption={resolutionsEndType}
          onDropdownChange={(id) => onDropdownChange(id, dropdownEndTypeOptions, setResolutionsEndType)}
          startDate={resolveStartDate}
          endDate={resolveEndDate}
          wrapClassName={s.date}
          onChange={(dates) => onDateChange(dates, setResolveStartDate, setResolveEndDate)}
          shouldCloseOnSelect={false}
        />
        {(role === USER_ROLES.CO_SIGNATORY && status !== RESOLUTION_STATUSES.Upcoming)
          && (
            <Checkbox
              label="Task for me"
              type="gray"
              id="needVote"
              checked={needToVote}
              onChange={() => setNeedToVote(!needToVote)}
              className={s.checkbox}
            />
          )}
      </div>
      <div className={s.wrap}>
        <div className={s.filterButtons}>
          <Button value="Apply filters" className={s.button} onClick={setFilters} />
          <Button value="Clear" className={s.button} theme="transparent" onClick={clearFilters} />
        </div>
        <ViewSwitcher className={s.switcher} />
      </div>
    </div>
  );
};

export default ResolutionsFilter;
