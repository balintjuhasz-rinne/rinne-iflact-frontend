import React from 'react';
import PropTypes from 'prop-types';

import s from './empty-screen.module.scss';

const EmptyScreen = ({ text, children }) => (
  <div className={s.wrap}>
    <span className={s.text}>{text}</span>
    {children}
  </div>
);

EmptyScreen.propTypes = {
  text: PropTypes.string.isRequired,
  children: PropTypes.node,
};

EmptyScreen.defaultProps = {
  children: null,
};

export default EmptyScreen;
