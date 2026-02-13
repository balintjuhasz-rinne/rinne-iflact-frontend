import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import PageLoader from '../../../components/page-loader';
import UsersPanel from '../../../components/users-panel';
import UsersPanelDropdown from '../../../components/users-panel/user-panel-dropdown';

import { setUserActivities } from '../../../actions/activities.actions';
import { setUserColleagues } from '../../../actions/user.actions';
import { getUserSelector } from '../../../selectors/user.selectors';
import CompanyPreview from '../../../layouts/comapny-preview';
import CompanyPreviewDropdown from '../../../layouts/comapny-preview/company-preview-dropdown';
import { showModal } from '../../../actions/modal.actions';
import { ERROR_MODAL, INVITE_COWORKER_MODAL } from '../../../constants/modal.constants';
import { USER_ROLES } from '../../../constants/user.constants';
import { normalizeError } from '../../../helpers/functions.helper';

import s from './profile-company.module.scss';

const ProfileCompany = () => {
  const dispatch = useDispatch();
  const [isLoading, setLoading] = useState(true);

  const {
    user: {
      workplaces, id, role, colleagues,
    },
  } = useSelector(getUserSelector);

  const formattedColleagues = workplaces.length ? workplaces?.map((item) => ({
    ...item,
    list: colleagues?.filter((el) => el.workplaces.some((elem) => elem.companyId === item.companyId))
      .map((i) => ({ ...i, workplace: i.workplaces.find((y) => y.companyId === item.companyId) })),
  })) : [];

  const showInviteModal = () => {
    dispatch(showModal(INVITE_COWORKER_MODAL));
  };

  useEffect(() => {
    (async () => {
      try {
        await dispatch(setUserColleagues(id));
        await dispatch(setUserActivities(id));
      } catch (err) {
        const error = normalizeError(err);
        dispatch(showModal(ERROR_MODAL, { error }));
      } finally { setLoading(false); }
    })();
  }, []);

  return (
    <div className={s.wrap}>
      {isLoading && <PageLoader />}
      {role !== USER_ROLES.CO_SIGNATORY ? (
        <CompanyPreview
          isEditable={role !== USER_ROLES.CO_SIGNATORY}
          {...workplaces?.[0]?.company || {}}
        />
      ) : (
        <div className={s.content}>
          {workplaces.map((item) => (
            <CompanyPreviewDropdown
              {...item}
            />
          ))}
        </div>
      )}
      {role === USER_ROLES.CO_SEC && (
        <UsersPanel
          title={`Co-workers (${colleagues.length})`}
          list={colleagues}
          onInvite={showInviteModal}
          className={s.panel}
        />
      )}
      {role === USER_ROLES.CO_SIGNATORY && (
        <div className={s.panel}>
          <h3 className={s.panelTitle}>Users</h3>
          {formattedColleagues.map(({ list, company }) => (
            <UsersPanelDropdown
              name={company.name}
              users={list}
            />
          ))}
        </div>
      )}
    </div>
  );
};

ProfileCompany.propTypes = {};

export default ProfileCompany;
