import React, { memo, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import { useRouter } from 'next/router';

import CosignatoryHeader from './cosignatory-header';
import CosignatoryPanel from './cosignatory-panel';
import CosignatoryTabPanel from './cosignatory-tab-panel';
import DashboarWrapper from '../dashboard-wrapper';
import PageLoader from '../../components/page-loader';

import { loadAndSetCosignatoryInfo, setCosignatoryResolutions, setResolutionsFilterConfig } from '../../actions/cosignatory.actions';
import { normalizeError } from '../../helpers/functions.helper';
import { addTrailingSlash } from '../../helpers/url.helpers';
import { COSIGNATORY_PROFILE_PATH } from '../../constants/router.constants';
import { showModal } from '../../actions/modal.actions';
import { ERROR_MODAL } from '../../constants/modal.constants';

import s from './cosignatory-base.module.scss';

const CosignatoryBase = ({ children }) => {
  const [isLoading, setLoading] = useState(false);

  const dispatch = useDispatch();

  const { query: { id }, pathname } = useRouter();

  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        await Promise.all([
          await dispatch(loadAndSetCosignatoryInfo(id)),
          await dispatch(setCosignatoryResolutions(id)),
        ]);
        dispatch(setResolutionsFilterConfig({ name: '' }));
      } catch (err) {
        const error = normalizeError(err);
        dispatch(showModal(ERROR_MODAL, { error }));
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  return (
    <>
      {isLoading && <PageLoader />}
      <>
        <CosignatoryHeader profileId={id} isProfilePage={addTrailingSlash(pathname) === COSIGNATORY_PROFILE_PATH} />
        <div className={s.cosignatoryBaseWrap}>
          <CosignatoryPanel />
          <DashboarWrapper>
            <CosignatoryTabPanel />
            {children}
          </DashboarWrapper>
        </div>
      </>
    </>
  );
};

CosignatoryBase.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.node,
    PropTypes.element,
  ]).isRequired,
};

export default memo(CosignatoryBase);
