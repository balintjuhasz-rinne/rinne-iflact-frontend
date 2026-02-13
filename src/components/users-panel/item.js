import PropTypes from 'prop-types';
import React from 'react';
import { USER_STATUS } from '../../constants/user.constants';
import AvatarIcon from '../avatar-icon';
import InactiveUserTab from '../user-inactive';
import s from './users.module.scss';

const Item = ({
  name, surname, avatar, status, position, votingValue, isDirectorsResolution, registrationCompleted, shouldShowPending,
}) => (
  <div className={s.item}>
    <AvatarIcon avatar={avatar?.path} size="lg" name={name} surname={surname} />
    <div className={s.info}>
      <div>
        <span className={s.name}>{name} {surname}</span>
        {status === USER_STATUS.INACTIVE && <InactiveUserTab text="Inactive" /> }
      </div>
      <span className={s.position}>
        {
          (registrationCompleted || !shouldShowPending)
            ? (
              <>
                {position}
                {votingValue && !isDirectorsResolution && <span className={s.voting}>{votingValue}%</span>}
              </>
            ) : 'Pending'
        }
      </span>
    </div>
  </div>
);

Item.propTypes = {
  name: PropTypes.string.isRequired,
  surname: PropTypes.string,
  avatar: PropTypes.object,
  status: PropTypes.string,
  position: PropTypes.string,
  votingValue: PropTypes.number,
  isDirectorsResolution: PropTypes.bool,
  registrationCompleted: PropTypes.bool,
  shouldShowPending: PropTypes.bool,
};

Item.defaultProps = {
  surname: '',
  avatar: {},
  status: '',
  position: '',
  votingValue: null,
  isDirectorsResolution: false,
  registrationCompleted: false,
  shouldShowPending: true,
};

export default Item;
