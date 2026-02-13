import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import s from './table-cell.module.scss';

const TableCell = ({ className, children, alignment }) => (
  <div className={cn(className, s.cell, { [s[`${alignment}`]]: alignment })}>
    {children}
  </div>
);

TableCell.propTypes = {
  className: PropTypes.string,
  children: PropTypes.oneOfType([
    PropTypes.node,
    PropTypes.element,
  ]),
  alignment: PropTypes.oneOf(['', 'center', 'right']),
};

TableCell.defaultProps = {
  className: '',
  children: null,
  alignment: '',
};

export default TableCell;
