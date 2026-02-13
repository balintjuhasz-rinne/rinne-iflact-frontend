import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';

import CosignatoryBase from '../../../../layouts/cosignatory-base';
import CosignatoryResolutions from '../../../../containers/cosignatory-resolutions';

import { setResolutionsFilterConfig } from '../../../../actions/cosignatory.actions';
import { RESOLUTION_STATUSES_BACKEND } from '../../../../constants/resolution.constants';

const CosignatoryPreviousApprovals = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setResolutionsFilterConfig({
      status: RESOLUTION_STATUSES_BACKEND.Closed,
    }));
    return () => dispatch(setResolutionsFilterConfig({
      status: RESOLUTION_STATUSES_BACKEND.All,
    }));
  }, []);

  return (
    <CosignatoryBase>
      <CosignatoryResolutions />
    </CosignatoryBase>
  );
};

export default CosignatoryPreviousApprovals;
