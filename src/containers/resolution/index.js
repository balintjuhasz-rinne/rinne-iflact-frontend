import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { useDispatch, useSelector } from 'react-redux';

import PageLoader from '../../components/page-loader';
import ResolutionHeader from './resolution-header';
import DashboardWrapper from '../../layouts/dashboard-wrapper';
import ResolutionStatistics from './resolution-statistics';
import ResolutionInfoPanel from './resolution-info-panel';
import ResolutionCosignatoriesPanel from './resolution-cosignatories-panel';
import LatestActivity from '../../components/latest-activity';

import { getResolutionInfoSelector } from '../../selectors/resolution.selectors';
import { getResolutionActivitiesSelector } from '../../selectors/activities.selectors';
import { ERROR_MODAL } from '../../constants/modal.constants';
import { setResolutionActivities } from '../../actions/activities.actions';
import { setResolution, clearResolution } from '../../actions/resolution.actions';
import { showModal } from '../../actions/modal.actions';
import { normalizeError } from '../../helpers/functions.helper';

import s from './resolution.module.scss';

const Resolution = () => {
  const { query: { id } } = useRouter();
  const [isLoading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const { info: { description, type } } = useSelector(getResolutionInfoSelector);
  const { resolutionActivities } = useSelector(getResolutionActivitiesSelector);

  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        await dispatch(setResolution(id));
        await dispatch(setResolutionActivities(id));
      } catch (e) {
        const error = normalizeError(e);
        dispatch(showModal(ERROR_MODAL, { error }));
      } finally {
        setLoading(false);
      }
    })();
    return () => dispatch(clearResolution());
  }, []);

  return (
    <>
      {isLoading && <PageLoader />}
      <div className={s.resolution}>
        <ResolutionHeader />
        <div className={s.resolutionWrap}>
          <DashboardWrapper>
            <div className={s.description}>
              <span className={s.bold}>Description:&nbsp;</span>
              <span className={s.descriptionText}>{description}</span>
            </div>
            <div className={s.dashboardWrap}>
              <ResolutionCosignatoriesPanel />
              <ResolutionStatistics type={type} />
            </div>
          </DashboardWrapper>
          <div className={s.rightPanel}>
            <ResolutionInfoPanel />
            <LatestActivity list={resolutionActivities} className={s.activities} />
          </div>
        </div>
      </div>
    </>
  );
};

export default Resolution;
