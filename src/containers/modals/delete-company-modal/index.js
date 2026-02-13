import React from 'react';
import PropTypes from 'prop-types';

import { useDispatch } from 'react-redux';
import Button from '../../../components/buttons/primary-button';
import Modal from '../../../components/modal';

import { showModal } from '../../../actions/modal.actions';
import { EDIT_COMPANY_MODAL } from '../../../constants/modal.constants';

import s from './delete-company-modal.module.scss';

const DeleteCompanyModal = ({ deleteCompany, closeModal }) => {
  const dispatch = useDispatch();

  const returnToEdit = () => {
    closeModal();
    dispatch(showModal(EDIT_COMPANY_MODAL));
  };

  const onDeleteCompany = async () => {
    await deleteCompany();
    closeModal();
  };

  return (
    <Modal closeModal={closeModal} className={s.wrap}>
      <h2 className={s.title}>Delete company</h2>
      <p className={s.text}>Please confirm deliting company</p>
      <div className={s.panel}>
        <Button theme="white" value="Return to edit" onClick={returnToEdit} />
        <Button theme="gray" value="Delete" onClick={onDeleteCompany} />
      </div>
    </Modal>
  );
};

DeleteCompanyModal.propTypes = {
  closeModal: PropTypes.func.isRequired,
  deleteCompany: PropTypes.func.isRequired,
};

export default DeleteCompanyModal;
