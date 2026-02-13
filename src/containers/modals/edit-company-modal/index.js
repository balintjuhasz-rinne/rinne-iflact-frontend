import React from 'react';
import PropTypes from 'prop-types';
import Modal from '../../../components/modal';
import EditCompanyForm from '../../forms/edit-company-form';

const EditCompanyModal = ({
  closeModal, isCosecFirstEnter, info, isCompanyHasResolutions,
}) => (
  <Modal
    closeModal={isCosecFirstEnter ? () => {} : closeModal}
    title="Edit Company"
    shouldShowClose={!isCosecFirstEnter}
  >
    <EditCompanyForm isCosecFirstEnter={isCosecFirstEnter} info={info} isCompanyHasResolutions={isCompanyHasResolutions} />
  </Modal>
);

EditCompanyModal.propTypes = {
  closeModal: PropTypes.func.isRequired,
  info: PropTypes.object.isRequired,
  isCompanyHasResolutions: PropTypes.bool,
  isCosecFirstEnter: PropTypes.bool,
};

EditCompanyModal.defaultProps = {
  isCosecFirstEnter: false,
  isCompanyHasResolutions: false,
};

export default EditCompanyModal;
