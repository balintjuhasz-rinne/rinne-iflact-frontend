import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { format } from 'date-fns';
import ResolutionDocument from './resolution-document';
import { IC_PDF, IC_DEFAULT_COMPANY_LOGO, IC_ALERT } from '../../../constants/image.constants';
import { VOTING_MODAL } from '../../../constants/modal.constants';
import { RESOLUTION_TYPES, RESOLUTION_STATUSES_CLOSED } from '../../../constants/resolution.constants';
import { showModal } from '../../../actions/modal.actions';
import { getResolutionInfoSelector } from '../../../selectors/resolution.selectors';
import { formatTimeToTimezone } from '../../../helpers/functions.helper';

import s from './resolution-info-panel.module.scss';
import SizedImage from '../../../components/sized-image';

const ResolutionInfoPanel = () => {
  const {
    info: {
      company, type, votingStartDate, votingEndDate, documents, id, cosec, emergency, creationDate, resolveDate, status,
    },
  } = useSelector(getResolutionInfoSelector);

  const dispatch = useDispatch();

  const showVotingModal = () => {
    dispatch(showModal(VOTING_MODAL, {
      resolutionId: id,
      documents,
    }));
  };

  const isClosedResolution = RESOLUTION_STATUSES_CLOSED.some((item) => item === status);

  return (
    <div className={s.wrap}>
      <div className={s.field}>
        <SizedImage
          height={68}
          width={68}
          className={s.companyLogo}
          src={company?.logo?.path || IC_DEFAULT_COMPANY_LOGO}
          alt="company-logo"
        />
        <span className={s.companyName}>{company?.name}</span>
      </div>
      <div className={s.field}>
        <span className={s.fieldName}>Contract Type</span>
        <span className={s.fieldValue}>{RESOLUTION_TYPES[type]?.title}</span>
      </div>
      {votingStartDate && (
        <div className={s.field}>
          <span className={s.fieldName}>Contract Date</span>
          <span className={s.fieldValue}>{formatTimeToTimezone(votingStartDate, 'DD MMMM')}</span>
        </div>
      )}
      {votingEndDate && (
        <div className={s.field}>
          <span className={s.fieldName}>Deferred Payment date</span>
          <span className={s.fieldValue}>{formatTimeToTimezone(votingEndDate, 'DD MMMM')}</span>
        </div>
      )}
      {isClosedResolution && resolveDate && (
        <div className={s.field}>
          <span className={s.fieldName}>Closing Date</span>
          <span className={s.fieldValue}>
            {format(new Date(resolveDate), 'dd MMM yyyy, hh:mm aaaa')}
          </span>
        </div>
      )}
      {cosec && (
        <div className={s.field}>
          <span className={s.fieldName}>Creator name</span>
          <span className={s.fieldValue}>{`${cosec.name} ${cosec.surname ?? ''}`}</span>
        </div>
      )}
      {creationDate && (
        <div className={s.field}>
          <span className={s.fieldName}>Date of creation</span>
          <span className={s.fieldValue}>{format(new Date(creationDate), 'dd MMM yyyy, hh:mm aaaa')}</span>
        </div>
      )}
      {emergency && (
        <div className={s.field}>
          <span className={s.fieldName}>Emergency</span>
          <span className={s.fieldValue}>
            <img className={s.emergency} src={IC_ALERT} alt="emergency" />
            Resolution emergency
          </span>
        </div>
      )}
      <div className={s.field}>
        <span className={s.fieldName}>Documents</span>
        <ResolutionDocument
          className={s.document}
          onClick={showVotingModal}
        >
          <img className={s.documentIcon} src={IC_PDF} alt="document" />
          <div className={s.documentInfo}>
            <span className={s.documentName}>{documents?.length}</span>
            <span className={s.link}>See documents</span>
          </div>
        </ResolutionDocument>
      </div>
    </div>
  );
};

export default ResolutionInfoPanel;
