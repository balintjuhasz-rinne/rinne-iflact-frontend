import React from 'react';
import PropTypes from 'prop-types';
import { LOGO, LOGIN_BG, LOGIN_DECOR } from '../../constants/image.constants';
import s from './unregister-screen.module.scss';

const UnregisterScreen = ({ children, shouldHideInfoText }) => (
  <div className={s.wrapper}>
    <img src={LOGIN_BG} alt="background" className={s.background} />
    <div className={s.inner}>
      <div className={s.innerHead}>
        <img src={LOGO} alt="rinne" className={s.logo} />
        {!shouldHideInfoText && (
          <div className={s.welcome}>
            <h4 className={s.title}>Welcome.</h4>
            <p className={s.text}>Join Flact and optimize your business and contracting processes.</p>
          </div>
        )}
      </div>
      {children}
    </div>
    <img className={s.decor} alt="decor" src={LOGIN_DECOR} />
  </div>
);

UnregisterScreen.propTypes = {
  children: PropTypes.oneOfType([PropTypes.node, PropTypes.element]).isRequired,
  shouldHideInfoText: PropTypes.bool,
};

UnregisterScreen.defaultProps = {
  shouldHideInfoText: false,
};

export default UnregisterScreen;
