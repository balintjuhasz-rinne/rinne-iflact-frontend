import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';

import s from './primary-button.module.scss';

const PrimaryButton = ({
  value, theme, className, isLoading, ...props
}) => (
  <button
    className={cn(className, s.button, s[theme], { [s.isLoading]: isLoading })}
    {...props}
  >
    {isLoading && (
      <div className={cn(s.loader, s[theme])}>
        <div className={s.loaderEl}><span /></div>
        <div className={s.loaderEl}><span /></div>
        <div className={s.loaderEl}><span /></div>
        <div className={s.loaderEl}><span /></div>
      </div>
    )}
    <span className={s.value}>{value}</span>
  </button>
);

PrimaryButton.propTypes = {
  value: PropTypes.string.isRequired,
  onClick: PropTypes.func,
  className: PropTypes.string,
  isLoading: PropTypes.bool,
  theme: PropTypes.oneOf([
    '',
    'white',
    'red',
    'orange',
    'dark',
    'gray',
    'transparent',
    'link',
    'green',
    'solid-red',
  ]),
};

PrimaryButton.defaultProps = {
  onClick: () => {},
  theme: 'dark',
  className: '',
  isLoading: false,
};
export default PrimaryButton;
