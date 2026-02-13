import React from 'react';
import { useSelector, useDispatch } from 'react-redux';

import InviteCosignatoryModal from './invite-cosignatory-modal';
import RemoveUserModal from './remove-user-modal';
import CreateCompanyModal from './create-company-modal';
import EditCompanyModal from './edit-company-modal';
import DeleteCompanyModal from './delete-company-modal';
import ErrorModal from './error-modal';
import VotingModal from './voting-modal';
import CreateResolutionModal from './create-resolution-modal';
import DeleteResolutionModal from './delete-resolution-modal';
import EditResolutionModal from './edit-resolution-modal';
import DeleteUserModal from './delete-user-modal';
import EditCosecPasswordModal from './edit-user-password-modal';
import SuccessModal from './success-modal';
import InviteCoworkerModal from './invite-coworker-modal';
import UploadTemplateModal from './upload-template-modal';

import VotedCosignatoriesModal from './voted-cosignatories-modal';
import CancelResolutionModal from './cancel-resolution-modal';
import InactivateUserModal from './inactivation-user-modal';
import { getModalsSelector } from '../../selectors/modal.selectors';
import { hideModal } from '../../actions/modal.actions';
import {
  INVITE_COSIGNATORY_MODAL,
  REMOVE_USER_MODAL,
  CREATE_COMPANY_MODAL,
  EDIT_COMPANY_MODAL,
  DELETE_COMPANY_MODAL,
  ERROR_MODAL,
  VOTING_MODAL,
  CREATE_RESOLUTION_MODAL,
  DELETE_RESOLUTION_MODAL,
  EDIT_RESOLUTION_MODAL,
  VOTED_COSIGNATORIES_MODAL,
  CANCEL_RESOLUTION_MODAL,
  DELETE_USER_MODAL,
  EDIT_USER_PASSWORD_MODAL,
  SUCCESS_MODAL,
  INVITE_COWORKER_MODAL,
  UPLOAD_TEMPLATE_MODAL,
  INACTIVATE_USER_MODAL,
} from '../../constants/modal.constants';

const Modals = () => {
  const dispatch = useDispatch();
  const {
    inviteCosignatoryModal,
    removeUserModal,
    createCompanyModal,
    editCompanyModal,
    deleteCompanyModal,
    errorModal,
    votingModal,
    createResolutionModal,
    deleteResolutionModal,
    editResolutionModal,
    votedCosignatoriesModal,
    cancelResolutionModal,
    deleteUserModal,
    editUserPasswordModal,
    successModal,
    inviteCoworkerModal,
    uploadTemplateModal,
    inactivateUserModal,
  } = useSelector(getModalsSelector);
  return (
    <>
      {inviteCosignatoryModal.isShown && (
        <InviteCosignatoryModal
          closeModal={() => dispatch(hideModal(INVITE_COSIGNATORY_MODAL))}
          companyId={inviteCosignatoryModal.options.companyId}
          cosignatory={inviteCosignatoryModal.options.cosignatory}
        />
      )}
      {removeUserModal.isShown && <RemoveUserModal closeModal={() => dispatch(hideModal(REMOVE_USER_MODAL))} />}

      {createCompanyModal.isShown && (
        <CreateCompanyModal
          closeModal={() => dispatch(hideModal(CREATE_COMPANY_MODAL))}
        />
      )}
      {editCompanyModal.isShown && (
        <EditCompanyModal
          closeModal={() => dispatch(hideModal(EDIT_COMPANY_MODAL))}
          isCosecFirstEnter={editCompanyModal.options.isCosecFirstEnter}
          isCompanyHasResolutions={editCompanyModal.options.isCompanyHasResolutions}
          info={editCompanyModal.options.info}
        />
      )}
      {deleteCompanyModal.isShown && (
        <DeleteCompanyModal
          closeModal={() => dispatch(hideModal(DELETE_COMPANY_MODAL))}
          deleteCompany={deleteCompanyModal.options.deleteCompany}
        />
      )}
      {createResolutionModal.isShown && <CreateResolutionModal closeModal={() => dispatch(hideModal(CREATE_RESOLUTION_MODAL))} />}
      {deleteResolutionModal.isShown && (
        <DeleteResolutionModal
          closeModal={() => dispatch(hideModal(DELETE_RESOLUTION_MODAL))}
          deleteResolution={deleteResolutionModal.options.deleteResolution}
        />
      )}
      {editResolutionModal.isShown && <EditResolutionModal closeModal={() => dispatch(hideModal(EDIT_RESOLUTION_MODAL))} />}
      {errorModal.isShown && <ErrorModal closeModal={() => dispatch(hideModal(ERROR_MODAL))} error={errorModal.options.error} />}
      {votingModal.isShown && (
        <VotingModal
          closeModal={() => dispatch(hideModal(VOTING_MODAL))}
          resolutionId={votingModal.options.resolutionId}
          documents={votingModal.options.documents}
        />
      )}
      {votedCosignatoriesModal.isShown && (
        <VotedCosignatoriesModal
          closeModal={() => dispatch(hideModal(VOTED_COSIGNATORIES_MODAL))}
          cosignatories={votedCosignatoriesModal.options.cosignatories}
          percentage={votedCosignatoriesModal.options.percentage}
          threshold={votedCosignatoriesModal.options.threshold}
          title={votedCosignatoriesModal.options.title}
          comments={votedCosignatoriesModal.options.comments}
          showVetoPower={votedCosignatoriesModal.options.showVetoPower}
        />
      )}
      {cancelResolutionModal.isShown && (
        <CancelResolutionModal
          closeModal={() => dispatch(hideModal(CANCEL_RESOLUTION_MODAL))}
          id={cancelResolutionModal.options.id}
        />
      )}
      {deleteUserModal.isShown && (
        <DeleteUserModal
          closeModal={() => dispatch(hideModal(DELETE_USER_MODAL))}
          role={deleteUserModal.options.role}
        />
      )}
      {editUserPasswordModal.isShown && (
        <EditCosecPasswordModal
          closeModal={() => dispatch(hideModal(EDIT_USER_PASSWORD_MODAL))}
          id={editUserPasswordModal.options.id}
        />
      )}
      {successModal.isShown && (
        <SuccessModal
          closeModal={() => dispatch(hideModal(SUCCESS_MODAL))}
          text={successModal.options.text}
        />
      )}
      {inviteCoworkerModal.isShown && (
        <InviteCoworkerModal
          closeModal={() => dispatch(hideModal(INVITE_COWORKER_MODAL))}
        />
      )}
      {uploadTemplateModal.isShown && <UploadTemplateModal closeModal={() => dispatch(hideModal(UPLOAD_TEMPLATE_MODAL))} />}
      {inactivateUserModal.isShown && <InactivateUserModal closeModal={() => dispatch(hideModal(INACTIVATE_USER_MODAL))} />}
    </>
  );
};

export default Modals;
