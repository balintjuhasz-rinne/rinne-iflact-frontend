import React, { useMemo } from 'react';

import { useDispatch, useSelector } from 'react-redux';

import Header from '../../../layouts/header';
import Button from '../../../components/buttons/primary-button';

import { USER_ROLES } from '../../../constants/user.constants';
import { showModal } from '../../../actions/modal.actions';
import { getUserRoleSelector } from '../../../selectors/user.selectors';
import { makeResolutionsSelector } from '../../../selectors/resolutions.selectors';
import { isPageListEmpty } from '../../../helpers/functions.helper';
import { CREATE_RESOLUTION_MODAL } from '../../../constants/modal.constants';

import s from './resolutions-header.module.scss';

const ResolutionsHeader = () => {
  const dispatch = useDispatch();

  const showCreateResolutionModal = () => {
    dispatch(showModal(CREATE_RESOLUTION_MODAL));
  };
  const { list, filterConfig } = useSelector(makeResolutionsSelector);
  const { role } = useSelector(getUserRoleSelector);

  const isResolutionsEmpty = useMemo(() => isPageListEmpty(list, filterConfig), [list, filterConfig]);

  return (
    <Header className={s.resolutionsHeader}>
      <h5 className={s.title}>Contracts</h5>
      {!isResolutionsEmpty && role !== USER_ROLES.CO_SIGNATORY && (
        <Button
          theme="orange"
          onClick={showCreateResolutionModal}
          value="Create New Financing"
        />
      )}
    </Header>
  );
};

export default ResolutionsHeader;
