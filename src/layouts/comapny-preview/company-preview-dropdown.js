import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { format } from 'date-fns';
import { IC_DEFAULT_COMPANY_LOGO, IC_ARROW_DOWN } from '../../constants/image.constants';
import { transformPositionsToString } from '../../helpers/account.helpers';
import SortIcon from '../../components/icons/sort-icon';

import s from './company-preview.module.scss';
import SizedImage from '../../components/sized-image';

const CompanyPreviewDropdown = ({
  company: {
    name, incorporationDate, financialYearEndDate,
    nextMeetingDate, address, website, phoneNumber,
    email, profile, comment, logo, registrationNumber,
  },
  positions, votingValue, vetoPower,
}) => {

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  return (
    <div>
      <button
        className={s.trigger}
        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
      >
        <div>
          <div className={s.name}>{name}</div>
          <span className={s.abilities}>
            {transformPositionsToString(positions)}
            {votingValue && ` ${votingValue}%`}
            {vetoPower && ', Veto power holder'}
          </span>
        </div>
        <SortIcon active={isDropdownOpen} icon={IC_ARROW_DOWN} />
      </button>
      {isDropdownOpen && (
        <div className={s.dropdowncontent}>
          <div className={s.grid}>
            <div className={s.item}>
              <SizedImage className={s.logo} src={logo?.path || IC_DEFAULT_COMPANY_LOGO} width={68} height={68} alt={name} />
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
              {!!nextMeetingDate && <div className={s.val}>{format(new Date(nextMeetingDate), 'dd.MM.yyyy')}</div>}
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
      )}
    </div>
  );
};

CompanyPreviewDropdown.propTypes = {
  company: PropTypes.object.isRequired,
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
  positions: PropTypes.array,
  votingValue: PropTypes.number,
  vetoPower: PropTypes.bool,
};

CompanyPreviewDropdown.defaultProps = {
  incorporationDate: null,
  financialYearEndDate: null,
  nextMeetingDate: null,
  registrationNumber: '',
  phoneNumber: '',
  website: '',
  profile: '',
  comment: '',
  logo: null,
  positions: [],
  votingValue: null,
  vetoPower: false,
};

export default React.memo(CompanyPreviewDropdown);
