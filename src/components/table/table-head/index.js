import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';

import s from './table-head.module.scss';

const TableHead = ({ className, children }) => (
  <div className={cn(className, s.tableHead)}>
    {children}
  </div>
);

TableHead.propTypes = {
  className: PropTypes.string,
  children: PropTypes.oneOfType([
    PropTypes.node,
    PropTypes.element,
  ]),
};

TableHead.defaultProps = {
  className: '',
  children: null,
};

export default TableHead;
