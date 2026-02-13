import React from 'react';
import PropTypes from 'prop-types';
import Slider from 'rc-slider';

import SliderHandle from './slider-handler';

import { generateRangeMarks } from '../../../helpers/resolutions.helpers';

import s from './slider.module.scss';

const SliderInput = ({
  label, min, max, ...props
}) => (
  <div className={s.wrap}>
    {label && <span className={s.label}>{label}</span>}
    <Slider
      min={min}
      max={max}
      marks={generateRangeMarks(min, max)}
      defaultValue={min}
      className={s.slider}
      handle={(handleData) => <SliderHandle {...handleData} />}
      {...props}
    />
  </div>
);

SliderInput.propTypes = {
  label: PropTypes.string,
  min: PropTypes.number,
  max: PropTypes.number,
};

SliderInput.defaultProps = {
  label: '',
  min: 0,
  max: 100,
};

export default SliderInput;
