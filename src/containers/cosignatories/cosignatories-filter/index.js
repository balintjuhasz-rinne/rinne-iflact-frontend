import React, { useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllCompaniesNameAndId } from '../../../actions/companies.actions';
import { setCurrentPage, setFilterConfig, setSortConfig } from '../../../actions/cosignatories.actions';
import { showModal } from '../../../actions/modal.actions';
import Button from '../../../components/buttons/primary-button';
import Dropdown from '../../../components/dropdown';
import Input from '../../../components/inputs/primary-input';
import { IC_FILTER } from '../../../constants/image.constants';
import { ERROR_MODAL } from '../../../constants/modal.constants';
import { USER_STATUS_FILTER, USER_COSIGNATORY_DEFAULT_STATUS } from '../../../constants/user.constants';
import { getDropdownOption, normalizeError } from '../../../helpers/functions.helper';
import { makeSelectCosignatories } from '../../../selectors/cosignatories.selectors';
import s from './cosignatories-filter.module.scss';

const CosignatoriesFilter = () => {
  const [companyNames, setCompanyNames] = useState([]);
  const { filterConfig } = useSelector(makeSelectCosignatories);

  const dispatch = useDispatch();

  const dropdownCompaniesOptions = companyNames?.map((item) => ({ ...item, title: item.name, type: 'companyId' }));

  const dropdownStatusOptions = useMemo(() => Object.entries(USER_STATUS_FILTER).map((el) => ({
    id: el[0],
    title: el[1],
  })), []);

  const [name, setInputValue] = useState('');
  const [companySearchValue, setCompanySearchValue] = useState('');
  const [cosignatoriesStatusValue, setCosignatoriesStatusValue] = useState(USER_COSIGNATORY_DEFAULT_STATUS);

  useEffect(() => {
    setInputValue(filterConfig.name);
    const selectedCompany = companyNames?.find(({ id }) => id === +filterConfig.companyId);
    setCompanySearchValue({ title: selectedCompany?.name, id: selectedCompany?.id });
    setCosignatoriesStatusValue(dropdownStatusOptions.find(({ id }) => id === filterConfig.status) || USER_COSIGNATORY_DEFAULT_STATUS);
  }, [filterConfig, companyNames]);

  const onInputChange = (e) => {
    setInputValue(e.target.value);
  };
  const onDropdownChange = (id) => {
    setCompanySearchValue(getDropdownOption(dropdownCompaniesOptions, id));
  };

  const onDropdownStatusChange = (id) => {
    setCosignatoriesStatusValue(getDropdownOption(dropdownStatusOptions, id) || USER_COSIGNATORY_DEFAULT_STATUS);
  };

  const onDropdownSearch = (e) => {
    setCompanySearchValue({ title: e.target.value });
  };

  const setFilters = () => {
    dispatch(setCurrentPage());
    dispatch(setFilterConfig({
      ...(name && { name }),
      ...(companySearchValue?.id && { companyId: companySearchValue?.id }),
      ...(cosignatoriesStatusValue?.id && { status: cosignatoriesStatusValue?.id }),
    }));
  };

  const clearFilters = () => {
    setCompanySearchValue(null);
    setInputValue('');
    setCosignatoriesStatusValue(USER_COSIGNATORY_DEFAULT_STATUS);
    dispatch(setFilterConfig());
    dispatch(setSortConfig());
    dispatch(setCurrentPage());
  };

  useEffect(() => {
    (async () => {
      try {
        const companyNamesAndId = await getAllCompaniesNameAndId();
        setCompanyNames(companyNamesAndId);
      } catch (e) {
        const error = normalizeError(e);
        dispatch(showModal(ERROR_MODAL, { error }));
      }
    })();
  }, []);

  return (
    <div className={s.cosignatoriesFilter}>
      <img className={s.filterIcon} src={IC_FILTER} alt="filter" />
      <div className={s.filterInputs}>
        <div className={s.inputWrap}>
          <Input
            placeholder="Name"
            className={s.input}
            value={name}
            onChange={(e) => onInputChange(e)}
          />
        </div>
        <Dropdown
          options={dropdownCompaniesOptions}
          placeholder={companySearchValue?.title ? '' : 'Choose company'}
          className={s.dropdown}
          setActive={onDropdownChange}
          isSearchable
          onSearch={onDropdownSearch}
          searchValue={companySearchValue?.title}
        />
        <Dropdown
          options={dropdownStatusOptions}
          placeholder="All users "
          className={s.dropdown}
          setActive={onDropdownStatusChange}
          activeOption={cosignatoriesStatusValue}
        />
      </div>
      <div className={s.filterButtons}>
        <Button value="Apply filters" className={s.button} onClick={setFilters} />
        <Button value="Clear" className={s.button} theme="transparent" onClick={clearFilters} />
      </div>
    </div>
  );
};

export default CosignatoriesFilter;
