import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { PAGINATION_RANGE } from '../../constants/companies.constants';
import PaginationNav from './pagination-nav';
import PaginationTab from './pagination-tab';
import s from './pagination.module.scss';

const getPagination = (page, count, pages, setPage) => {

  if (count > PAGINATION_RANGE) {
    let end;
    if (page >= count) {
      end = count;
    } else if (page < PAGINATION_RANGE) {
      end = PAGINATION_RANGE;
    } else {
      end = page + 1;
    }

    const start = end - PAGINATION_RANGE > 0 ? end - PAGINATION_RANGE : 0;
    const needEllipsis = end + 1 !== count;
    const needPostfix = end !== count;
    const isLastPage = page === count;

    const pagination = pages
      .slice(start, end)
      .map((tab) => <PaginationTab key={tab} setPage={setPage} page={page} tab={tab} />);
    const postfixPagination = (
      <>
        {needEllipsis && <span className={s.option}>...</span>}
        <button onClick={() => setPage(count)} className={s.option}>{count}</button>
      </>
    );

    return (
      <>
        {pagination}
        {needPostfix && !isLastPage && postfixPagination }
      </>
    );
  }

  return pages.map((tab) => <PaginationTab key={tab} setPage={setPage} page={page} tab={tab} />);
};

const Pagination = ({
  page,
  count,
  setPage,
}) => {

  if (count <= 1) { return null; }

  const pages = new Array(count + 1)
    .fill('')
    .map((_, i) => i);

  pages.shift();

  return (
    <div className={s.wrap}>
      <PaginationNav
        page={page}
        count={count}
        setPage={setPage}
        direction="left"
      />
      {getPagination(page, count, pages, setPage)}
      <PaginationNav
        page={page}
        count={count}
        setPage={setPage}
      />
    </div>
  );
};

Pagination.propTypes = {
  page: PropTypes.number.isRequired,
  count: PropTypes.number.isRequired,
  setPage: PropTypes.func.isRequired,
};

export default memo(Pagination);
