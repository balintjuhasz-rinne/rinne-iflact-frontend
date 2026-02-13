import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

export const getResizedFileKey = (path, width, height) => path.replace(/([0-9A-z-.]+)$/, `${width}x${height}-$1`);

const SizedImage = ({
  width, height, src, alt, ...props
}) => {

  const [path, setPath] = useState(getResizedFileKey(src, width, height));
  useEffect(() => {
    setPath(getResizedFileKey(src, width, height));
  }, [src]);
  const onError = () => {
    if (path !== src) { setPath(src); }
  };
  return <img src={path} style={{ maxWidth: width, maxHeight: height }} alt={alt} onError={() => onError()} {...props} />;
};

SizedImage.propTypes = {
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired,
  src: PropTypes.string.isRequired,
  alt: PropTypes.string,
};

SizedImage.defaultProps = {
  alt: '',
};

export default SizedImage;
