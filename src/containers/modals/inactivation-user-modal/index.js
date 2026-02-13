import PropTypes from 'prop-types';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { changeStatusCosignatory } from '../../../actions/cosignatory.actions';
import { showModal } from '../../../actions/modal.actions';
import Button from '../../../components/buttons/primary-button';
import Modal from '../../../components/modal';
import { ERROR_MODAL } from '../../../constants/modal.constants';
import { USER_STATUS } from '../../../constants/user.constants';
import { normalizeError } from '../../../helpers/functions.helper';
import { getCosignatoryInfoSelector } from '../../../selectors/cosignatory.selectors';
import s from './inactivate-user-modal.module.scss';

const InactivateUserModal = ({ closeModal }) => {
  const dispatch = useDispatch();
  const { info } = useSelector(getCosignatoryInfoSelector);
  const isUserActive = info.status === USER_STATUS.ACTIVE;

  const changeStatusUser = async () => {
    try {
      await dispatch(changeStatusCosignatory(info.id, (isUserActive ? USER_STATUS.INACTIVE : USER_STATUS.ACTIVE)));
      closeModal();
    } catch (err) {
      const error = normalizeError(err);
      dispatch(showModal(ERROR_MODAL, { error }));
    }
  };

  return (
    <Modal
      closeModal={closeModal}
      title={`Are you sure you would like to ${isUserActive ? 'inactivate' : 'activate'} the CoSignatory?`}
      className={s.wrap}
    >
      <div className={s.buttons}>
        <Button value="Cancel" theme="white" onClick={closeModal} className={s.button} />
        <Button value="Confirm" theme="gray" className={s.button} onClick={changeStatusUser} />
      </div>
    </Modal>
  );
};

InactivateUserModal.propTypes = {
  closeModal: PropTypes.func.isRequired,
};

export default InactivateUserModal;
