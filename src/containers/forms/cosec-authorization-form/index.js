import React, { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useRouter } from 'next/router';
import PropTypes from 'prop-types';

import Input from '../../../components/inputs/primary-input';
import Button from '../../../components/buttons/primary-button';
import Link from '../../../components/custom-link';

import { signIn } from '../../../actions/auth.actions';

import { normalizeError } from '../../../helpers/functions.helper';

import { INDEX_PATH, RESET_PASSWORD_PATH } from '../../../constants/router.constants';

import { schema } from './validation.schema';
import s from './cosec-authorization-form.module.scss';
import Gdpr from '../../../components/gdpr';

const CosecRegistrationForm = ({ redirectLink }) => {
  const {
    register, handleSubmit, errors, formState, control, setValue,
  } = useForm({
    mode: 'onSubmit',
    reValidateMode: 'onSubmit',
    resolver: yupResolver(schema),
  });
  const router = useRouter();
  const [error, setError] = useState('');
  const [isLoading, setLoading] = useState(false);
  const { isSubmitted } = formState;

  const onSubmit = async (data) => {
    try {
      setLoading(true);
      await signIn(data.email, data.password);
      await router.push(redirectLink || INDEX_PATH);
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
        <h6 className={s.title}>Sign In</h6>
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
          <Link
            className={s.forgotPasswordLink}
            href={RESET_PASSWORD_PATH}
          >
            Forgot password
          </Link>
        </div>
        <Button value="Log in" className={s.button} type="submit" theme="dark" isLoading={isLoading} />
      </div>
      <Controller
        name="gdpr"
        control={control}
        defaultValue
        render={({ value }) => (
          <>
            <Gdpr
              isActive={value}
              changeState={() => setValue('gdpr', !value)}
            />
            {errors?.gdpr && <div className={s.error}>{errors?.gdpr?.message}</div>}
          </>
        )}
      />
      {error && <div className={s.error}>{error}</div>}
    </form>
  );
};

CosecRegistrationForm.propTypes = {
  redirectLink: PropTypes.string,
};

CosecRegistrationForm.defaultProps = {
  redirectLink: '',
};

export default CosecRegistrationForm;
