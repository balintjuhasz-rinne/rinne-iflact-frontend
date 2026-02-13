import React from 'react';
import PropTypes from 'prop-types';

import s from './table-head.module.scss';

const TableHead = ({ isNotVoted }) => (
  <div className={s.wrapper}>
    <div className={s.cell}>NAME</div>
    <div className={s.cell}>EMAIL</div>
    <div className={s.cell}>COMMENT</div>
    {isNotVoted && <div className={s.cell}>VOITING DATE</div>}
  </div>
);

TableHead.propTypes = {
  isNotVoted: PropTypes.bool,
};

TableHead.defaultProps = {
  isNotVoted: false,
};

export default TableHead;
