import React, { useMemo, memo } from 'react';
import PropTypes from 'prop-types';
import { differenceInCalendarDays } from 'date-fns';
import cn from 'classnames';

import Avatars from '../avatars';

import { IC_ALERT } from '../../constants/image.constants';
import { RESOLUTION_STATUSES } from '../../constants/resolution.constants';
import { formatTimeToTimezone } from '../../helpers/functions.helper';

import s from './resolution-block.module.scss';

const ResolutionBlock = ({
  id,
  name,
  status,
  startDate,
  endDate,
  members,
  company,
  creator,
  emergency,
  isVoted,
}) => {

  const fullDuration = useMemo(() => differenceInCalendarDays(new Date(endDate), new Date(startDate)), [startDate, endDate]);

  const passedDuration = useMemo(() => differenceInCalendarDays(new Date(), new Date(startDate)), [startDate]);

  const progressPercentage = Math.trunc((passedDuration * 100) / fullDuration);

  return (
    <div className={cn(s.resolution, { [s.voted]: isVoted })}>
      <div className={s.topLine}>
        <span className={s.status}>
          {RESOLUTION_STATUSES[status]}
        </span>
        {emergency && <img className={s.icon} src={IC_ALERT} alt="alert" />}
      </div>
      <div className={s.name}>{name}</div>
      <div className={s.creationInfo}>
        {company && <span>{company}</span>}
        <span className={s.creationInfoDivider} />
        {creator && <span>{`${creator.name} ${creator.surname ?? ''}`}</span>}
      </div>
      <div className={s.progressWrap}>
        <div className={s.progressDates}>
          <span>{formatTimeToTimezone(startDate, 'MMM, D')}</span>
          <span>{formatTimeToTimezone(endDate, 'MMM, D')}</span>
        </div>
        <div className={s.progressBar}>
          <span className={s.progressCompleted} style={{ width: `${progressPercentage}%` }} />
        </div>
      </div>
      <div className={s.bottomLine}>
        <span className={s.resolutionId}>ID {id}</span>
        <Avatars list={members} />
      </div>
    </div>
  );
};

ResolutionBlock.propTypes = {
  name: PropTypes.string.isRequired,
  id: PropTypes.number.isRequired,
  status: PropTypes.string.isRequired,
  startDate: PropTypes.string.isRequired,
  endDate: PropTypes.string.isRequired,
  members: PropTypes.array,
  company: PropTypes.string,
  emergency: PropTypes.bool,
  creator: PropTypes.object,
  isVoted: PropTypes.bool,
};

ResolutionBlock.defaultProps = {
  members: [],
  company: '',
  emergency: false,
  isVoted: false,
  creator: null,
};

export default memo(ResolutionBlock);
