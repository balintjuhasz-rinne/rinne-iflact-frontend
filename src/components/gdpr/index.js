import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import Checkbox from '../inputs/checkbox';
import { TERMS_LINK, PRIVACY_POLICY_LINK } from '../../constants/global.constants';

import s from './gdpr.module.scss';

const Gdpr = ({ isActive, changeState, className }) => (
  <div className={cn(s.gdpr, className)}>
    <Checkbox
      id="gdpr"
      isChecked={isActive}
      onChange={() => changeState(!isActive)}
      className={s.checkbox}
    />
    <span className={s.text}>
      By logging in, I accept the&nbsp;
      <a
        className={s.link}
        href={TERMS_LINK}
        target="_blank"
        rel="noopener noreferrer nofollow"
      >
        Terms and Conditions
      </a>&nbsp;and the&nbsp;
      <a className={s.link} href={PRIVACY_POLICY_LINK} target="_blank" rel="noopener noreferrer nofollow">Data Privacy Policy.</a>
    </span>
  </div>
);

Gdpr.propTypes = {
  isActive: PropTypes.bool.isRequired,
  changeState: PropTypes.func.isRequired,
  className: PropTypes.string,
};

Gdpr.defaultProps = {
  className: '',
};

export default Gdpr;
