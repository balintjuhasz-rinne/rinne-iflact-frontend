import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import { capitalize } from '../../utils/string.utils';
import s from './switcher.module.scss';

const Switcher = ({
  options, setActive, size, wrapClass,
}) => {
  const onSwitch = (e, value) => {
    e.target.blur();
    setActive(value);
  };

  return (
    <div className={cn(s[`wrap${capitalize(size)}`], wrapClass)}>
      <div className={s.options}>
        {options.map(({
          title, id, disabled, isActive,
        }) => (
          <button
            tabIndex={isActive ? '-1' : '0'}
            disabled={disabled}
            className={cn(s.option, { [s.active]: isActive })}
            key={id || title}
            onClick={(e) => onSwitch(e, { id, title })}
          >{title}
          </button>
        ))}
      </div>
    </div>
  );
};

Switcher.propTypes = {
  options: PropTypes.array.isRequired,
  setActive: PropTypes.func.isRequired,
  size: PropTypes.oneOf(['sm', 'md']),
  wrapClass: PropTypes.string,
};

Switcher.defaultProps = {
  size: 'md',
  wrapClass: '',
};

export default Switcher;
