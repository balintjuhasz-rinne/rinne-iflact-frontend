import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';

import SortIconSvg from '../../icons/sort-icon-svg';

import s from './table-head-cell.module.scss';

const TableHeadCell = ({
  className, children, isSortable, alignment, isActiveUp, isActiveDown, ...props
}) => {
  const Tag = isSortable ? 'button' : 'div';
  return (
    <div className={cn(className, s.cell, { [s[`${alignment}`]]: alignment })}>
      <Tag {...props} className={s.cellChild}>
        {children}
        {isSortable && (
          <div className={s.sortIcons}>
            <SortIconSvg className={cn({ [s.active]: isActiveUp })} />
            <SortIconSvg className={cn({ [s.active]: isActiveDown })} />
          </div>
        )}
      </Tag>
    </div>
  );

};

TableHeadCell.propTypes = {
  className: PropTypes.string,
  children: PropTypes.oneOfType([
    PropTypes.node,
    PropTypes.element,
  ]),
  isSortable: PropTypes.bool,
  alignment: PropTypes.oneOf(['', 'center', 'right']),
  isActiveUp: PropTypes.bool,
  isActiveDown: PropTypes.bool,
};

TableHeadCell.defaultProps = {
  className: '',
  children: null,
  isSortable: true,
  alignment: '',
  isActiveUp: false,
  isActiveDown: false,
};

export default TableHeadCell;
