import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import Button from '../../../components/buttons/primary-button';
import Input from '../../../components/inputs/primary-input';
import PageLoader from '../../../components/page-loader';

import { changePassword } from '../../../actions/user.actions';
import { SERVER_ERRORS } from '../../../constants/error.constants';
import { EDIT_USER_PASSWORD_MODAL, SUCCESS_MODAL } from '../../../constants/modal.constants';
import { hideModal, showModal } from '../../../actions/modal.actions';

import { schema } from './validation.schema';
import s from './edit-user-password-form.module.scss';

const EditUserPasswordForm = () => {
  const dispatch = useDispatch();
  const [isLoading, setLoading] = useState(false);
  const [FieldsErrors, setFieldsErrors] = useState({});
  const {
    register, handleSubmit, errors,
  } = useForm({
    mode: 'onSubmit',
    reValidateMode: 'onSubmit',
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data) => {
    try {
      setLoading(true);
      await changePassword(data);
      dispatch(hideModal(EDIT_USER_PASSWORD_MODAL));
      dispatch(showModal(SUCCESS_MODAL, { text: 'Password was updated' }));
    } catch (err) {
      setFieldsErrors(err.response?.data.errors.map(({ field, message }) => {
        errors[field] = message;
        return { [field]: SERVER_ERRORS[message] || SERVER_ERRORS.DEFAULT };
      }));
    } finally {
      setLoading(false);
    }
  };

  return (
    <form className={s.form} onSubmit={handleSubmit(onSubmit)}>
      {isLoading && <PageLoader />}
      <div className={s.row}>
        <Input
          label="Old password *"
          type="password"
          placeholder="Old password"
          name="oldPassword"
          ref={register}
          error={FieldsErrors.oldPassword || errors.oldPassword?.message}
          onChange={() => setFieldsErrors({ oldPassword: '' })}
        />
      </div>
      <div className={s.row}>
        <Input
          label="New password * "
          type="password"
          placeholder="Password"
          name="newPassword"
          wrapClassName={s.halfWidth}
          ref={register}
          error={errors.newPassword?.message}
        />
        <Input
          label="Confirm new password *"
          type="password"
          placeholder="Password"
          name="confirmNewPassword"
          wrapClassName={s.halfWidth}
          ref={register}
          error={errors.confirmNewPassword?.message}
        />
      </div>

      <div className={s.panel}>
        <Button
          theme="white"
          value="Cancel"
          type="button"
          onClick={() => dispatch(hideModal(EDIT_USER_PASSWORD_MODAL))}
        />
        <Button theme="gray" value="Save changes" type="submit" />
      </div>
    </form>
  );
};

export default EditUserPasswordForm;
