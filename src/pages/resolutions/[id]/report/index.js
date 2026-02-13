import React, { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import { setResolution } from '../../../../actions/resolution.actions';
import { normalizeError } from '../../../../helpers/functions.helper';
import { showModal } from '../../../../actions/modal.actions';
import { ERROR_MODAL } from '../../../../constants/modal.constants';

import { getResolutionInfoSelector, getResolutionCosignatoriesSelector } from '../../../../selectors/resolution.selectors';

const ResolutionReport = dynamic(() => import('../../../../containers/resolution/resolution-report'), { ssr: false });

const ResolutionReportPage = () => {
  const dispatch = useDispatch();
  const { query } = useRouter();
  const [ready, setReady] = useState(false);

  const { info } = useSelector(getResolutionInfoSelector);
  const { cosignatories } = useSelector(getResolutionCosignatoriesSelector);

  useEffect(() => {
    (async () => {
      try {
        if (info.id !== query.id) {
          await dispatch(setResolution(query.id));
          setReady(true);
        }
      } catch (err) {
        const error = normalizeError(err);
        dispatch(showModal(ERROR_MODAL, { error }));
      }
    })();
  }, []);

  return (
    ready ? <ResolutionReport info={info} cosignatories={cosignatories} /> : null
  );
};

export default ResolutionReportPage;
