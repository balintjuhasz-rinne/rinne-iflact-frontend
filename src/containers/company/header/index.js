import React from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import Header from '../../../layouts/header';
import { capitalize } from '../../../utils/string.utils';
import Link from '../../../components/custom-link';
import { getUserRoleSelector } from '../../../selectors/user.selectors';
import { COMPANIES_PATH } from '../../../constants/router.constants';
import Button from '../../../components/buttons/primary-button';
import { showModal } from '../../../actions/modal.actions';
import { USER_ROLES } from '../../../constants/user.constants';
import { IC_BACK } from '../../../constants/image.constants';
import { prepareNewResolution } from '../../../actions/resolutions.actions';
import { CREATE_RESOLUTION_MODAL } from '../../../constants/modal.constants';
import s from './header.module.scss';

const CompanyHeader = ({ title, companyId }) => {

  const dispatch = useDispatch();

  const showCreateResolutionModal = () => {
    dispatch(prepareNewResolution({ companyId }));
    dispatch(showModal(CREATE_RESOLUTION_MODAL));
  };

  const { role } = useSelector(getUserRoleSelector);

  return (
    <Header>
      <div className={s.wrap}>
        <Link className={s.back} href={COMPANIES_PATH}>
          <img src={IC_BACK} alt="back" />
        </Link>
        <h2 className={s.title}>{capitalize(title)}</h2>
        {role !== USER_ROLES.CO_SIGNATORY && (
          <Button
            value="Create new financing"
            theme="orange"
            onClick={showCreateResolutionModal}
            className={s.btn}
          />
        )}
      </div>
    </Header>
  );
};

CompanyHeader.propTypes = {
  title: PropTypes.string.isRequired,
  companyId: PropTypes.number.isRequired,
};

export default CompanyHeader;
