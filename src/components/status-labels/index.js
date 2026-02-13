import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import { RESOLUTION_STATUSES } from '../../constants/resolution.constants';
import s from './status-labels.module.scss';

const StatusLabels = ({ label, className }) => (
  <div className={cn(s[label], s.label, className)}>
    {RESOLUTION_STATUSES[label] || label}
  </div>
);

StatusLabels.propTypes = {
  label: PropTypes.string.isRequired,
  className: PropTypes.string,
};

StatusLabels.defaultProps = {
  className: '',
};

export default StatusLabels;
