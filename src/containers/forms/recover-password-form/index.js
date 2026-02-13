import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { yupResolver } from '@hookform/resolvers/yup';
import { useRouter } from 'next/router';

import Input from '../../../components/inputs/primary-input';
import Button from '../../../components/buttons/primary-button';
import Link from '../../../components/custom-link';

import { recoverPassword } from '../../../actions/auth.actions';
import { showModal } from '../../../actions/modal.actions';
import { SUCCESS_MODAL, ERROR_MODAL } from '../../../constants/modal.constants';
import { normalizeError } from '../../../helpers/functions.helper';
import { SIGNIN_PATH } from '../../../constants/router.constants';

import { schema } from './validation.schema';
import s from './recover-password-form.module.scss';

const CosecRegistrationForm = () => {
  const dispatch = useDispatch();
  const {
    register, handleSubmit, errors, formState,
  } = useForm({
    mode: 'onSubmit',
    reValidateMode: 'onSubmit',
    resolver: yupResolver(schema),
  });
  const [error, setError] = useState('');
  const [isLoading, setLoading] = useState(false);
  const router = useRouter();
  const { isSubmitted } = formState;

  const onSubmit = async (data) => {
    const token = router?.asPath?.split('/')[2];
    if (token) {
      try {
        setLoading(true);
        await recoverPassword(token, data.password);
        await dispatch(showModal(SUCCESS_MODAL, {
          text: 'Password was successfully changed',
        }));
        await router.push(SIGNIN_PATH);
      } catch (e) {
        const err = normalizeError(e);
        setError(err);
      } finally {
        setLoading(false);
      }
    } else {
      dispatch(showModal(ERROR_MODAL, {
        error: 'Link is invalid',
      }));
    }

  };

  return (
    <form className={s.wrapper} onSubmit={handleSubmit(onSubmit)} autoComplete="off">
      <div className={s.topLine}>
        <h6 className={s.title}>Please set up your password.</h6>
        <span className={s.subtitle}>It must be 8 character including 1 number and 1 letter in capital.</span>
      </div>
      <div className={s.inputsWrap}>
        <div className={s.input}>
          <Input
            label="Password"
            placeholder="Password"
            name="password"
            type="password"
            error={errors.password?.message}
            success={!!(isSubmitted && !errors.password?.message)}
            ref={register}
          />
        </div>
        <div className={s.input}>
          <Input
            label="Confirm password"
            placeholder="Confirm Password"
            name="confirmPassword"
            type="password"
            success={!!(isSubmitted && !errors.confirmPassword?.message)}
            error={errors.confirmPassword?.message}
            ref={register}
          />
        </div>
        <Button value="Confirm" className={s.button} type="submit" theme="dark" isLoading={isLoading} />
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

export default CosecRegistrationForm;
