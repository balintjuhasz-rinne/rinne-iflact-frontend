import React from 'react';
import PropTypes from 'prop-types';

import s from './switch.module.scss';

const Switch = React.forwardRef(({
  onChange, name, label, ...props
}, ref) => (
  <div className={s.field}>
    <label htmlFor={name} className={s.wrap}>
      <input
        onChange={onChange}
        {...props}
        id={name}
        type="checkbox"
        ref={ref}
      />
      <span className={s.layout} />
      <span className={s.slider} />
    </label>
    {label && (
      <button
        tabIndex="-1"
        type="button"
        onClick={onChange}
        className={s.label}
      >{label}
      </button>
    )}
  </div>
));

Switch.propTypes = {
  label: PropTypes.string,
  name: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};

Switch.defaultProps = {
  label: '',
};

export default Switch;
