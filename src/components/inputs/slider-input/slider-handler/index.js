import React from 'react';
import PropTypes from 'prop-types';
import s from './slider-handler.module.scss';

const SliderHandler = ({
  offset, value, dragging,
}) => (
  <div className={s.wrap}>
    <div
      style={{ left: `calc(${offset}% - 5px)` }}
      className={s.handle}
    >
      {dragging && <span className={s.value}>{value}</span>}
    </div>
  </div>
);

SliderHandler.propTypes = {
  value: PropTypes.number.isRequired,
  offset: PropTypes.number.isRequired,
  dragging: PropTypes.bool.isRequired,
};

export default SliderHandler;
