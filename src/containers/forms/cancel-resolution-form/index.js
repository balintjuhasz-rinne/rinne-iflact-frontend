import { yupResolver } from '@hookform/resolvers/yup';
import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { hideModal, showModal } from '../../../actions/modal.actions';
import {
  cancelResolution,
  setResolutionCancelReason,
  setResolutionStatus,
} from '../../../actions/resolution.actions';
import Button from '../../../components/buttons/primary-button';
import Textarea from '../../../components/inputs/textarea';
import {
  CANCEL_RESOLUTION_MODAL,
  ERROR_MODAL,
} from '../../../constants/modal.constants';
import { RESOLUTION_STATUSES_BACKEND } from '../../../constants/resolution.constants';
import { normalizeError } from '../../../helpers/functions.helper';
import s from './cancel-resolution-form.module.scss';
import { schema } from './validation.schema';

const CancelResolutionForm = ({ resolutionId }) => {
  const dispatch = useDispatch();
  const [isButtonLoading, setButtonLoading] = useState(false);

  const { register, handleSubmit, errors } = useForm({
    mode: 'onSubmit',
    reValidateMode: 'onSubmit',
    resolver: yupResolver(schema),
  });

  const closeModal = () => {
    dispatch(hideModal(CANCEL_RESOLUTION_MODAL));
  };

  const onSubmit = async (data) => {
    try {
      setButtonLoading(true);
      await cancelResolution(resolutionId, data);
      await dispatch(setResolutionStatus(RESOLUTION_STATUSES_BACKEND.Canceled));
      await dispatch(setResolutionCancelReason(data.cancelReason));
      await dispatch(hideModal(CANCEL_RESOLUTION_MODAL));
    } catch (e) {
      const error = normalizeError(e);
      dispatch(
        showModal(ERROR_MODAL, {
          error,
        }),
      );
    } finally {
      setButtonLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <span className={s.subtitle}>
        You can describe the reason of cancellation. All users  will be
        notified.
      </span>
      <div className={s.row}>
        <Textarea
          label="The reason of cancellation"
          placeholder="Comment..."
          name="cancelReason"
          hint="max 500 characters"
          error={errors.cancelReason?.message}
          ref={register}
        />
      </div>
      <div className={s.buttons}>
        <Button
          value="Cancel"
          theme="white"
          className={s.button}
          onClick={closeModal}
        />
        <Button
          value="Confirm"
          theme="gray"
          className={s.button}
          isLoading={isButtonLoading}
          type="submit"
        />
      </div>
    </form>
  );
};

CancelResolutionForm.propTypes = {
  resolutionId: PropTypes.number.isRequired,
};

export default CancelResolutionForm;
