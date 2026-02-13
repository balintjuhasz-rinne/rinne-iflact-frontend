import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import React, { memo, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setCosignatoryEditing } from '../../../actions/cosignatory.actions';
import { showModal } from '../../../actions/modal.actions';
import Button from '../../../components/buttons/primary-button';
import { IC_BACK } from '../../../constants/image.constants';
import {
  ERROR_MODAL, INACTIVATE_USER_MODAL, INVITE_COSIGNATORY_MODAL, REMOVE_USER_MODAL,
} from '../../../constants/modal.constants';
import { RESOLUTION_STATUSES_BACKEND } from '../../../constants/resolution.constants';
import { COSIGNATORY_PROFILE_PATH } from '../../../constants/router.constants';
import { USER_STATUS } from '../../../constants/user.constants';
import { getAllCosignatoryResolutionsSelector, getCosignatoryInfoSelector } from '../../../selectors/cosignatory.selectors';
import Header from '../../header';
import s from './cosignatory-header.module.scss';

const { InProgress, Upcoming } = RESOLUTION_STATUSES_BACKEND;

const CosignatoryHeader = ({ profileId, isProfilePage }) => {
  const dispatch = useDispatch();
  const router = useRouter();
  const { resolutions } = useSelector(getAllCosignatoryResolutionsSelector);
  const { info } = useSelector(getCosignatoryInfoSelector);

  const hasActiveResolutions = useMemo(() => resolutions.filter((item) => [InProgress, Upcoming].includes(item.resolution.status)).length);

  const isUserActive = info.status === USER_STATUS.ACTIVE;

  const setEditing = () => {
    dispatch(setCosignatoryEditing(true));
    if (!isProfilePage) router.push(COSIGNATORY_PROFILE_PATH.replace('[id]', profileId));
  };

  const showRemoveModal = () => {
    dispatch(showModal(REMOVE_USER_MODAL));
  };

  const showChangeStatusModal = () => {
    if (hasActiveResolutions) {
      dispatch(showModal(ERROR_MODAL, { error: 'This co-signatory has open resolutions. You cannot inactivate him/her.' }));
      return;
    }
    if (!info.workplaces?.length && !isUserActive) {
      dispatch(showModal(INVITE_COSIGNATORY_MODAL, { cosignatory: info }));
    } else {
      dispatch(showModal(INACTIVATE_USER_MODAL));
    }
  };

  return (
    <Header>
      <button className={s.backButton} onClick={() => router.back()}>
        <img src={IC_BACK} alt="Back" />
      </button>
      <h2 className={s.title}>Co-signatory Profile</h2>
      <div className={s.buttons}>
        <Button value="Remove" theme="red" onClick={showRemoveModal} disabled={resolutions.length} />
        <Button value={isUserActive ? 'Inactivate' : 'Activate'} theme="transparent" onClick={showChangeStatusModal} />
        <Button value="Edit" theme="orange" onClick={setEditing} />
      </div>
    </Header>
  );
};

CosignatoryHeader.propTypes = {
  isProfilePage: PropTypes.bool.isRequired,
  profileId: PropTypes.string.isRequired,
};

export default memo(CosignatoryHeader);
