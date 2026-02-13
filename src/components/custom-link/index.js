import React, { memo } from 'react';
import NextLink from 'next/link';
import PropTypes from 'prop-types';

import { addTrailingSlash, removeTrailingSlash } from '../../helpers/url.helpers';
import { INDEX_PATH } from '../../constants/router.constants';

const Link = ({
  href, as, isNavLink, activeClass, isScroll, children, ...props
}) => (
  <NextLink
    href={href === INDEX_PATH ? href : removeTrailingSlash(href)}
    as={addTrailingSlash(as || href)}
    scroll={isScroll}
  >
    <a {...props}>
      {children}
    </a>
  </NextLink>
);

Link.propTypes = {
  href: PropTypes.string.isRequired,
  as: PropTypes.string,
  isNavLink: PropTypes.bool,
  activeClass: PropTypes.string,
  isScroll: PropTypes.bool,
  children: PropTypes.oneOfType([
    PropTypes.node,
    PropTypes.element,
  ]),
};

Link.defaultProps = {
  as: '',
  children: null,
  isNavLink: false,
  activeClass: '',
  isScroll: true,
};

export default memo(Link);
