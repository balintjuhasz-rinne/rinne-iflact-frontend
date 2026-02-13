import React from 'react';
import PropTypes from 'prop-types';

import { IC_VOTING_ABSTAIN } from '../../constants/image.constants';
import s from './user-inactive.module.scss';

const InactiveUserTab = ({ text }) => (
  <div className={s.inactive}>
    <span>{text}</span>
    <img className={s.icon} src={IC_VOTING_ABSTAIN} alt="file" />
  </div>
);

InactiveUserTab.propTypes = {
  text: PropTypes.string,
};

InactiveUserTab.defaultProps = {
  text: '',
};

export default InactiveUserTab;
