import React, { useState } from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import { format, parseISO } from 'date-fns';

import { IC_VOTING_FOR, IC_VOTING_ABSTAIN, IC_VOTING_AGAINST } from '../../constants/image.constants';
import { VOTE_STATUSES } from '../../constants/resolution.constants';
import { getInitials } from '../../helpers/account.helpers';

import s from './avatar-icon.module.scss';
import SizedImage from '../sized-image';

const AvatarIcon = ({
  avatar, name, surname, size, className, vote, time, isViewWithTime,
}) => {
  const [isOnHover, setOnHover] = useState(false);

  const getVotingIcon = (voteValue) => {
    switch (voteValue) {
      case VOTE_STATUSES.FOR:
        return IC_VOTING_FOR;
      case VOTE_STATUSES.ABSTAIN:
        return IC_VOTING_ABSTAIN;
      case VOTE_STATUSES.AGAINST:
        return IC_VOTING_AGAINST;
      default:
        return '';
    }
  };

  return (
    <div
      className={cn(s.avatar, className, s[size], { [s.onHover]: isOnHover && vote })}
      onMouseEnter={() => setOnHover(true)}
      onMouseLeave={() => setOnHover(false)}
    >
      {avatar
        ? <SizedImage width={28} height={28} src={avatar} alt="avatar" className={s.avatarIcon} />
        : <div className={s.avatarEmpty}>{getInitials(name, surname)}</div>}
      {((vote && isViewWithTime) || (vote && isOnHover)) && (
        <span className={cn(s.avatarVotingTime,
          { [s.for]: vote === VOTE_STATUSES.FOR },
          { [s.against]: vote === VOTE_STATUSES.AGAINST },
          { [s.abstain]: vote === VOTE_STATUSES.ABSTAIN })}
        >
          <img
            className={s.votingIcon}
            src={getVotingIcon(vote)}
            alt="voting"
          />
          {time && format(parseISO(time), 'hh:mm aaaa')}
        </span>
      )}
      {vote && !isViewWithTime && !isOnHover && (
        <span className={cn(s.avatarVotingMark,
          { [s.for]: vote === VOTE_STATUSES.FOR },
          { [s.against]: vote === VOTE_STATUSES.AGAINST },
          { [s.abstain]: vote === VOTE_STATUSES.ABSTAIN })}
        />
      )}
    </div>
  );
};

AvatarIcon.propTypes = {
  name: PropTypes.string,
  surname: PropTypes.string,
  size: PropTypes.oneOf(['sm', 'md', 'lg']),
  className: PropTypes.string,
  avatar: PropTypes.string,
  time: PropTypes.string,
  vote: PropTypes.string,
  isViewWithTime: PropTypes.bool,
};

AvatarIcon.defaultProps = {
  name: '',
  surname: '',
  size: 'md',
  className: '',
  avatar: '',
  time: null,
  vote: '',
  isViewWithTime: false,
};

export default AvatarIcon;
