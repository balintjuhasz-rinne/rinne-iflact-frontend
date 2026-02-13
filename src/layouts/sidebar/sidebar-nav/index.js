import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setSidebarState } from '../../../actions/global.actions';
import { IC_CLOSE_WHITE, IC_TRIGGER } from '../../../constants/image.constants';
import { getSidebarStateSelector } from '../../../selectors/global.selectors';
import s from './sidebar-nav.module.scss';

const SidebarNav = () => {
  const dispatch = useDispatch();
  const { isSidebarOpened } = useSelector(getSidebarStateSelector);

  const handleClick = (e) => {
    e.target.blur();
    dispatch(setSidebarState());
  };

  return (
    <div className={s.root}>
      <button
        onClick={handleClick}
        className={s.icon}
      >
        <img src={IC_TRIGGER} alt="sidebar trigger" />
      </button>
      {isSidebarOpened && (
        <button
          onClick={handleClick}
          className={s.icon}
        >
          <img src={IC_CLOSE_WHITE} alt="sidebar close" />
        </button>
      )}
    </div>
  );
};

export default SidebarNav;
