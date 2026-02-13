import React from 'react';
import { useDispatch } from 'react-redux';

import Button from '../../../components/buttons/primary-button';
import Header from '../../../layouts/header';

import { showModal } from '../../../actions/modal.actions';
import { UPLOAD_TEMPLATE_MODAL } from '../../../constants/modal.constants';

import s from './header.module.scss';

const CompaniesHeader = () => {
  const dispatch = useDispatch();
  return (
    <Header>
      <div className={s.wrap}>
        <h2 className={s.title}>Library</h2>
        <Button
          value="Upload Template"
          theme="orange"
          onClick={() => dispatch(showModal(UPLOAD_TEMPLATE_MODAL))}
        />
      </div>
    </Header>
  );
};

CompaniesHeader.propTypes = {

};

export default CompaniesHeader;
