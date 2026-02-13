import React, { useState } from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import { USER_STATUS } from '../../constants/user.constants';
import { transformPositionsToString } from '../../helpers/account.helpers';
import { IC_ARROW_DOWN } from '../../constants/image.constants';
import SortIcon from '../icons/sort-icon';
import InactiveUserTab from '../user-inactive';
import AvatarIcon from '../avatar-icon';

import s from './users.module.scss';

const UsersPanelDropdown = ({
  name: companyName, users, className,
}) => {

  const [isOpen, setIsOpen] = useState(true);

  return (
    <div className={cn(className, s.wrap)}>
      <button
        className={s.trigger}
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className={s.company} title={companyName}>
          {companyName}
          <b className={s.count}>({users.length})</b>
        </span>
        <SortIcon active={isOpen} icon={IC_ARROW_DOWN} />
      </button>
      {isOpen && (
        <div className={s.list}>
          {users.map(({
            id, name, surname, avatar, status, workplace: { positions, votingValue },
          }) => (
            <div key={id} className={s.item}>
              <AvatarIcon avatar={avatar?.path} size="lg" name={name} surname={surname} />
              <div className={s.info}>
                <div>
                  <span className={s.name}>{name} {surname}</span>
                  {status === USER_STATUS.INACTIVE && <InactiveUserTab text="Inactive" /> }
                </div>
                <span className={s.position}>
                  {transformPositionsToString(positions)}
                  {votingValue && <span className={s.voting}>{votingValue}%</span>}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

UsersPanelDropdown.propTypes = {
  name: PropTypes.string.isRequired,
  className: PropTypes.string,
  users: PropTypes.array,
};

UsersPanelDropdown.defaultProps = {
  className: '',
  users: [],
};

export default UsersPanelDropdown;
