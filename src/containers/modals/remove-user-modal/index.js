import React from 'react';
import PropTypes from 'prop-types';
import { useRouter } from 'next/router';

import Button from '../../../components/buttons/primary-button';
import Modal from '../../../components/modal';

import { COSIGNATORIES_PATH } from '../../../constants/router.constants';
import { deleteCosignatory } from '../../../actions/cosignatory.actions';

import s from './remove-user-modal.module.scss';

const InviteModal = ({ closeModal }) => {
  const router = useRouter();

  const removeCosignatory = async () => {
    try {
      await deleteCosignatory(router.query.id);
      await closeModal();
      await router.push(COSIGNATORIES_PATH);
    } catch (err) {
      //
    }
  };

  return (
    <Modal closeModal={closeModal} title="Are you sure you want to remove the Co-signatory account?" className={s.removeModal}>
      <div className={s.text}>This action cannot be undone.</div>
      <div className={s.buttons}>
        <Button value="Cancel" theme="white" onClick={closeModal} className={s.button} />
        <Button value="Confirm" theme="gray" className={s.button} onClick={removeCosignatory} />
      </div>
    </Modal>
  );
};

InviteModal.propTypes = {
  closeModal: PropTypes.func.isRequired,
};

export default InviteModal;
