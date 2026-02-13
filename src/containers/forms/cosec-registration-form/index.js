import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useSelector, useDispatch } from 'react-redux';
import { yupResolver } from '@hookform/resolvers/yup';

import { useRouter } from 'next/router';
import * as yup from 'yup';
import Gdpr from '../../../components/gdpr';
import Input from '../../../components/inputs/primary-input';
import Button from '../../../components/buttons/primary-button';
import Link from '../../../components/custom-link';

import { signUp } from '../../../actions/auth.actions';
import { setUser } from '../../../actions/user.actions';
import { getUserSelector } from '../../../selectors/user.selectors';
import { normalizeError } from '../../../helpers/functions.helper';
import { INDEX_PATH, SIGNIN_PATH } from '../../../constants/router.constants';

import s from './cosec-registration-form.module.scss';

import { CLIENT_ERRORS } from '../../../constants/error.constants';

const CosecRegistrationForm = () => {
  const { user: { email, token } } = useSelector(getUserSelector);
  const schema = yup.object().shape({
    email: email ? yup.string() : yup.string().required(CLIENT_ERRORS.REQUIRED).email(CLIENT_ERRORS.INVALID_EMAIL),
    password: yup.string()
      .min(8, CLIENT_ERRORS.PASSWORD_LENGTH)
      .required(CLIENT_ERRORS.REQUIRED)
      .matches(/(.*[A-Z].*)/, CLIENT_ERRORS.ONE_LETTER_IN_CAPITAL)
      .matches(/^(?=.*?[A-Z])(?=.*?[0-9]).{8,}$/, CLIENT_ERRORS.PASSWORD_CONDITION),
    confirmPassword: yup.string().required(CLIENT_ERRORS.REQUIRED)
      .oneOf([yup.ref('password'), null], CLIENT_ERRORS.PASSWORD_MATCH),
  });

  const {
    register, handleSubmit, errors, formState,
  } = useForm({
    mode: 'onSubmit',
    reValidateMode: 'onSubmit',
    resolver: yupResolver(schema),
  });
  const [error, setError] = useState('');
  const [isLoading, setLoading] = useState(false);
  const [isGdprActive, setIsGdprActive] = useState(true);
  const router = useRouter();
  const dispatch = useDispatch();

  const { isSubmitted } = formState;

  const onSubmit = async (data) => {
    try {
      setLoading(true);
      await signUp(data.password, token);
      await dispatch(setUser());
      await router.push(INDEX_PATH);
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
        <h6 className={s.title}>{email ? 'Please set up your password.' : 'Sign Up'}</h6>
        {email && <span className={s.subtitle}>It must be 8 character including 1 number and 1 letter in capital.</span>}
      </div>
      <div className={s.inputsWrap}>
        {!email && (
          <div className={s.input}>
            <Input
              label="Email"
              placeholder="Email"
              name="email"
              ref={register}
              error={errors.email?.message}
            />
          </div>
        ) }
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
        {email && <Button value="Confirm" className={s.button} type="submit" theme="dark" isLoading={isLoading} />}
      </div>
      {error && <div className={s.error}>{error}</div>}
      {!email && <Gdpr className={s.gdpr} isActive={isGdprActive} changeState={setIsGdprActive} />}
      <div className={s.bottomLine}>
        <div className={s.signInBlock}>
          <span className={s.signInText}>Have an account? </span>
          <Link className={s.signInLink} href={SIGNIN_PATH} isScroll={false}>Sign in</Link>
        </div>
        {!email
          && (
            <Button
              value="Confirm"
              className={s.button}
              type="submit"
              theme="dark"
              isLoading={isLoading}
              disabled={!isGdprActive}
            />
          )}
      </div>
    </form>
  );
};

export default CosecRegistrationForm;
