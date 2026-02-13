import React from 'react';
import { useSelector } from 'react-redux';
import TableHeader from './table-header';
import TableList from '../../../components/resolutions-table-list';
import { makeCosignatoryResolutionsSelector } from '../../../selectors/cosignatory.selectors';

const ResolutionsTable = () => {

  const { resolutions } = useSelector(makeCosignatoryResolutionsSelector);

  return (
    <>
      <TableHeader />
      <TableList list={resolutions} />
    </>
  );
};

export default ResolutionsTable;
