import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import Link from '../custom-link';
import { capitalize } from '../../utils/string.utils';
import s from './switcher.module.scss';

const SwitcherLink = ({ options, size, wrapClass }) => (
  <div className={cn(s[`wrap${capitalize(size)}`], wrapClass)}>
    <div className={s.options}>
      {options.map(({
        title, isActive, href, as,
      }) => (
        <Link
          className={cn(s.option, { [s.active]: isActive })}
          key={title}
          href={href}
          as={as || href}
        >{title}
        </Link>
      ))}
    </div>
  </div>
);

SwitcherLink.propTypes = {
  options: PropTypes.array.isRequired,
  size: PropTypes.oneOf(['sm', 'md']),
  wrapClass: PropTypes.string,
};

SwitcherLink.defaultProps = {
  size: 'md',
  wrapClass: '',
};

export default SwitcherLink;
