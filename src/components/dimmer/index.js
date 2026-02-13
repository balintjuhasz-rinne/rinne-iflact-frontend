import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import s from './dimmer.module.scss';

const Dimmer = ({ className, ...props }) => (
  <button
    tabIndex={-1}
    className={cn(s.root, className)}
    {...props}
  />
);

Dimmer.propTypes = {
  className: PropTypes.string,
};

Dimmer.defaultProps = {
  className: '',
};

export default Dimmer;
