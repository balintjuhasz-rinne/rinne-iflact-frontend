import React from 'react';
import PropTypes from 'prop-types';

import { getInitials } from '../../helpers/account.helpers';
import s from './user-avatar.module.scss';
import SizedImage from '../sized-image';

const UserAvatar = ({
  img, name, surname, isActive,
}) => (
  <div className={s.avatarWrap}>
    {!isActive && <div className={s.inactive}> </div>}
    {img
      ? <SizedImage height={228} width={228} src={img} alt="avatar" />
      : (
        <div className={s.initials}>
          <span>{getInitials(name, surname)}</span>
        </div>
      )}
  </div>
);

UserAvatar.propTypes = {
  img: PropTypes.string,
  name: PropTypes.string,
  surname: PropTypes.string,
  isActive: PropTypes.bool,
};

UserAvatar.defaultProps = {
  img: '',
  name: '',
  surname: '',
  isActive: true,
};

export default UserAvatar;
