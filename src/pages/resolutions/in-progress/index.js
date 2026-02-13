import React from 'react';
import { useDispatch } from 'react-redux';
import { setFilterConfig } from '../../../actions/resolutions.actions';
import { RESOLUTION_STATUSES_BACKEND } from '../../../constants/resolution.constants';
import Resolutions from '../../../containers/resolutions';

const InProgressResolutionsPage = () => {
  const dispatch = useDispatch();

  dispatch(setFilterConfig({ status: RESOLUTION_STATUSES_BACKEND.InProgress }));

  return (
    <Resolutions />
  );
};

export default InProgressResolutionsPage;
