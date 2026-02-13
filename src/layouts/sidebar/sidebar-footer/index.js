import React from 'react';
import s from './sidebar-footer.module.scss';
import { PRIVACY_POLICY_LINK } from '../../../constants/global.constants';

export default () => (
  <div className={s.terms}>
    <p className={s.year}>© 2021</p>
    <a className={s.link} href={PRIVACY_POLICY_LINK} target="_blank" rel="noopener noreferrer nofollow">
      Privacy&nbsp; — &nbsp;Terms
    </a>
  </div>
);
