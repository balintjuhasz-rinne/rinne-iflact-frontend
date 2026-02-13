import React, { useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import PropTypes from 'prop-types';

import ResolutionStatisticsBlock from '../../../components/resolution-statistics-block';
import ResolutionChart from '../resolution-chart';

import { makeResolutionVotingSelector, getResolutionInfoSelector } from '../../../selectors/resolution.selectors';
import { showModal } from '../../../actions/modal.actions';
import { VOTED_COSIGNATORIES_MODAL } from '../../../constants/modal.constants';
import { RESOLUTION_TYPES_BACKEND, RESOLUTION_STATUSES_BACKEND } from '../../../constants/resolution.constants';
import { RESOLUTION_REPORT_PATH, RESOLUTION_REPORT } from '../../../constants/router.constants';
import { getVotingPercentage } from '../../../helpers/resolutions.helpers';
import { IC_DOWNLOAD } from '../../../constants/image.constants';
import { createDynamicPath } from '../../../helpers/url.helpers';

import s from './resolution-statistics.module.scss';
import Link from '../../../components/custom-link';

const ResolutionStatistics = ({ type }) => {
  const {
    threshold,
    cosignatories,
    cosignatoriesFor,
    cosignatoriesAgainst,
    cosignatoriesAbstain,
    cosignatoriesNotVoted,
  } = useSelector(makeResolutionVotingSelector);
  const {
    info: {
      comments, id, cancelReason, status,
    },
  } = useSelector(getResolutionInfoSelector);

  const dispatch = useDispatch();
  const isDirectorResolution = type === RESOLUTION_TYPES_BACKEND.BOARD_OF_DIRECTORS_RESOLUTION
  || type === RESOLUTION_TYPES_BACKEND.BOARD_OF_DIRECTORS_SPECIAL_RESOLUTION;
  // const needToApproveCount = useMemo(() => Math.round((cosignatories?.length * threshold) / 100), [threshold, cosignatories]);

  const onStatisticsBlockClick = useCallback((options) => {
    dispatch(showModal(VOTED_COSIGNATORIES_MODAL, {
      ...options,
      comments,
      threshold,
    }));
  }, [cosignatories, comments]);

  return (
    <div className={s.wrapper}>
      <div className={s.statisticsHeader}>
        <div className={s.headerWrap}>
          <h6 className={s.title}>Approval statistics</h6>
          <Link
            target="_blank"
            href={RESOLUTION_REPORT_PATH}
            as={createDynamicPath(RESOLUTION_REPORT, id)}
            className={s.link}
          >
            <img className={s.ic} src={IC_DOWNLOAD} alt="download" />
            Download a report
          </Link>
        </div>
        {isDirectorResolution
        && (
          <span className={s.subtitle}>{cosignatoriesFor.length} For Approvals received - from&nbsp;
            {threshold} needed out of {cosignatories?.length}
          </span>
        )}
      </div>
      <div className={s.statisticsBlocks}>
        <ResolutionStatisticsBlock
          title="Approve"
          count={cosignatoriesFor.length}
          users={cosignatoriesFor}
          onClick={() => onStatisticsBlockClick({
            cosignatories: cosignatoriesFor,
            percentage: getVotingPercentage(cosignatoriesFor, cosignatories, type, 2),
          })}
        />
        <ResolutionStatisticsBlock
          title="Reject"
          count={cosignatoriesAgainst.length}
          users={cosignatoriesAgainst}
          onClick={() => onStatisticsBlockClick({
            cosignatories: cosignatoriesAgainst,
            percentage: getVotingPercentage(cosignatoriesAgainst, cosignatories, type, 2),
            showVetoPower: true,
          })}
        />
        <ResolutionStatisticsBlock
          title="Abstain"
          count={cosignatoriesAbstain.length}
          users={cosignatoriesAbstain}
          onClick={() => onStatisticsBlockClick({
            cosignatories: cosignatoriesAbstain,
            percentage: getVotingPercentage(cosignatoriesAbstain, cosignatories, type, 2),
          })}
        />
        <ResolutionStatisticsBlock
          title="No action"
          count={cosignatoriesNotVoted.length}
          users={cosignatoriesNotVoted}
          onClick={() => onStatisticsBlockClick({
            cosignatories: cosignatoriesNotVoted,
            title: 'Users who not Voted',
            percentage: getVotingPercentage(cosignatoriesNotVoted, cosignatories, type, 2),
          })}
        />
      </div>
      <ResolutionChart />
      {!!cancelReason && RESOLUTION_STATUSES_BACKEND.Canceled === status && (
        <div className={s.textBlock}>
          <div className={s.key}>The reason of cancellation</div>
          <p className={s.text}>{cancelReason}</p>
        </div>
      )}
    </div>
  );
};

ResolutionStatistics.propTypes = {
  type: PropTypes.string,
};

ResolutionStatistics.defaultProps = {
  type: '',
};

export default ResolutionStatistics;
