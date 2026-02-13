import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useRouter } from 'next/router';

import AvatarLoader from '../../../components/avatar-loader';
import LatesActivity from '../../../components/latest-activity';

import { normalizeError } from '../../../helpers/functions.helper';
import { addTrailingSlash } from '../../../helpers/url.helpers';
import { loadFile } from '../../../actions/global.actions';
import { showModal } from '../../../actions/modal.actions';
import { EDIT_USER_PASSWORD_MODAL, DELETE_USER_MODAL } from '../../../constants/modal.constants';
import { MY_ACCOUNT_PATH } from '../../../constants/router.constants';
import { USER_ROLES } from '../../../constants/user.constants';
import { getUserSelector } from '../../../selectors/user.selectors';
import { getUserActivitiesSelector } from '../../../selectors/activities.selectors';
import { updateUser } from '../../../actions/user.actions';

import s from './profile-panel.module.scss';

const ProfilePanel = () => {
  const dispatch = useDispatch();
  const [fileError, setFileError] = useState(null);
  const [isFileLoading, setFileLoading] = useState(false);
  const { user } = useSelector(getUserSelector);
  const { userActivities } = useSelector(getUserActivitiesSelector);
  const { pathname } = useRouter();

  const selectAvatar = async (avatarCandidate) => {
    if (!avatarCandidate) {
      await dispatch(updateUser({ ...user, avatarId: null, avatar: {} }));
      return;
    }
    try {
      setFileLoading(true);
      const data = await loadFile(avatarCandidate, 'avatar');
      const dataObj = data[0];
      await dispatch(updateUser({ ...user, avatarId: dataObj.id, avatar: dataObj }));
    } catch (err) {
      setFileError(normalizeError(err));
    } finally {
      setFileLoading(false);
    }
  };

  const removeAvatar = async () => {
    try {
      setFileLoading(true);
      await dispatch(updateUser({ ...user, avatarId: null }));
    } catch (err) {
      setFileError(normalizeError(err));
    } finally {
      setFileLoading(false);
    }
  };

  const isCoSignatory = USER_ROLES.CO_SIGNATORY === user.role;
  const shouldShowLatestActivity = addTrailingSlash(pathname) === MY_ACCOUNT_PATH;

  return (
    <div className={s.panel}>
      <div className={s.info}>
        <div className={s.photo}>
          <AvatarLoader
            selectedFile={user.avatar}
            selectFile={selectAvatar}
            title="avatar-loader"
            name={user.name}
            error={fileError}
            isLoading={isFileLoading}
            setFileError={setFileError}
            surname={user.surname}
            removeFile={removeAvatar}
          />
        </div>
        <div className={s.acts}>
          <button
            onClick={() => dispatch(showModal(
              EDIT_USER_PASSWORD_MODAL, { id: user.id },
            ))}
            className={s.act}
          >Change password
          </button>
          {isCoSignatory && (
            <button
              onClick={() => dispatch(showModal(DELETE_USER_MODAL, {
                role: user.role === USER_ROLES.CO_SIGNATORY ? 'Co-signatory' : '',
              }))}
              className={s.act}
            >Delete account
            </button>
          )}
        </div>
      </div>
      {!isCoSignatory && shouldShowLatestActivity && <LatesActivity list={userActivities} className={s.activities} />}
    </div>
  );
};

export default React.memo(ProfilePanel);
