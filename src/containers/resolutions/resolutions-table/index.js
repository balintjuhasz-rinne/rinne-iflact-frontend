import React from 'react';
import { useSelector } from 'react-redux';
import TableList from '../../../components/resolutions-table-list';
import { makeResolutionsSelector } from '../../../selectors/resolutions.selectors';
import TableHeader from './table-header';

const ResolutionsTable = () => {

  const { list } = useSelector(makeResolutionsSelector);

  return (
    <>
      <TableHeader />
      <TableList list={list} />
    </>
  );
};

export default ResolutionsTable;
