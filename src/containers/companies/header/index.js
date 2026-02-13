import React from 'react';
// import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { showModal } from '../../../actions/modal.actions';
import { CREATE_COMPANY_MODAL } from '../../../constants/modal.constants';
import Button from '../../../components/buttons/primary-button';

import Header from '../../../layouts/header';
import s from './header.module.scss';

const CompaniesHeader = () => {
  const dispatch = useDispatch();

  const showCreateCompanyModal = () => {
    dispatch(showModal(CREATE_COMPANY_MODAL));
  };

  return (
    <Header>
      <div className={s.wrap}>
        <h2 className={s.title}>Clients</h2>
        <Button onClick={showCreateCompanyModal} value="Add Company" theme="orange" />
      </div>
    </Header>
  );
};

CompaniesHeader.propTypes = {

};

export default CompaniesHeader;
