import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import { useDispatch } from 'react-redux';
import { format } from 'date-fns';

import { showModal } from '../../actions/modal.actions';
import { EDIT_COMPANY_MODAL } from '../../constants/modal.constants';
import { IC_DEFAULT_COMPANY_LOGO } from '../../constants/image.constants';

import s from './company-preview.module.scss';
import SizedImage from '../../components/sized-image';

const CompanyPreview = ({ isEditable, isCompanyHasResolutions, ...info }) => {

  const {
    name, incorporationDate, financialYearEndDate,
    nextMeetingDate, address, website, phoneNumber,
    email, profile, comment, logo, registrationNumber,
  } = info;

  const dispatch = useDispatch();
  const showEditCompanyModal = () => {
    dispatch(showModal(EDIT_COMPANY_MODAL, { info, isCompanyHasResolutions }));
  };

  return (
    <div className={s.content}>
      <div className={s.panel}>
        <h3 className={s.label}>Main Info</h3>
        {isEditable && (
          <button
            onClick={() => showEditCompanyModal()}
            className={s.link}
          >Edit Company
          </button>
        )}
      </div>
      <div className={s.grid}>
        <div className={s.item}>
          <SizedImage className={s.logo} src={logo?.path || IC_DEFAULT_COMPANY_LOGO} width={68} height={68} alt={name} />
        </div>
        <div className={cn(s.item, s.middle)}>
          <div className={s.key}>Company name</div>
          <div className={s.val}>{name}</div>
        </div>
        <div className={s.item}>
          <div className={s.key}>Date of incorporation</div>
          {!!incorporationDate && <div className={s.val}>{format(new Date(incorporationDate), 'dd.MM.yyyy')}</div>}
        </div>
        <div className={s.item}>
          <div className={s.key}>Financial year end</div>
          {!!financialYearEndDate && <div className={s.val}>{format(new Date(financialYearEndDate), 'dd.MM.yyyy')}</div>}
        </div>
        <div className={s.item}>
          <div className={s.key}>Last Annual General Meeting</div>
          <div className={s.val}>{nextMeetingDate ? format(new Date(nextMeetingDate), 'dd.MM.yyyy') : '-'}</div>
        </div>
      </div>
      <div className={s.item}>
        <div className={s.key}>Address</div>
        <div className={s.val}>{address}</div>
      </div>
      <div className={s.grid}>
        {website && (
          <div className={s.item}>
            <div className={s.key}>Website</div>
            <a
              rel="noreferrer nofollow noopener"
              target="_blank"
              href={website.includes('http') ? website : `//${website}`}
              className={s.val}
            >{website}
            </a>
          </div>
        )}
        <div className={s.item}>
          <div className={s.key}>Company email</div>
          <a href={`mailto:${email}`} className={s.val}>{email}</a>
        </div>
        <div className={s.item}>
          <div className={s.key}>Company phone number</div>
          <div className={s.val}>{phoneNumber}</div>
        </div>
        <div className={s.item}>
          <div className={s.key}>Registration number</div>
          <div className={s.val}>{registrationNumber}</div>
        </div>
      </div>
      {profile && (
        <div className={s.item}>
          <div className={s.key}>Company profile</div>
          <p className={s.text}>{profile}</p>
        </div>
      )}
      {comment && (
        <div className={s.item}>
          <div className={s.key}>Comment</div>
          <p className={s.text}>{comment}</p>
        </div>
      )}
    </div>
  );
};

CompanyPreview.propTypes = {
  name: PropTypes.string.isRequired,
  incorporationDate: PropTypes.string,
  financialYearEndDate: PropTypes.string,
  nextMeetingDate: PropTypes.string,
  address: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
  phoneNumber: PropTypes.string,
  registrationNumber: PropTypes.string,
  website: PropTypes.string,
  profile: PropTypes.string,
  comment: PropTypes.string,
  logo: PropTypes.object,
  isEditable: PropTypes.bool,
  isCompanyHasResolutions: PropTypes.bool,
  id: PropTypes.number.isRequired,
};

CompanyPreview.defaultProps = {
  incorporationDate: null,
  financialYearEndDate: null,
  nextMeetingDate: null,
  registrationNumber: '',
  phoneNumber: '',
  website: '',
  profile: '',
  comment: '',
  logo: null,
  isEditable: true,
  isCompanyHasResolutions: false,
};

export default React.memo(CompanyPreview);
