import React from 'react';
import PropTypes from 'prop-types';

import Modal from '../../../components/modal';
import InviteCosignatotyForm from '../../forms/invite-cosignatory-form';

const InviteCosignatoryModal = ({ closeModal, cosignatory, companyId }) => (
  <Modal closeModal={closeModal} title="Invite Co-signatory">
    <InviteCosignatotyForm
      companyId={companyId}
      cosignatory={cosignatory}
    />
  </Modal>
);

InviteCosignatoryModal.propTypes = {
  closeModal: PropTypes.func.isRequired,
  companyId: PropTypes.number,
  cosignatory: PropTypes.object,
};

InviteCosignatoryModal.defaultProps = {
  companyId: null,
  cosignatory: null,
};

export default InviteCosignatoryModal;
