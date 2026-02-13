/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { forwardRef } from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';

import s from './checkbox.module.scss';

const Checkbox = forwardRef(({
  id, label, isChecked, className, type, align, ...props
}, ref) => (
  <div className={cn(className, s.formGroup, s[type])}>
    <input type="checkbox" id={id} className={s.input} checked={isChecked} {...props} ref={ref} />
    <label htmlFor={id} className={cn(s.label, { [s.alignLeft]: align === 'left' }, { [s.alignRight]: align === 'right' })}>
      {label && <span>{label}</span>}
    </label>
  </div>
));

Checkbox.propTypes = {
  id: PropTypes.string,
  label: PropTypes.string,
  isChecked: PropTypes.bool,
  onChange: PropTypes.func.isRequired,
  className: PropTypes.string,
  type: PropTypes.oneOf(['', 'gray']),
  align: PropTypes.oneOf(['left', 'right']),
};

Checkbox.defaultProps = {
  id: '',
  label: '',
  isChecked: false,
  className: '',
  type: '',
  align: 'left',
};

export default Checkbox;
