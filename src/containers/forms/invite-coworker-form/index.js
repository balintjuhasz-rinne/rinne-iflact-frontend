import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import Input from '../../../components/inputs/primary-input';
import Button from '../../../components/buttons/primary-button';

import { inviteCosecretary } from '../../../actions/cosecretaries.actions';
import { getUserSelector } from '../../../selectors/user.selectors';
import { hideModal, showModal } from '../../../actions/modal.actions';
import { INVITE_COWORKER_MODAL, SUCCESS_MODAL } from '../../../constants/modal.constants';
import { SERVER_ERRORS } from '../../../constants/error.constants';

import { schema } from './validation.schema';
import s from './invite-coworker-form.module.scss';
import { rmEmptyFormDataFields } from '../../../helpers/functions.helper';

const InviteCoworkerForm = () => {
  const dispatch = useDispatch();
  const [isLoading, setLoading] = useState(false);
  const [formError, setFormError] = useState('');
  const [fieldError, setFieldError] = useState({});
  const { user: { workplaces } } = useSelector(getUserSelector);

  const { company } = workplaces[0];

  const {
    register, handleSubmit, errors,
  } = useForm({
    mode: 'onSubmit',
    reValidateMode: 'onSubmit',
    resolver: yupResolver(schema),
  });

  const closeModal = () => {
    dispatch(hideModal(INVITE_COWORKER_MODAL));
  };

  const onSubmit = async (data) => {

    rmEmptyFormDataFields(data);

    try {
      setLoading(true);
      await inviteCosecretary({
        ...data,
        workplaces: [
          {
            companyId: company.id,
          },
        ],
      });
      await closeModal();
      dispatch(showModal(
        SUCCESS_MODAL,
        { text: 'Co-worker successfully invited' },
      ));
    } catch (err) {
      err.response.data.errors.map(({ field, message }) => {
        if (!field) {
          setFormError(SERVER_ERRORS[message] || SERVER_ERRORS.DEFAULT);
          return null;
        }
        setFieldError({ [field]: SERVER_ERRORS[message] || SERVER_ERRORS.DEFAULT });
        return null;
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <form className={s.form} onSubmit={handleSubmit(onSubmit)}>
      <div className={s.row}>
        <Input
          label="Company"
          placeholder="Company"
          name="company"
          wrapClassName={s.halfWidth}
          defaultValue={company.name}
          readOnly
          error={fieldError.companyId}
        />
        <Input
          label="Position in the company *"
          placeholder="Position"
          name="cosecPosition"
          wrapClassName={s.halfWidth}
          ref={register}
          error={fieldError.cosecPosition || errors.position?.message}
          onChange={() => setFieldError({ cosecPosition: '' })}
        />
      </div>
      <div className={s.row}>
        <Input
          label="Co-worker name *"
          placeholder="Name"
          name="name"
          wrapClassName={s.halfWidth}
          ref={register}
          error={fieldError.name || errors.name?.message}
          onChange={() => setFieldError({ name: '' })}
        />
        <Input
          label="Co-worker surname *"
          placeholder="Surname"
          name="surname"
          wrapClassName={s.halfWidth}
          ref={register}
          error={fieldError.surname || errors.surname?.message}
          onChange={() => setFieldError({ surname: '' })}
        />
      </div>
      <div className={s.row}>
        <Input
          label="Co-worker email *"
          placeholder="Enter email"
          name="email"
          wrapClassName={s.halfWidth}
          ref={register}
          error={fieldError.email || errors.email?.message}
          onChange={() => setFieldError({ email: '' })}
        />
        <Input
          label="Co-worker phoneNumber *"
          placeholder="+"
          name="phoneNumber"
          wrapClassName={s.halfWidth}
          ref={register}
          error={fieldError.phoneNumber || errors.phoneNumber?.message}
          onChange={() => setFieldError({ phoneNumber: '' })}
        />
      </div>
      {!!formError && <div className={s.error}>{formError}</div>}
      <div className={s.panel}>
        <Button
          theme="white"
          value="Cancel"
          type="button"
          className={s.button}
          onClick={closeModal}
        />
        <Button
          isLoading={isLoading}
          theme="gray"
          value="Send invitation"
          type="submit"
          className={s.button}
        />
      </div>
    </form>
  );
};

export default InviteCoworkerForm;
