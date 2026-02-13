import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';

import PrimaryInput from '../primary-input';
import Checkbox from '../checkbox';

import s from './checkbox-input.module.scss';

const CheckboxInput = ({
  name, value, onChange, hint, error, wrapClassName, ...props
}) => (
  <div className={cn(wrapClassName, s.wrap)}>
    <Checkbox
      id={name}
      isChecked={!!value}
      onChange={() => onChange(name, !value)}
    />
    <PrimaryInput
      type="number"
      wrapClassName={s.checkInput}
      value={value || ''}
      placeholder="X"
      error={error}
      onChange={(e) => onChange(name, e.target.value)}
      {...props}
    />
    <span className={s.hint}>{hint}</span>
  </div>
);

CheckboxInput.propTypes = {
  wrapClassName: PropTypes.string,
  name: PropTypes.string.isRequired,
  error: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  hint: PropTypes.string.isRequired,
  value: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
    PropTypes.bool,
  ]),
};

CheckboxInput.defaultProps = {
  wrapClassName: '',
  error: '',
  value: '',
};

export default CheckboxInput;
