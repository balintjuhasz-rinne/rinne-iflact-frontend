import React from 'react';
import { useDispatch } from 'react-redux';
import { setFilterConfig } from '../../../actions/resolutions.actions';
import { RESOLUTION_STATUSES_BACKEND } from '../../../constants/resolution.constants';
import Resolutions from '../../../containers/resolutions';

const UpcomingResolutionsPage = () => {
  const dispatch = useDispatch();

  dispatch(setFilterConfig({ status: RESOLUTION_STATUSES_BACKEND.Upcoming }));

  return (
    <Resolutions />
  );
};

export default UpcomingResolutionsPage;
