import PropTypes from 'prop-types';
import React from 'react';
import AvatarIcon from '../avatar-icon';
import s from './user-log-preview.module.scss';

const UserLogPreview = ({ relatedUser }) => (
  <>
    <AvatarIcon
      avatar={relatedUser.avatar?.path}
      name={relatedUser.name}
      surname={relatedUser.surname}
    />
    <span className={s.name}>{`${relatedUser.name} ${
      relatedUser.surname ?? ''
    }`}
    </span>
  </>
);

UserLogPreview.propTypes = {
  relatedUser: PropTypes.object.isRequired,
};

export default UserLogPreview;
