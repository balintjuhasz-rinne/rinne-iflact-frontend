import React, { memo } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import UsersPanel from '../../../components/users-panel';
import { showModal } from '../../../actions/modal.actions';
import { INVITE_COSIGNATORY_MODAL } from '../../../constants/modal.constants';

import { getResolutionCosignatoriesSelector, getResolutionInfoSelector } from '../../../selectors/resolution.selectors';
import { isDirectorsResolution } from '../../../helpers/resolutions.helpers';

const ResolutionCosignatoriesPanel = () => {
  const { cosignatories } = useSelector(getResolutionCosignatoriesSelector);
  const { info: { type } } = useSelector(getResolutionInfoSelector);
  const dispatch = useDispatch();
  return (
    <UsersPanel
      title="Users"
      list={cosignatories}
      onInvite={() => dispatch(showModal(INVITE_COSIGNATORY_MODAL))}
      shouldShowInvite={false}
      shouldShowPending={false}
      isDirectorsResolution={isDirectorsResolution(type)}
    />
  );
};

export default memo(ResolutionCosignatoriesPanel);
