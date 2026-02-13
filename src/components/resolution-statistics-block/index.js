import React, { memo } from 'react';
import PropTypes from 'prop-types';
import Avatars from '../avatars';

import s from './resolution-statistics-block.module.scss';

const ResolutionStatisticsBlock = ({
  title, count, users, onClick,
}) => (
  <button className={s.block} onClick={onClick}>
    <h4 className={s.title}>{`${count}`}</h4>
    <span className={s.subtitle}>{title}</span>
    <Avatars list={users} />
  </button>
);

ResolutionStatisticsBlock.propTypes = {
  title: PropTypes.string,
  count: PropTypes.number,
  users: PropTypes.array,
  onClick: PropTypes.func,
};

ResolutionStatisticsBlock.defaultProps = {
  count: 0,
  title: '',
  users: [],
  onClick: () => {},
};

export default memo(ResolutionStatisticsBlock);
