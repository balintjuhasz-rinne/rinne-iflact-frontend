import React from 'react';
import PropTypes from 'prop-types';
import IcByOne from '../icons/pagination-by-one';
import IcToBorder from '../icons/pagination-to-border';
import s from './pagination.module.scss';

const PaginationNav = ({
  setPage, page, count, direction,
}) => (direction === 'left' ? (
  <>
    <button
      disabled={page <= 1}
      onClick={() => setPage(1)}
      className={s.option}
    ><IcToBorder />
    </button>
    <button
      disabled={page <= 1}
      onClick={() => setPage(page - 1)}
      className={s.option}
    ><IcByOne />
    </button>
  </>
) : (
  <>
    <button
      disabled={page >= count}
      onClick={() => setPage(page + 1)}
      className={s.option}
    ><IcByOne />
    </button>
    <button
      disabled={page >= count}
      onClick={() => setPage(count)}
      className={s.option}
    ><IcToBorder />
      {count}
    </button>
  </>
));

PaginationNav.propTypes = {
  page: PropTypes.number.isRequired,
  count: PropTypes.number.isRequired,
  setPage: PropTypes.func.isRequired,
  direction: PropTypes.string,
};
PaginationNav.defaultProps = {
  direction: 'right',
};
export default PaginationNav;
