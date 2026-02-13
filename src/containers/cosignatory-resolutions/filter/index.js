import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Input from '../../../components/inputs/primary-input';
import Button from '../../../components/buttons/primary-button';
import { IC_FILTER } from '../../../constants/image.constants';
import { setResolutionsFilterConfig, setResolutionsSortConfig } from '../../../actions/cosignatory.actions';
// import ViewSwitcher from '../../../components/view-switcher';
import s from './filter.module.scss';
import { makeCosignatoryResolutionsSelector } from '../../../selectors/cosignatory.selectors';

const Filter = () => {
  const dispatch = useDispatch();
  const [companyValue, setCompanyValue] = useState('');
  const { resolutionsSortConfig: sortConfig } = useSelector(makeCosignatoryResolutionsSelector);
  const clearFilters = () => {
    setCompanyValue('');
    dispatch(setResolutionsFilterConfig({ name: '' }));
    dispatch(setResolutionsSortConfig(sortConfig.field, sortConfig.direction));
  };

  const setFilters = () => {
    dispatch(setResolutionsFilterConfig({ name: companyValue }));
    dispatch(setResolutionsSortConfig(sortConfig.field, sortConfig.direction));
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
            onChange={(e) => setCompanyValue(e.target.value)}
          />
        </div>
      </div>
      <div className={s.filterButtons}>
        <Button value="Apply filters" className={s.button} onClick={() => setFilters()} />
        <Button value="Clear" className={s.button} theme="transparent" onClick={clearFilters} />
      </div>
      {/* TODO: Back in next versions */}
      {/* <ViewSwitcher className={s.switcher} /> */}
    </div>
  );
};

export default Filter;
