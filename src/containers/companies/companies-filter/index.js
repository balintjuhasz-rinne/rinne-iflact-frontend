import React, { useState, useCallback } from 'react';
import { useDispatch } from 'react-redux';
import PropTypes from 'prop-types';

import Input from '../../../components/inputs/primary-input';
import Button from '../../../components/buttons/primary-button';

import { IC_FILTER } from '../../../constants/image.constants';
import { setCompaniesCurrentPage } from '../../../actions/companies.actions';

import s from './companies-filter.module.scss';

const CompaniesFilter = ({ changeSearchText }) => {
  const dispatch = useDispatch();
  const [companyValue, setCompanyValue] = useState('');

  const clearFilters = () => {
    setCompanyValue('');
    changeSearchText('');
    dispatch(setCompaniesCurrentPage(1));
  };

  const setFilters = () => {
    changeSearchText(companyValue);
    dispatch(setCompaniesCurrentPage(1));
  };

  return (
    <div className={s.filter}>
      <img className={s.filterIcon} src={IC_FILTER} alt="filter" />
      <div className={s.filterInputs}>
        <div className={s.inputWrap}>
          <Input
            placeholder="Company"
            className={s.input}
            value={companyValue}
            onChange={useCallback((e) => setCompanyValue(e.target.value), [])}
          />
        </div>
      </div>
      <div className={s.filterButtons}>
        <Button value="Apply filters" className={s.button} onClick={() => setFilters()} />
        <Button value="Clear" className={s.button} theme="transparent" onClick={clearFilters} />
      </div>
    </div>
  );
};

CompaniesFilter.propTypes = {
  changeSearchText: PropTypes.func,
};

CompaniesFilter.defaultProps = {
  changeSearchText: () => {},
};

export default CompaniesFilter;
