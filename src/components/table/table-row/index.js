import React from 'react';
import cn from 'classnames';
import PropTypes from 'prop-types';

import s from './table-row.module.scss';

const TableRow = ({
  tag, className, children, ...props
}) => {
  const Tag = tag;
  return (
    <Tag className={cn(className, s.tableRow)} {...props}>
      {children}
    </Tag>
  );
};

TableRow.propTypes = {
  className: PropTypes.string,
  tag: PropTypes.string,
  children: PropTypes.oneOfType([
    PropTypes.node,
    PropTypes.element,
  ]),
};

TableRow.defaultProps = {
  className: '',
  children: null,
  tag: 'div',
};

export default TableRow;
