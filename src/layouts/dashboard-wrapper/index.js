import React from 'react';
import cn from 'classnames';
import PropTypes from 'prop-types';

import s from './dashboard-wrapper.module.scss';

const DashboardWrapper = ({ className, children }) => (
  <div className={cn(className, s.wrap)}>{children}</div>
);

DashboardWrapper.propTypes = {
  className: PropTypes.string,
  children: PropTypes.oneOfType([
    PropTypes.node,
    PropTypes.element,
  ]).isRequired,
};

DashboardWrapper.defaultProps = {
  className: '',
};

export default DashboardWrapper;
