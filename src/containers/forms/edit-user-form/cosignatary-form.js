import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import Button from '../../../components/buttons/primary-button';
import PrimaryInput from '../../../components/inputs/primary-input';
import Switch from '../../../components/inputs/switch';
import Checkbox from '../../../components/inputs/checkbox';
import CheckboxInput from '../../../components/inputs/checkbox-input';

import { showModal } from '../../../actions/modal.actions';
import { updateUser, updateUserNotifications } from '../../../actions/user.actions';
import { SUCCESS_MODAL } from '../../../constants/modal.constants';
import { SERVER_ERRORS } from '../../../constants/error.constants';
import { getUserSelector } from '../../../selectors/user.selectors';

import {
  getEmalNotificationsFields,
  // getSmsNotificationsFields,
} from './userFormData';
import { cosignotarySchema } from './validation.schema';
import s from './edit-user-form.module.scss';
import {
  rmEmptyFormDataFields,
} from '../../../helpers/functions.helper';

const EditCosignatoryForm = () => {
  const dispatch = useDispatch();
  const [isLoading, setLoading] = useState(false);
  const [fieldError, setFieldError] = useState({});
  const [formError, setFormError] = useState('');
  const { user } = useSelector(getUserSelector);

  const {
    register, handleSubmit, errors, clearErrors,
    reset, control, setValue, watch,
  } = useForm({
    mode: 'onSubmit',
    reValidateMode: 'onChange',
    resolver: yupResolver(cosignotarySchema),
  });

  useEffect(() => { reset(user); }, [reset]);

  const resetDraft = () => {
    clearErrors();
    setFormError('');
    setFieldError({});
    reset();
  };

  const onSubmit = async (data) => {
    const notificationsArr = [
      {
        delivery: 'EMAIL',
        enabled: !!data.emailNotifications,
        event: !!data.emailAfterEvents,
        beforeIncorporation: data.emailBeforeIncorporation || 0,
        beforeFinancialYearEnd: data.emailBeforeFinancialYearEnd || 0,
        beforeAnniversaryOfLastAgm: data.emailBeforeAGM || 0,
      }, {
        delivery: 'SMS',
        enabled: !!data.smsNotifications,
        event: !!data.smsAfterEvents,
        beforeIncorporation: data.smsBeforeIncorporation || 0,
        beforeFinancialYearEnd: data.smsBeforeFinancialYearEnd || 0,
        beforeAnniversaryOfLastAgm: data.smsBeforeAGM || 0,
      },
    ];

    setFormError();
    setFieldError({});

    rmEmptyFormDataFields(data);

    setLoading(true);
    try {
      await updateUserNotifications({
        notifications: [...notificationsArr],
      });
      await dispatch(updateUser({
        ...user,
        ...data,
        ...(user?.avatar && { avatarId: user.avatar.id }),
      }));

      dispatch(showModal(SUCCESS_MODAL, { text: 'Personal information was updated' }));
    } catch (err) {
      if (!err.response) return;
      err.response.data.errors.forEach(({ field, message }) => {
        if (!field) { setFormError(SERVER_ERRORS[message] || SERVER_ERRORS.DEFAULT); }
        setFieldError({ [field]: SERVER_ERRORS[message] || SERVER_ERRORS.DEFAULT });
      });
    } finally {
      setLoading(false);
    }
  };

  const watchEmailNotifications = watch('emailNotifications', user.emailNotifications);
  // const watchSmsNotifications = watch('smsNotifications', user.smsNotifications);

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={s.wrap}>
      <h3 className={s.fieldsTitle}>Personal info</h3>
      <div className={s.fields}>
        <span className={s.label}>First name</span>
        <PrimaryInput
          name="name"
          ref={register}
          defaultValue={user.name}
          placeholder="First name"
          error={fieldError.name || errors.name?.message}
          onChange={() => setFieldError({ name: '' })}
        />
        <span className={s.label}>Surname</span>
        <PrimaryInput
          ref={register}
          name="surname"
          placeholder="Surname"
          defaultValue={user.surname}
          error={fieldError.surname || errors.surname?.message}
          onChange={() => setFieldError({ surname: '' })}
        />
        <span className={s.label}>ID</span>
        <PrimaryInput
          ref={register}
          name="personalId"
          placeholder="ID"
          defaultValue={user.personalId}
          error={fieldError.personalId || errors.personalId?.message}
          onChange={() => setFieldError({ personalId: '' })}
        />
      </div>
      <h3 className={s.fieldsTitle}>Contact Info</h3>
      <div className={s.fields}>
        <span className={s.label}>Email</span>
        <PrimaryInput
          ref={register}
          name="email"
          defaultValue={user.email}
          placeholder="Email"
          error={fieldError.email || errors.email?.message}
          readOnly
          onChange={() => setFieldError({ email: '' })}
        />
        <span className={s.label}>Phone number</span>
        <PrimaryInput
          ref={register}
          name="phoneNumber"
          defaultValue={user.phoneNumber}
          placeholder="Phone number"
          error={fieldError.phoneNumber || errors.phoneNumber?.message}
          onChange={() => setFieldError({ phoneNumber: '' })}
        />
        <span className={s.label}>Correspondence address</span>
        <PrimaryInput
          ref={register}
          name="correspondenceAddress"
          defaultValue={user.correspondenceAddress}
          placeholder="Correspondence Address"
          error={fieldError.correspondenceAddress || errors.correspondenceAddress?.message}
          onChange={() => setFieldError({ correspondenceAddress: '' })}
        />
        <span className={s.label}>Residential address</span>
        <PrimaryInput
          ref={register}
          name="residentialAddress"
          defaultValue={user.residentialAddress}
          placeholder="Residential Address"
          error={fieldError.residentialAddress || errors.residentialAddress?.message}
          onChange={() => setFieldError({ residentialAddress: '' })}
        />
      </div>
      <h3 className={s.fieldsTitle}>Notifications Settings</h3>
      <div className={s.fields}>
        <span className={s.label}>E-mail</span>
        <div className={s.group}>
          <Controller
            name="emailNotifications"
            control={control}
            defaultValue={user.emailNotifications}
            render={({ name, value }) => (
              <Switch
                label={value ? 'Enable' : 'Disable'}
                defaultChecked={value}
                onChange={() => setValue(name, !value)}
                name={name}
              />
            )}
          />
          {watchEmailNotifications && (
            <div className={s.subgroup}>
              <Controller
                name="emailAfterEvents"
                control={control}
                defaultValue={user.emailAfterEvents}
                render={({ name, value }) => (
                  <Checkbox
                    className={s.field}
                    id="emailAfterEvents"
                    name={name}
                    label="After every event"
                    isChecked={value}
                    onChange={() => setValue(name, !value)}
                  />
                )}
              />
              {getEmalNotificationsFields(user.role)
                .map(({ field, hint }) => (
                  <Controller
                    key={field}
                    name={field}
                    control={control}
                    defaultValue={user[field]}
                    render={({ name, value }) => (
                      <CheckboxInput
                        wrapClassName={s.field}
                        name={name}
                        hint={hint}
                        onChange={setValue}
                        value={value}
                        error={errors[field]?.message}
                      />
                    )}
                  />
                ))}
              <div className={s.separator} />
            </div>
          )}
        </div>

        {/* <span className={s.label}>SMS</span>
        <div className={s.group}>
          <Controller
            name="smsNotifications"
            control={control}
            defaultValue={user.smsNotifications}
            render={({ name, value }) => (
              <Switch
                label={value ? 'Enable' : 'Disable'}
                defaultChecked={value}
                onChange={() => setValue(name, !value)}
                name={name}
              />
            )}
          />
          {watchSmsNotifications && (
            <div className={s.subgroup}>
              <Controller
                name="smsAfterEvents"
                control={control}
                defaultValue={user.smsAfterEvents}
                render={({ name, value }) => (
                  <Checkbox
                    className={s.field}
                    id={name}
                    name={name}
                    label="After every event"
                    isChecked={value}
                    onChange={() => setValue(name, !value)}
                  />
                )}
              />
              {getSmsNotificationsFields(user.role)
                .map(({ field, hint }) => (
                  <Controller
                    name={field}
                    control={control}
                    defaultValue={user[field]}
                    key={field}
                    render={({ name, value }) => (
                      <CheckboxInput
                        wrapClassName={s.field}
                        name={name}
                        hint={hint}
                        onChange={setValue}
                        value={value}
                        error={errors[field]?.message}
                      />
                    )}
                  />
                ))}
            </div>
          )}
        </div> */}
      </div>

      {!!formError && <div className={s.error}>{formError}</div> }
      <div className={s.panel}>
        <Button
          theme="white"
          value="Cancel"
          type="button"
          onClick={resetDraft}
        />
        <Button
          isLoading={isLoading}
          theme="gray"
          value="Save changes"
          type="submit"
        />
      </div>
    </form>
  );
};

export default EditCosignatoryForm;
