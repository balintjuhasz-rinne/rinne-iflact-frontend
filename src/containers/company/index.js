import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import cn from 'classnames';
import { setCompanyActivities } from '../../actions/activities.actions';
import { setCompany, setCompanyResolutions } from '../../actions/company.actions';
import { showModal } from '../../actions/modal.actions';
import LatestActivity from '../../components/latest-activity';
import PageLoader from '../../components/page-loader';
import UsersPanel from '../../components/users-panel';
import Dimmer from '../../components/dimmer';
import HideActivityButton from '../../components/buttons/hide-activity-button';
import ShowActivityButton from '../../components/buttons/show-activity-button';

import { ERROR_MODAL, INVITE_COSIGNATORY_MODAL } from '../../constants/modal.constants';
import { normalizeError } from '../../helpers/functions.helper';
import CompanyPreview from '../../layouts/comapny-preview';
import DashboardWrapper from '../../layouts/dashboard-wrapper';
import { getCompanyActivitiesSelector } from '../../selectors/activities.selectors';
import { getCompanyResolutionsSelector, getCompanySelector } from '../../selectors/company.selectors';
import Header from './header';
import Panel from './panel';
import s from './company.module.scss';

const Company = () => {
  const dispatch = useDispatch();
  const { query } = useRouter();

  const [activityVisibility, setActivityVisibility] = useState(false);

  const { info, coSignatories } = useSelector(getCompanySelector);
  const { companyActivities } = useSelector(getCompanyActivitiesSelector);
  const { list } = useSelector(getCompanyResolutionsSelector);

  const [isLoading, setLoading] = useState(true);

  const showInviteModal = () => {
    dispatch(showModal(INVITE_COSIGNATORY_MODAL, { companyId: info.id }));
  };

  useEffect(() => {
    (async () => {
      try {
        await dispatch(setCompany(query.id));
        await dispatch(setCompanyActivities(query.id));
        await dispatch(setCompanyResolutions(query.id));
      } catch (err) {
        const error = normalizeError(err);
        dispatch(showModal(ERROR_MODAL, { error }));
      } finally { setLoading(false); }
    })();
  }, []);

  return (
    <>
      {isLoading ? <PageLoader /> : (
        <>
          <Header title={info.name} companyId={info.id} />
          <div className={s.outerWrap}>
            <DashboardWrapper className={s.dashboard}>
              <Panel company={query.id} active="main-info">
                <ShowActivityButton
                  className={s.activityTrigger}
                  onClick={() => setActivityVisibility(true)}
                />
              </Panel>
              <div className={s.wrap}>
                <UsersPanel
                  title="Users"
                  list={coSignatories}
                  onInvite={showInviteModal}
                  className={s.companyCosignatories}
                  withLink
                />
                <CompanyPreview {...info} isCompanyHasResolutions={list.length > 0} />
              </div>
            </DashboardWrapper>

            {activityVisibility && (
              <Dimmer onClick={() => setActivityVisibility(false)} />
            )}
            <div className={cn(s.activity, { [s.on]: activityVisibility })}>
              <LatestActivity
                hide={(
                  <HideActivityButton
                    className={s.activityTrigger}
                    onClick={() => setActivityVisibility(false)}
                  />
                )}
                list={companyActivities}
              />
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default Company;
