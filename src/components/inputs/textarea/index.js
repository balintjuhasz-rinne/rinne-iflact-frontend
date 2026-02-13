import React, { forwardRef } from 'react';
import cn from 'classnames';
import PropTypes from 'prop-types';

import s from './textarea.module.scss';

const Textarea = forwardRef(({
  label, className, wrapClassName, name, error, success, size, hint, ...props
}, ref) => (
  <div className={cn(wrapClassName, s.wrap)}>
    {label && <label htmlFor={name} className={s.label}>{label}</label>}
    <textarea
      {...props}
      id={name}
      className={cn(s.textarea, className, s[size],
        { [s.error]: error, [s.success]: success })}
      ref={ref}
      name={name}
    />
    {error && <span className={s.inputError}>{error}</span>}
    {hint && <span className={s.hint}>{hint}</span>}
  </div>
));

Textarea.propTypes = {
  label: PropTypes.string,
  name: PropTypes.string,
  error: PropTypes.string,
  success: PropTypes.bool,
  className: PropTypes.string,
  wrapClassName: PropTypes.string,
  size: PropTypes.oneOf(['md']),
  hint: PropTypes.string,
};

Textarea.defaultProps = {
  label: '',
  name: '',
  error: '',
  success: false,
  className: '',
  wrapClassName: '',
  size: 'md',
  hint: '',
};

export default Textarea;
