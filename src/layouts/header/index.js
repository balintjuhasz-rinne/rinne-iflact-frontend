import React, { memo } from 'react';
import cn from 'classnames';
import PropTypes from 'prop-types';
import s from './header.module.scss';

const Header = ({ className, children }) => (
  <header className={cn(className, s.wrap)}>
    {children}
  </header>
);

Header.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node.isRequired,
};

Header.defaultProps = {
  className: '',
};

export default memo(Header);
