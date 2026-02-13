import React, { forwardRef } from 'react';
import cn from 'classnames';
import PropTypes from 'prop-types';

import s from './primary-input.module.scss';

const PrimaryInput = forwardRef(({
  label, className, wrapClassName, name, error, success, ...props
}, ref) => (
  <div className={cn(wrapClassName, s.wrap)}>
    {label && <label htmlFor={name} className={s.label}>{label}</label>}
    <input
      {...props}
      id={name}
      className={cn(
        s.input, className, { [s.error]: error, [s.success]: success },
      )}
      ref={ref}
      name={name}
    />
    {error && <span className={s.inputError}>{error}</span>}
  </div>
));

PrimaryInput.propTypes = {
  label: PropTypes.string,
  name: PropTypes.string,
  error: PropTypes.string,
  success: PropTypes.bool,
  className: PropTypes.string,
  wrapClassName: PropTypes.string,
};

PrimaryInput.defaultProps = {
  label: '',
  name: '',
  error: '',
  success: false,
  className: '',
  wrapClassName: '',
};

export default PrimaryInput;
