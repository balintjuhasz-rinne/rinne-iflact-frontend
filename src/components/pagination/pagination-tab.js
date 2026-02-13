import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import s from './pagination.module.scss';

const PaginationTab = ({ tab, page, setPage }) => {
  const hundleClick = (e) => {
    e.target.blur();
    setPage(tab);
  };
  return (
    <button
      className={cn(s.option, { [s.active]: tab === page })}
      onClick={hundleClick}
    >{tab}
    </button>
  );
};

PaginationTab.propTypes = {
  tab: PropTypes.number.isRequired,
  page: PropTypes.number.isRequired,
  setPage: PropTypes.func.isRequired,
};

export default PaginationTab;
