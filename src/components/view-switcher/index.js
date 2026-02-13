import React from 'react';
import cn from 'classnames';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { getResolutionsView } from '../../selectors/resolutions.selectors';
import { TABLE_VIEW_IC, GRID_VIEW_IC } from '../../constants/image.constants';
import { VIEW_VARIANTS } from '../../constants/global.constants';
import { setResolutionsView } from '../../actions/resolutions.actions';
import s from './view-switcher.module.scss';

const ViewSwitcher = ({ className }) => {

  const dispatch = useDispatch();
  const view = useSelector(getResolutionsView);

  const setActiveView = (viewVariant) => {
    dispatch(setResolutionsView(viewVariant));
  };

  return (
    <div className={cn(s.switcher, className)}>
      <button
        className={cn(s.btn, { [s.active]: view === VIEW_VARIANTS.TABLE })}
        onClick={() => setActiveView(VIEW_VARIANTS.TABLE)}
      >
        <img className={s.img} src={TABLE_VIEW_IC} alt="table" />
        {VIEW_VARIANTS.TABLE}
      </button>
      <button
        className={cn(s.btn, { [s.active]: view === VIEW_VARIANTS.GRID })}
        onClick={() => setActiveView(VIEW_VARIANTS.GRID)}
      >
        <img className={s.img} src={GRID_VIEW_IC} alt="grid" />
        {VIEW_VARIANTS.GRID}
      </button>
    </div>
  );
};

ViewSwitcher.propTypes = {
  className: PropTypes.string,
};

ViewSwitcher.defaultProps = {
  className: '',
};

export default ViewSwitcher;
