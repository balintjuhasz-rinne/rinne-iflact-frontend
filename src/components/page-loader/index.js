import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';

import s from './page-loader.module.scss';

const PageLoader = ({ className, withBorderRadius, withoutText }) => (
  <div className={cn(className, s.loaderWrap, { [s.round]: withBorderRadius })}>
    {!withoutText && <div className={s.loadingText}>Please wait a minute</div>}
    <div className={s.loader}>
      <div className={s.loaderEl}><span /></div>
      <div className={s.loaderEl}><span /></div>
      <div className={s.loaderEl}><span /></div>
      <div className={s.loaderEl}><span /></div>
    </div>
  </div>
);

PageLoader.propTypes = {
  className: PropTypes.string,
  withoutText: PropTypes.bool,
  withBorderRadius: PropTypes.bool,
};

PageLoader.defaultProps = {
  className: '',
  withoutText: false,
  withBorderRadius: false,
};

export default PageLoader;
