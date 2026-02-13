import React from 'react';
import PropTypes from 'prop-types';

import AvatarIcon from '../avatar-icon';
import s from './avatars.module.scss';

const Avatars = ({ list }) => {
  const avatarsToShow = list.slice(0, 3);
  const avatarsRest = list.length - 3;
  return (
    <div className={s.wrap}>
      <div className={s.avatars}>
        {avatarsToShow.map((item) => (
          <AvatarIcon
            name={item?.name}
            surname={item?.surname}
            avatar={item?.avatar?.path}
            className={s.avatar}
            key={`${item.name}${item.surname}`}
          />
        ))}
      </div>
      {avatarsRest > 0 && <span className={s.rest}>+{avatarsRest}</span>}
    </div>
  );
};

Avatars.propTypes = {
  list: PropTypes.array.isRequired,
};

export default Avatars;
