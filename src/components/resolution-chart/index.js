import React, { useState, useMemo, useEffect } from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import {
  eachDayOfInterval, format, getUnixTime, addDays, endOfDay, startOfDay, parseISO,
} from 'date-fns';

import Avatar from '../avatar-icon';

import s from './chart.module.scss';

const CHART_INTERVALS_LENGTH = 7;
const CHART_OFFSET = 10;

const ResolutionChart = ({
  startDate, endDate, isReceivedVotesShown, isAllVotesShown, users,
}) => {
  const [scale, setScale] = useState(1);

  const dateRange = useMemo(() => eachDayOfInterval(
    { start: new Date(startDate), end: addDays(new Date(endDate), 1) },
  )
    .map((item, id, arr) => {
      const showIndicator = Math.trunc(arr.length / CHART_INTERVALS_LENGTH / scale);
      return {
        date: format(item, 'dd MMM'),
        position: Math.trunc((id / (arr.length - 1)) * 100),
        shouldDisplay: arr.length >= CHART_INTERVALS_LENGTH ? (id % showIndicator) === 0 : true,
      };
    }),
  [startDate, endDate, scale]);

  users.sort((a, b) => new Date(a.voteDate).getTime() - new Date(b.voteDate).getTime());

  const groupedUsers = useMemo(() => users.reduce((acc, item) => {

    const voteDate = format(new Date(item.voteDate), 'dd MMM aaaa');
    if (acc[voteDate]) {
      acc[voteDate].users.push(item);
    } else {
      acc[voteDate] = {};
      acc[voteDate].users = [];
      acc[voteDate].users.push(item);
    }
    acc[voteDate].users.sort((a, b) => new Date(b.voteDate).getTime() - new Date(a.voteDate).getTime());
    return acc;
  }, {}), [users]);

  const currentTimestamp = getUnixTime(new Date());
  const startTimestamp = getUnixTime(new Date(startDate));
  const endTimestamp = getUnixTime(new Date(endDate));
  const startDayTimestamp = getUnixTime(startOfDay(new Date(startDate)));
  const endDayTimestamp = getUnixTime(endOfDay(new Date(endDate)));

  const startDateOffset = useMemo(() => (Math.abs(startTimestamp - startDayTimestamp) / (endDayTimestamp - startDayTimestamp)) * 100,
    [startDate, endDate]);
  const endDateOffset = useMemo(() => (Math.abs(endDayTimestamp - endTimestamp) / (endDayTimestamp - startDayTimestamp)) * 100,
    [startDate, endDate]);
  const currentPosition = useMemo(() => (Math.abs(currentTimestamp - startDayTimestamp) / (endDayTimestamp - startDayTimestamp)) * 100,
    [startDate, endDate]);
  const userPosition = (voteDate) => ((getUnixTime(parseISO(voteDate)) - startDayTimestamp) / (endDayTimestamp - startDayTimestamp)) * 100;

  const userOffset = (id, voteDate) => {
    const DateUsers = groupedUsers[format(new Date(voteDate), 'dd MMM aaaa')].users;
    return DateUsers.indexOf(DateUsers.find((el) => (el.id === id)));
  };

  useEffect(() => {
    const scaleValue = Math.floor(dateRange.length / (CHART_INTERVALS_LENGTH * 2));
    setScale(scaleValue > 0 ? scaleValue : 1);
  }, [startDate, endDate]);

  return (
    <div
      className={cn(s.chartWrapper, { [s.isScrollable]: scale > 1 })}
    >
      <div
        className={s.wrapper}
        style={{
          width: `${scale * 100}%`,
        }}
      >
        <div className={s.dateAxis}>
          <div>
            {dateRange.map(({ shouldDisplay, position, date }) => (
              <span
                className={cn(s.axisDate, { [s.isHidden]: !shouldDisplay })}
                style={{
                  left: dateRange.length > 1 ? `${position}%` : '50%',
                }}
                key={date}
              >
                {date}
              </span>
            ))}
          </div>
        </div>
        {currentPosition <= 100 && currentTimestamp >= startTimestamp && (
          <div
            className={s.currentProcessLine}
            style={{
              width: `calc(${currentPosition}% - ${startDateOffset}%)`,
              left: `${startDateOffset}%`,
            }}
          />
        )}
        {isAllVotesShown && (
          <div
            className={s.fullProcessLine}
            style={{
              width: `calc(100% - ${startDateOffset}% - ${endDateOffset}%)`,
              left: `${startDateOffset}%`,
            }}
          />
        )}
        {(currentPosition <= 100 && currentPosition >= 0 && currentTimestamp >= startTimestamp) && (
          <div
            className={s.currentDate}
            style={{
              left: `calc(${currentPosition}% )`,
            }}
          >
            <span>Today</span>
            <span className={s.currentDateMark} />
          </div>
        )}
        {isReceivedVotesShown && users.map(({
          name, surname, avatar, voteDate, vote, id,
        }) => (
          <div
            key={id}
            className={s.users}
            style={{ left: `calc(${userPosition(voteDate)}% - ${userOffset(id, voteDate)} * ${CHART_OFFSET}px)` }}
          >
            <Avatar
              name={name}
              surname={surname}
              avatar={avatar?.path}
              className={s.avatar}
              vote={vote}
              time={voteDate}
              isViewWithTime={userOffset(id, voteDate) === 0}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

ResolutionChart.propTypes = {
  startDate: PropTypes.string,
  endDate: PropTypes.string,
  isReceivedVotesShown: PropTypes.bool,
  isAllVotesShown: PropTypes.bool,
  users: PropTypes.array.isRequired,
};

ResolutionChart.defaultProps = {
  startDate: null,
  endDate: null,
  isReceivedVotesShown: true,
  isAllVotesShown: true,
};

export default ResolutionChart;
