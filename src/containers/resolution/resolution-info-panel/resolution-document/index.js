import React from 'react';
import PropTypes from 'prop-types';

const ResolutionDocument = ({
  children, className, onClick,
}) => (
  <button className={className} onClick={onClick}>
    {children}
  </button>
);

ResolutionDocument.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  onClick: PropTypes.func,
};

ResolutionDocument.defaultProps = {
  className: '',
  onClick: () => {},
};

export default ResolutionDocument;
