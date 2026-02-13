import React, { memo, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Header from '../../../layouts/header';
import Button from '../../../components/buttons/primary-button';
import { showModal } from '../../../actions/modal.actions';
import { isPageListEmpty } from '../../../helpers/functions.helper';
import { INVITE_COSIGNATORY_MODAL } from '../../../constants/modal.constants';
import { makeSelectCosignatories } from '../../../selectors/cosignatories.selectors';

import s from './cosignatories-header.module.scss';

const CosignatoriesHeader = () => {
  const dispatch = useDispatch();
  const { list, filterConfig } = useSelector(makeSelectCosignatories);

  const showInviteModal = () => {
    dispatch(showModal(INVITE_COSIGNATORY_MODAL));
  };

  const isCosignatoriesEmpty = useMemo(() => isPageListEmpty(list, filterConfig), [list, filterConfig]);

  return (
    <Header className={s.cosignatoriesHeader}>
      <h5 className={s.title}>Users</h5>
      {!isCosignatoriesEmpty && <Button value="Invite co-signatory" theme="orange" onClick={showInviteModal} />}
    </Header>
  );
};

export default memo(CosignatoriesHeader);
