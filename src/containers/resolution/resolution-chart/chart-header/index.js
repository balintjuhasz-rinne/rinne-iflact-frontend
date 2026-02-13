import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import ChartCheckbox from '../../../../components/inputs/chart-checkbox';

import { setChartFilters } from '../../../../actions/resolution.actions';
import { getChartFilters } from '../../../../selectors/resolution.selectors';

import s from './chart-header.module.scss';

const ChartHeader = () => {
  const dispatch = useDispatch();
  const { filtersConfig } = useSelector(getChartFilters);

  const [checkboxes, setCheckboxes] = useState({
    receivedVotes: filtersConfig.receivedVotes,
    allVotes: filtersConfig.allVotes,
  });

  const onCheckboxChange = (name) => {
    const keys = Object.keys(checkboxes);
    if (keys.find((item) => (item === name))) {
      const newCheckboxes = {
        ...checkboxes,
        [name]: !checkboxes[name],
      };
      dispatch(setChartFilters(newCheckboxes));
      setCheckboxes(newCheckboxes);
    }
  };

  return (
    <div className={s.wrapper}>
      <span className={s.title}>Approval process</span>
      <div className={s.checkboxes}>
        <ChartCheckbox
          label="Votes received"
          id="reveivedVotes"
          color="orange"
          wrapClassName={s.checkboxWrap}
          className={s.checkbox}
          onChange={() => onCheckboxChange('receivedVotes')}
          checked={checkboxes.receivedVotes}
        />
        <ChartCheckbox
          label="Votes needed"
          id="allVotes"
          color="gray"
          wrapClassName={s.checkboxWrap}
          onChange={() => onCheckboxChange('allVotes')}
          className={s.checkbox}
          checked={checkboxes.allVotes}
        />
      </div>
    </div>
  );
};

export default ChartHeader;
