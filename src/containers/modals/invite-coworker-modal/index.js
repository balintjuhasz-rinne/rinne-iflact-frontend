import React from 'react';
import PropTypes from 'prop-types';

import Modal from '../../../components/modal';
import InviteCoworkerForm from '../../forms/invite-coworker-form';

const InviteCoworkerModal = ({ closeModal }) => (
  <Modal closeModal={closeModal} title="Invite Co-worker">
    <InviteCoworkerForm />
  </Modal>
);

InviteCoworkerModal.propTypes = {
  closeModal: PropTypes.func.isRequired,
};

export default InviteCoworkerModal;
