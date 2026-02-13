import { isBefore } from 'date-fns';
import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setResolutionActivities } from '../../../../actions/activities.actions';
import { hideModal, showModal } from '../../../../actions/modal.actions';
import { setResolution, voteOnResolution } from '../../../../actions/resolution.actions';
import Button from '../../../../components/buttons/primary-button';
import { IC_CLOSE, IC_COMMENT } from '../../../../constants/image.constants';
import { ERROR_MODAL, VOTING_MODAL } from '../../../../constants/modal.constants';
import { RESOLUTION_STATUSES_BACKEND, VOTE_STATUSES } from '../../../../constants/resolution.constants';
import { USER_ROLES } from '../../../../constants/user.constants';
import { normalizeError } from '../../../../helpers/functions.helper';
import { getResolutionInfoSelector, makeResolutionVotingSelector } from '../../../../selectors/resolution.selectors';
import { getUserSelector } from '../../../../selectors/user.selectors';
import s from './voting-modal-header.module.scss';

const { InProgress, Accepted, Rejected } = RESOLUTION_STATUSES_BACKEND;

const VotingModalHeader = ({
  closeModal, resolutionId, setOpenPostField, isUserHaveComment,
}) => {
  const [loadingButton, setLoadingButton] = useState('');
  const dispatch = useDispatch();
  const { user: { id: cosignatoryId, role } } = useSelector(getUserSelector);
  const { cosignatoriesNotVoted } = useSelector(makeResolutionVotingSelector);
  const { info: { status, votingEndDate } } = useSelector(getResolutionInfoSelector);

  const canCosignatoryVote = () => {
    const isCosignatoryVoted = !!cosignatoriesNotVoted.every((item) => item.id !== cosignatoryId);
    const isResolutionStatusValidForVoting = [InProgress, Accepted, Rejected].includes(status);
    const isBeforeVotingEndDate = isBefore(new Date(), new Date(votingEndDate));

    return !isCosignatoryVoted && isResolutionStatusValidForVoting && isBeforeVotingEndDate;
  };

  const handleVote = async (idOfResolution, voteValue) => {
    try {
      setLoadingButton(voteValue);
      await dispatch(voteOnResolution(idOfResolution, voteValue));
      await dispatch(setResolutionActivities(idOfResolution));
      await dispatch(setResolution(idOfResolution));
      await dispatch(hideModal(VOTING_MODAL));
    } catch (e) {
      const error = normalizeError(e);
      dispatch(showModal(ERROR_MODAL, { error }));
    } finally {
      setLoadingButton('');
    }
  };

  const isDisabledWhenVoting = (voteStatus) => loadingButton && loadingButton !== voteStatus;

  return (
    <div className={s.header} data-modal-hide="false">
      {role === USER_ROLES.CO_SIGNATORY && !isUserHaveComment
        && (
          <button className={s.add} onClick={() => setOpenPostField(true)}>
            <img src={IC_COMMENT} alt="comment" />
            Add comment
          </button>
        )}
      <div className={s.headerWrap}>
        <div className={s.buttons}>
          <Button
            theme="solid-red"
            value="Reject"
            className={s.button}
            onClick={() => handleVote(resolutionId, VOTE_STATUSES.AGAINST)}
            isLoading={loadingButton === VOTE_STATUSES.AGAINST}
            disabled={!canCosignatoryVote() || isDisabledWhenVoting(VOTE_STATUSES.AGAINST)}
          />
          <Button
            theme="white"
            value="Abstain"
            className={s.button}
            onClick={() => handleVote(resolutionId, VOTE_STATUSES.ABSTAIN)}
            isLoading={loadingButton === VOTE_STATUSES.ABSTAIN}
            disabled={!canCosignatoryVote() || isDisabledWhenVoting(VOTE_STATUSES.ABSTAIN)}
          />
          <Button
            theme="green"
            value="Approve"
            className={s.button}
            onClick={() => handleVote(resolutionId, VOTE_STATUSES.FOR)}
            isLoading={loadingButton === VOTE_STATUSES.FOR}
            disabled={!canCosignatoryVote() || isDisabledWhenVoting(VOTE_STATUSES.FOR)}
          />
        </div>
      </div>
      <button className={s.close} onClick={closeModal}>
        <img src={IC_CLOSE} alt="close" />
      </button>
    </div>
  );
};

VotingModalHeader.propTypes = {
  closeModal: PropTypes.func.isRequired,
  resolutionId: PropTypes.number.isRequired,
  setOpenPostField: PropTypes.func.isRequired,
  isUserHaveComment: PropTypes.bool.isRequired,
};

export default VotingModalHeader;
