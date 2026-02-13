import { yupResolver } from '@hookform/resolvers/yup';
import cn from 'classnames';
import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { Controller, useFieldArray, useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { setCompaniesList } from '../../../actions/companies.actions';
import { getCosignatoriesEmails, setCosignatories } from '../../../actions/cosignatories.actions';
import {
  createCosignatory, getCosignatoryInfo, inviteCosignatoryToCompanies, loadAndSetCosignatoryInfo,
} from '../../../actions/cosignatory.actions';
import { hideModal, showModal } from '../../../actions/modal.actions';
import Button from '../../../components/buttons/primary-button';
import Dropdown from '../../../components/dropdown';
import Checkbox from '../../../components/inputs/checkbox';
import Input from '../../../components/inputs/primary-input';
import PageLoader from '../../../components/page-loader';
import { SERVER_ERRORS } from '../../../constants/error.constants';
import { IC_INFO } from '../../../constants/image.constants';
import {
  ERROR_MODAL,
  INVITE_COSIGNATORY_MODAL,
  SUCCESS_MODAL,
} from '../../../constants/modal.constants';
import { DEFAULT_VOTING_VALUE } from '../../../constants/user.constants';
import {
  isDropdownShareholderActive,
  transformDropdownPositionsForBackend,
} from '../../../helpers/account.helpers';
import {
  getDropdownOption,
  normalizeError,
  rmEmptyFormDataFields,
} from '../../../helpers/functions.helper';
import { getCompaniesSelector } from '../../../selectors/companies.selectors';
import positionsOptions from './dropdownPositionsOptions';
import s from './invite-cosignatory-form.module.scss';
import { schema } from './validation.schema';

const InviteCosignatoryForm = ({ cosignatory, companyId }) => {
  const dispatch = useDispatch();

  const { list: companies } = useSelector(getCompaniesSelector);

  const companiesOptions = companies.map(({ name, id }) => ({
    title: name,
    id,
  }));

  const [isLoading, setLoading] = useState(false);
  const [isSubmitLoading, setSubmitLoading] = useState(false);
  const [formErrors, setFormErrors] = useState([]);
  const [choosenEmail, setChoosenEmail] = useState('');
  const [isFormSetAuto, setIsFormSetAuto] = useState(false);
  const [emailOptions, setEmailOptions] = useState([]);
  const [selectedUser, setSelectedUser] = useState();

  const {
    register,
    handleSubmit,
    errors,
    setValue,
    control,
    clearErrors,
  } = useForm({
    mode: 'onChange',
    reValidateMode: 'onChange',
    resolver: yupResolver(schema),
    defaultValues: {
      workplaces: [
        {
          title: '',
          companyId: null,
          positions: positionsOptions,
          vetoPower: false,
          votingValue: DEFAULT_VOTING_VALUE,
          isShareholderSelected: false,
        },
      ],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'workplaces',
  });

  const addCompany = () => {
    append({
      title: '',
      companyId: null,
      positions: positionsOptions,
      vetoPower: false,
      votingValue: DEFAULT_VOTING_VALUE,
      isShareholderSelected: false,
    });
  };

  const closeModal = () => {
    dispatch(hideModal(INVITE_COSIGNATORY_MODAL));
  };

  const onCompanyDropdownChange = (id, index = 0) => {
    const { title } = getDropdownOption(companiesOptions, id);
    setValue(`workplaces[${index}].title`, title);
    setValue(`workplaces[${index}].companyId`, id);
  };

  const onCompanyDropdownSearch = (e, index) => {
    clearErrors(`workplaces[${index}].companyId`);
    setValue(`workplaces[${index}].title`, e.target.value);
    setValue(`workplaces[${index}].companyId`, undefined);
  };

  const setUserInfo = ({
    name,
    phoneNumber,
    surname,
    email,
    personalId,
    correspondenceAddress,
    residentialAddress,
  }) => {
    setValue('phoneNumber', phoneNumber);
    setValue('name', name);
    setValue('surname', surname);
    setValue('email', email);
    setChoosenEmail(email);
    setValue('personalId', personalId);
    setValue('correspondenceAddress', correspondenceAddress);
    setValue('residentialAddress', residentialAddress);
    if (!companyId) {
      setValue('workplaces', [
        {
          title: '',
          companyId: null,
          positions: positionsOptions,
          vetoPower: false,
          votingValue: DEFAULT_VOTING_VALUE,
          isShareholderSelected: false,
        },
      ]);
    }
  };

  const setSelectedCosignatory = (cosignatoryInfo) => {
    clearErrors();
    setSelectedUser(cosignatoryInfo);
    setUserInfo(cosignatoryInfo);
    setIsFormSetAuto(true);
  };

  const onEmailDropdownChange = async (id) => {
    const cosignatoryInfo = await getCosignatoryInfo(id);
    setSelectedCosignatory(cosignatoryInfo);
  };

  const onEmailDropdownSearch = ({ target }) => {
    setChoosenEmail(target.value);
    setValue('email', target.value);
    if (isFormSetAuto) {
      setSelectedUser(null);
      setUserInfo({});
      setIsFormSetAuto(false);
    }
  };

  const onPositionChange = (id, index, positions) => {
    const position = positions.find((item) => item.id === id);
    const positionIndex = positions.findIndex((item) => item.id === id);
    const newPosition = {
      ...position,
      isActive: !position.isActive,
    };
    const newPositions = [
      ...positions.slice(0, positionIndex),
      newPosition,
      ...positions.slice(positionIndex + 1),
    ];
    const isShareholderActive = isDropdownShareholderActive(newPositions);

    if (isShareholderActive) {
      setValue(`workplaces[${index}].isShareholderSelected`, true);
    } else {
      setValue(`workplaces[${index}].isShareholderSelected`, false);
      setValue(`workplaces[${index}].vetoPower`, false);
      setValue(`workplaces[${index}].votingValue`, DEFAULT_VOTING_VALUE);
    }
    setValue(`workplaces[${index}].positions`, newPositions);
  };

  const removeCompany = (index) => {
    remove(index);
    setFormErrors([]);
  };

  const onSubmit = async (data) => {
    const { workplaces } = data;
    rmEmptyFormDataFields(data);

    const modalText = selectedUser
      ? 'Co-signatory was invited to a new company(s)'
      : `An invitation has been sent to ${data.email}`;
    data.workplaces = workplaces.map((item) => ({
      ...item,
      positions: transformDropdownPositionsForBackend(item.positions),
    }));

    try {
      await setSubmitLoading(true);
      if (selectedUser) {
        await inviteCosignatoryToCompanies(selectedUser.id, {
          workplaces: data.workplaces,
        });
      } else {
        await createCosignatory(data);
      }
      await closeModal();
      await dispatch(
        showModal(SUCCESS_MODAL, {
          text: modalText,
        }),
      );
      if (cosignatory) {
        await dispatch(loadAndSetCosignatoryInfo(cosignatory.id));
      } else {
        await dispatch(setCosignatories());
      }
    } catch (err) {
      const formErrs = err?.response?.data?.errors;
      setFormErrors(formErrs);
    } finally {
      setSubmitLoading(false);
    }
  };

  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        await dispatch(setCompaniesList());
        const { cosignatories: emails } = await getCosignatoriesEmails();
        setEmailOptions(emails.map(({ id, email }) => ({
          id,
          title: email,
        })));
      } catch (err) {
        const error = normalizeError(err);
        dispatch(showModal(ERROR_MODAL, { error }));
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  useEffect(() => {
    if (cosignatory) {
      setSelectedCosignatory(cosignatory);
    }
  }, [cosignatory]);

  useEffect(() => {
    if (companyId && companies.length) onCompanyDropdownChange(companyId);
  }, [companyId, companies]);

  return (
    <>
      {isLoading && <PageLoader withBorderRadius />}
      <form className={s.inviteForm} onSubmit={handleSubmit(onSubmit)}>
        <div className={s.inputRow}>
          <Controller
            control={control}
            name="email"
            render={() => (
              <Dropdown
                options={emailOptions}
                isSearchable={!cosignatory}
                manualOption={choosenEmail}
                disabled={cosignatory}
                name="email"
                label="Co-signatory email *"
                placeholder="Enter email"
                className={s.halfWidth}
                error={errors.email?.message}
                setActive={onEmailDropdownChange}
                onSearch={onEmailDropdownSearch}
                searchValue={choosenEmail}
                localClassName="invite"
              />
            )}
          />
          <Input
            ref={register}
            label="Co-signatory phone number"
            placeholder="+"
            name="phoneNumber"
            wrapClassName={s.halfWidth}
            error={errors.phoneNumber?.message}
            className={cn({ [s.disabled]: isFormSetAuto })}
            onChange={(e) => setValue('phoneNumber', e.target.value)}
          />
        </div>
        <div className={s.inputRow}>
          <Input
            ref={register}
            label="Co-signatory name *"
            placeholder="Name"
            name="name"
            wrapClassName={s.oneThirdWidth}
            error={errors.name?.message}
            className={cn({ [s.disabled]: isFormSetAuto })}
            onChange={(e) => setValue('name', e.target.value)}
          />
          <Input
            ref={register}
            name="surname"
            label="Co-signatory surname"
            placeholder="Surname"
            wrapClassName={s.oneThirdWidth}
            error={errors.surname?.message}
            className={cn({ [s.disabled]: isFormSetAuto })}
            onChange={(e) => setValue('surname', e.target.value)}
          />
          <Input
            ref={register}
            name="personalId"
            label="ID"
            placeholder="ID"
            wrapClassName={s.oneThirdWidth}
            error={errors.personalId?.message}
            className={cn({ [s.disabled]: isFormSetAuto })}
            onChange={(e) => setValue('personalId', e.target.value)}
          />
        </div>
        <div className={s.inputRow}>
          <Input
            ref={register}
            name="correspondenceAddress"
            label="Correspondence address"
            placeholder="Correspondence address"
            wrapClassName={s.halfWidth}
            error={errors.correspondenceAddress?.message}
            className={cn({ [s.disabled]: isFormSetAuto })}
            onChange={(e) => setValue('correspondenceAddress', e.target.value)}
          />
          <Input
            ref={register}
            name="residentialAddress"
            label="Residential address"
            placeholder="Residential address"
            wrapClassName={s.halfWidth}
            error={errors.residentialAddress?.message}
            className={cn({ [s.disabled]: isFormSetAuto })}
            onChange={(e) => setValue('residentialAddress', e.target.value)}
          />
        </div>
        {fields.map((item, index) => (index === 0 ? (
          <div key={item.id}>
            <div className={s.inputRow}>
              <Controller
                control={control}
                name={`workplaces[${index}].title`}
                render={({ value }) => (
                  <Dropdown
                    label="Company *"
                    options={companiesOptions}
                    placeholder={value ? '' : 'Choose company'}
                    setActive={(id) => onCompanyDropdownChange(id, index)}
                    isSearchable={!companyId}
                    onSearch={(e) => onCompanyDropdownSearch(e, index)}
                    searchValue={value}
                    activeOption={{ title: value }}
                    localClassName="invite"
                    error={errors?.workplaces?.[index]?.companyId?.message}
                    disabled={!!companyId}
                  />
                )}
              />
              <Controller
                control={control}
                name={`workplaces[${index}].companyId`}
                render={({ value }) => (
                  <Input wrapClassName={s.hidden} value={value} readOnly />
                )}
              />
            </div>
            <Controller
              control={control}
              name={`workplaces[${index}].isShareholderSelected`}
              render={({ value: shareholderValue }) => (
                <>
                  <div className={s.inputRow}>
                    <Controller
                      control={control}
                      name={`workplaces[${index}].positions`}
                      defaultValue={item.positions}
                      render={({ value }) => (
                        <Dropdown
                          label="Position in the company *"
                          placeholder="Select position"
                          className={s.halfWidth}
                          setActive={(id) => onPositionChange(id, index, value)}
                          options={value}
                          error={
                              errors?.workplaces?.[index]?.positions?.message
                          }
                          isMultiple
                        />
                      )}
                    />
                    <Controller
                      control={control}
                      name={`workplaces[${index}].votingValue`}
                      render={({ value }) => (
                        <Input
                          type="number"
                          min="0"
                          max="100"
                          step="0.01"
                          label="Shareholding / voting % *"
                          placeholder="1"
                          value={value}
                          onChange={(e) => setValue(
                            `workplaces[${index}].votingValue`,
                            e.target.value,
                          )}
                          wrapClassName={s.halfWidth}
                          error={
                              errors?.workplaces?.[index]?.votingValue?.message
                          }
                          readOnly={!shareholderValue}
                        />
                      )}
                    />
                  </div>
                  <div className={s.checkboxRow}>
                    <Controller
                      control={control}
                      name={`workplaces[${index}].vetoPower`}
                      defaultValue={item.vetoPower}
                      render={({ value }) => (
                        <Checkbox
                          id={`vetoPower${index}`}
                          label="Veto Power"
                          onChange={() => setValue(`workplaces[${index}].vetoPower`, !value)}
                          isChecked={value}
                          disabled={!shareholderValue}
                        />
                      )}
                    />
                    <div className={s.tip}>
                      <img src={IC_INFO} alt="info" />
                      <p className={s.checkboxText}>
                        If Veto Power is selected, then in case the person
                        votes AGAINST, then the shareholder
                        resolution/document is rejected, no matter how many
                        people and with what voting power have approved FOR (not
                        applicable for Director’s resolution)
                      </p>
                    </div>
                    {fields.length - 1 === index && !companyId && (
                      <Button
                        theme="link"
                        type="button"
                        className={s.btn}
                        onClick={() => addCompany()}
                        value="Add company"
                      />
                    )}
                  </div>
                </>
              )}
            />
          </div>
        ) : (
          <div key={item.id} className={s.additional}>
            <span className={s.title}>Company {index + 1}</span>
            <Controller
              control={control}
              name={`workplaces[${index}].isShareholderSelected`}
              render={({ value: shareholderValue }) => (
                <>
                  <div className={s.inputRow}>
                    <Controller
                      control={control}
                      name={`workplaces[${index}].title`}
                      render={({ value }) => (
                        <Dropdown
                          label="Company "
                          options={companiesOptions}
                          placeholder={value ? '' : 'Choose company'}
                          setActive={(id) => onCompanyDropdownChange(id, index)}
                          isSearchable
                          className={s.oneThirdWidth}
                          onSearch={(e) => onCompanyDropdownSearch(e, index)}
                          searchValue={value}
                          localClassName="invite"
                          error={
                              errors?.workplaces?.[index]?.companyId?.message
                          }
                        />
                      )}
                    />
                    <Controller
                      control={control}
                      name={`workplaces[${index}].companyId`}
                      render={({ value }) => (
                        <Input wrapClassName={s.hidden} value={value} />
                      )}
                    />
                    <Controller
                      control={control}
                      name={`workplaces[${index}].positions`}
                      defaultValue={item.positions}
                      render={({ value }) => (
                        <Dropdown
                          label="Position in the company *"
                          placeholder="Select position"
                          className={s.oneThirdWidth}
                          setActive={(id) => onPositionChange(id, index, value)}
                          error={
                              errors?.workplaces?.[index]?.positions?.message
                          }
                          options={value}
                          isMultiple
                        />
                      )}
                    />
                    <Controller
                      control={control}
                      name={`workplaces[${index}].votingValue`}
                      render={({ value }) => (
                        <Input
                          type="number"
                          min="0"
                          max="100"
                          step="0.01"
                          label="Shareholding / voting % *"
                          placeholder="1"
                          value={value}
                          onChange={(e) => setValue(
                            `workplaces[${index}].votingValue`,
                            e.target.value,
                          )}
                          wrapClassName={s.oneThirdWidth}
                          error={
                              errors?.workplaces?.[index]?.votingValue?.message
                          }
                          readOnly={!shareholderValue}
                        />
                      )}
                    />
                  </div>
                  <div className={s.checkboxRow}>
                    <Controller
                      control={control}
                      name={`workplaces[${index}].vetoPower`}
                      defaultValue={item.vetoPower}
                      render={({ value }) => (
                        <Checkbox
                          id={`vetoPower${index}`}
                          label="Veto Power"
                          onChange={() => setValue(`workplaces[${index}].vetoPower`, !value)}
                          isChecked={value}
                          disabled={!shareholderValue}
                        />
                      )}
                    />
                    <div className={s.tip}>
                      <img src={IC_INFO} alt="info" />
                      <p className={s.checkboxText}>
                        If Veto Power is selected, then in case the person
                        votes AGAINST, then the shareholder
                        resolution/document is rejected, no matter how many
                        people and with what voting power have approved FOR (not
                        applicable for Director’s resolution)
                      </p>
                    </div>
                    <Button
                      theme="link"
                      type="button"
                      className={s.btn}
                      onClick={() => removeCompany(index)}
                      value="Delete"
                    />
                    {fields.length - 1 === index && (
                      <Button
                        theme="link"
                        type="button"
                        className={s.btn}
                        onClick={() => addCompany()}
                        value="Add company"
                      />
                    )}
                  </div>
                </>
              )}
            />
          </div>
        )))}
        {formErrors.length > 0 && (
          <div className={s.formErrors}>
            {formErrors.map(({ field, message }) => (
              <div className={s.formError}>
                <span className={s.formErrorField}>{field}:&nbsp;</span>
                <span>{SERVER_ERRORS[message] || SERVER_ERRORS.DEFAULT}</span>
              </div>
            ))}
          </div>
        )}
        <div className={s.buttonsRow}>
          <Button
            theme="white"
            value="Cancel"
            type="button"
            className={s.button}
            onClick={closeModal}
            isLoading={isSubmitLoading}
          />
          <Button
            theme="gray"
            value="Send invitation"
            type="submit"
            className={s.button}
            disabled={errors?.workplaces?.some(
              (item) => item?.companyId?.message,
            )}
          />
        </div>
      </form>
    </>
  );
};

InviteCosignatoryForm.propTypes = {
  companyId: PropTypes.number,
  cosignatory: PropTypes.object,
};

InviteCosignatoryForm.defaultProps = {
  companyId: null,
  cosignatory: null,
};

export default InviteCosignatoryForm;
