import React from 'react';
import { useSelector } from 'react-redux';

import ResolutionChart from '../../../components/resolution-chart';

import { getResolutionInfoSelector, getChartFilters, makeVotingChartCosignatories } from '../../../selectors/resolution.selectors';

import s from './resolution-chart.module.scss';

const Chart = () => {
  const { info: { votingStartDate, votingEndDate } } = useSelector(getResolutionInfoSelector);
  const { filtersConfig } = useSelector(getChartFilters);
  const { cosignatories } = useSelector(makeVotingChartCosignatories);

  return (
    <div className={s.wrapper}>
      <div className={s.wrap}>
        <span className={s.title}>Approval process</span>
      </div>
      <ResolutionChart
        startDate={votingStartDate}
        endDate={votingEndDate}
        isReceivedVotesShown={filtersConfig.receivedVotes}
        isAllVotesShown={filtersConfig.allVotes}
        users={cosignatories}
      />
    </div>
  );
};

export default Chart;
