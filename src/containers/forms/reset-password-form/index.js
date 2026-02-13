import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import Input from '../../../components/inputs/primary-input';
import Button from '../../../components/buttons/primary-button';
import Link from '../../../components/custom-link';

import { normalizeError } from '../../../helpers/functions.helper';
import { SIGNIN_PATH } from '../../../constants/router.constants';
import { SUCCESS_MODAL } from '../../../constants/modal.constants';
import { showModal } from '../../../actions/modal.actions';
import { resetPassword } from '../../../actions/auth.actions';

import { schema } from './validation.schema';
import s from './forgot-password-form.module.scss';

const ResetPasswordForm = () => {
  const {
    register, handleSubmit, errors, setValue,
  } = useForm({
    mode: 'onSubmit',
    reValidateMode: 'onSubmit',
    resolver: yupResolver(schema),
  });
  const dispatch = useDispatch();
  const [error, setError] = useState('');
  const [isLoading, setLoading] = useState(false);

  const onSubmit = async (data) => {
    try {
      setLoading(true);
      await resetPassword(data.email);
      await dispatch(showModal(SUCCESS_MODAL, {
        text: 'The link to reset password was sent to the email.',
      }));
      await setValue('email', '');
    } catch (e) {
      const err = normalizeError(e);
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form className={s.wrapper} onSubmit={handleSubmit(onSubmit)} autoComplete="off">
      <div className={s.topLine}>
        <h6 className={s.title}>Forgot your password?</h6>
        <span className={s.subtitle}>Enter your email address and we will send you the link to reset password.</span>
      </div>
      <div className={s.inputsWrap}>
        <div className={s.input}>
          <Input
            label="Email"
            placeholder="Email"
            name="email"
            ref={register}
            error={errors.email?.message}
          />
        </div>
        <Button value="Reset password" className={s.button} type="submit" theme="dark" isLoading={isLoading} />
      </div>
      {error && <div className={s.error}>{error}</div>}
      <div className={s.bottomLine}>
        <div className={s.signInBlock}>
          <span className={s.signInText}>Have an account? </span>
          <Link className={s.signInLink} href={SIGNIN_PATH} isScroll={false}>Sign in</Link>
        </div>
      </div>
    </form>
  );
};

export default ResetPasswordForm;
