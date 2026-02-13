import React from 'react';
import { useSelector } from 'react-redux';
import ResolutionsList from '../../components/resolutions-list';
import Filter from './filter';
import { makeCosignatoryResolutionsSelector } from '../../selectors/cosignatory.selectors';
import s from './cosignatory-resolutions.module.scss';
import EmptyScreen from '../../components/empty-screen';

const CosignatoryResolutions = () => {
  const { resolutions } = useSelector(makeCosignatoryResolutionsSelector);

  return (
    <>
      <Filter />
      <div className={s.wrapper}>
        {resolutions.length > 0
          ? <ResolutionsList grid={3} list={resolutions} />
          : <EmptyScreen text="No resolutions found" />}
      </div>
    </>
  );
};

export default CosignatoryResolutions;
