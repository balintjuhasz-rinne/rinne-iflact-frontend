import React from 'react';
import PropTypes from 'prop-types';
import SwitcherLink from '../../../components/switcher/switcher-link';
import { COMPANIES_PATH } from '../../../constants/router.constants';
import s from './panel.module.scss';

const getOptions = (company, active) => [
  {
    title: 'Main Info',
    href: `${COMPANIES_PATH}${company}/`,
    isActive: active === 'main-info',
  },
  {
    title: 'Statistics',
    href: `${COMPANIES_PATH}${company}/statistics/`,
    isActive: active === 'statistics',
  },
  {
    title: 'Logs',
    href: `${COMPANIES_PATH}${company}/logs/`,
    isActive: active === 'logs',
  },
];

const CompanyPanel = ({ company, active, children }) => (
  <div className={s.panel}>
    <SwitcherLink options={getOptions(company, active)} />
    {children}
  </div>
);

CompanyPanel.propTypes = {
  active: PropTypes.string.isRequired,
  company: PropTypes.string.isRequired,
  children: PropTypes.node,
};

CompanyPanel.defaultProps = {
  children: null,
};

export default CompanyPanel;
