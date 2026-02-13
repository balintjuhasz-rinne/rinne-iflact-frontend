import React, { useEffect, useState } from 'react';
import { useForm, useFieldArray, Controller } from 'react-hook-form';
import { useSelector, useDispatch } from 'react-redux';
import { yupResolver } from '@hookform/resolvers/yup';
import cn from 'classnames';
import TextareaAutosize from 'react-autosize-textarea';
import Input from '../../components/inputs/primary-input';
import Button from '../../components/buttons/primary-button';
import Checkbox from '../../components/inputs/checkbox';
import Dropdown from '../../components/dropdown';
import PageLoader from '../../components/page-loader';
import {
  setCosignatoryEditing,
  updateCosignatory,
  loadAndSetCosignatoryInfo,
  createOrEditCosignatoryComment,
  deleteCosignatoryComment,
  deleteCosignatoryWorkplace,
  setCosignatoryInfo,
} from '../../actions/cosignatory.actions';
import { setCompaniesList } from '../../actions/companies.actions';
import { SERVER_ERRORS, INACTIVATE_WORKPLACE_ERRORS } from '../../constants/error.constants';
import {
  USER_ROLES,
  DEFAULT_VOTING_VALUE,
} from '../../constants/user.constants';
import { ERROR_MODAL, SUCCESS_MODAL } from '../../constants/modal.constants';
import {
  getCosignatoryInfoSelector,
  getcosignatoryEditingSelector,
} from '../../selectors/cosignatory.selectors';
import { getUserRoleSelector } from '../../selectors/user.selectors';
import {
  isDropdownShareholderActive,
  transformDropdownPositionsForBackend,
  transformStoreToDropdownPositions,
  transformDropdownPositionsForStore,
} from '../../helpers/account.helpers';
import {
  normalizeError,
  rmEmptyFormDataFields,
} from '../../helpers/functions.helper';
import {
  IC_SUCCESS_TRANSPARENT,
  IC_CLOSE,
  IC_CHECK,
} from '../../constants/image.constants';
import { showModal } from '../../actions/modal.actions';
import { schema } from './validation.schema';
import s from './cosignatory-profile.module.scss';

const CosignatoryProfile = () => {
  const dispatch = useDispatch();
  const { info: cosignatoryInfo } = useSelector(getCosignatoryInfoSelector);
  const { role } = useSelector(getUserRoleSelector);
  const { isEditing } = useSelector(getcosignatoryEditingSelector);
  const [isLoading, setLoading] = useState(false);
  const [formErrors, setFormErrors] = useState([]);
  const [fieldError, setFieldError] = useState({});
  const [userComment, setUserComment] = useState('');
  const [preventOnBlurComment, setPreventOnBlurComment] = useState(false);

  const {
    register,
    handleSubmit,
    errors,
    clearErrors,
    setValue,
    control,
    reset,
  } = useForm({
    mode: 'onChange',
    defaultValues: cosignatoryInfo,
    reValidateMode: 'onChange',
    resolver: yupResolver(schema),
  });

  const onCancel = () => {
    reset(cosignatoryInfo);
    setFieldError({});
    clearErrors();
    setFormErrors([]);
    dispatch(setCosignatoryEditing(false));
  };

  const { fields: workplaces } = useFieldArray({
    control,
    name: 'workplaces',
    keyName: 'fieldsId',
  });

  const onSubmit = async (data) => {
    const formattedWorkplaces = data.workplaces?.map((item) => ({
      ...item,
      positions: transformDropdownPositionsForBackend(item.positions),
    }));
    rmEmptyFormDataFields(data);
    try {
      await updateCosignatory(cosignatoryInfo.id, {
        ...data,
        ...(formattedWorkplaces && { workplaces: formattedWorkplaces }),
      });
      await dispatch(
        loadAndSetCosignatoryInfo(cosignatoryInfo.id, {
          ...data,
          workplaces: data.workplaces?.map((item) => ({
            ...item,
            positions: transformDropdownPositionsForStore(item.positions),
          })),
        }),
      );
      await dispatch(setCosignatoryEditing(false));
      setFormErrors([]);
      setFieldError({});
    } catch (error) {
      const errs = error.response?.data?.errors;
      const workplaceErrors = errs
        .filter(({ details }) => details?.companyId)
        .reduce((groupedErrors, { message, details }) => {
          const index = cosignatoryInfo.workplaces.findIndex((item) => item.companyId === details.companyId);
          return { ...groupedErrors, [index]: [...groupedErrors[index] || [], message] };
        }, {});

      setFieldError({ workplaces: workplaceErrors });

      const otherErrors = [];
      errs
        .filter(({ details }) => !details?.companyId)
        .forEach(({ field, message }) => {
          if (field) {
            setFieldError({ [field]: SERVER_ERRORS[message] || SERVER_ERRORS.DEFAULT });
          } else {
            otherErrors.push({ field, message });
          }
        });

      setFormErrors(otherErrors);
    }
  };

  const onPositionChange = (id, index, positions) => {
    const position = positions.find((item) => item.id === id);
    const positionIndex = positions.findIndex((item) => item.id === id);
    const newPosition = {
      ...position,
      isActive: !position.isActive,
    };
    const newPositions = [...positions.slice(0, positionIndex), newPosition, ...positions.slice(positionIndex + 1)];
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

  const createOrEditComment = async () => {
    if (userComment === (cosignatoryInfo?.comment?.text || '')) {
      return;
    }
    try {
      await createOrEditCosignatoryComment(cosignatoryInfo.id, userComment);
      dispatch(setCosignatoryInfo({ comment: { ...cosignatoryInfo.comment, text: userComment } }));
      setValue('comment.text', userComment);
      setFormErrors([]);
    } catch (err) {
      const errs = err?.response?.data?.errors;
      setFormErrors(errs);
    } finally {
      setPreventOnBlurComment(false);
    }
  };

  const deleteComment = async () => {
    try {
      if (cosignatoryInfo?.comment?.text) {
        await deleteCosignatoryComment(cosignatoryInfo.id);
        dispatch(setCosignatoryInfo({ comment: { ...cosignatoryInfo.comment, text: '' } }));
      }
      setValue('comment.text', '');
      setUserComment('');
      setFormErrors([]);
    } catch (err) {
      const errs = err?.response?.data?.errors;
      setFormErrors(errs);
    } finally {
      setPreventOnBlurComment(false);
    }
  };

  const handleMouseDownComment = () => {
    setPreventOnBlurComment(true);
  };

  const handleBlurComment = () => {
    if (!preventOnBlurComment) {
      createOrEditComment();
    }
  };

  const inactivateUser = async (workplace) => {
    try {
      setLoading(true);
      await deleteCosignatoryWorkplace(cosignatoryInfo.id, workplace.id);
      await dispatch(loadAndSetCosignatoryInfo(cosignatoryInfo.id));
      dispatch(showModal(SUCCESS_MODAL, { text: 'The workplace was successfully removed' }));
    } catch (err) {
      let error = normalizeError(err);
      if (error === SERVER_ERRORS.USER_HAS_ACTIVE_RESOLUTIONS) {
        error = INACTIVATE_WORKPLACE_ERRORS.HAS_OPEN_RESOLUTIONS;
      }
      dispatch(showModal(ERROR_MODAL, { error }));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    clearErrors();
    reset(cosignatoryInfo);

    setUserComment(cosignatoryInfo.comment?.text || '');
  }, [cosignatoryInfo]);

  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        await dispatch(setCompaniesList());
      } catch (e) {
        const error = normalizeError(e);
        dispatch(showModal(ERROR_MODAL, { error }));
      } finally {
        setLoading(false);
      }
    })();
    return () => onCancel();
  }, []);

  return (
    <div className={s.cosignatoryProfileWrap}>
      {isLoading && <PageLoader />}
      <form
        className={s.cosignatoryProfile}
        onSubmit={handleSubmit(onSubmit)}
        autoComplete="off"
      >
        <div className={s.block}>
          <h3 className={cn(s.title, { [s.isEditing]: isEditing })}>
            Personal info
          </h3>
          <div className={cn(s.field, { [s.isEditing]: isEditing })}>
            <div className={s.fieldName}>First name</div>
            <Input
              name="name"
              ref={register}
              error={errors?.name?.message}
              className={s.fieldInput}
              wrapClassName={s.fieldValue}
              disabled={!isEditing}
            />
          </div>
          <div className={cn(s.field, { [s.isEditing]: isEditing })}>
            <div className={s.fieldName}>Surname</div>
            <Input
              name="surname"
              ref={register}
              error={errors?.surname?.message}
              className={s.fieldInput}
              wrapClassName={s.fieldValue}
              disabled={!isEditing}
            />
          </div>
          <div className={cn(s.field, { [s.isEditing]: isEditing })}>
            <div className={s.fieldName}>Phone</div>
            <Input
              ref={register}
              name="phoneNumber"
              error={errors?.phoneNumber?.message}
              className={s.fieldInput}
              wrapClassName={s.fieldValue}
              disabled={!isEditing}
            />
          </div>
          <div className={cn(s.field, { [s.isEditing]: isEditing })}>
            <div className={s.fieldName}>ID</div>
            <Input
              ref={register}
              name="personalId"
              error={errors?.personalId?.message}
              className={s.fieldInput}
              wrapClassName={s.fieldValue}
              disabled={!isEditing}
            />
          </div>
          <div className={cn(s.field, { [s.isEditing]: isEditing })}>
            <div className={s.fieldName}>Email</div>
            <Input
              ref={register}
              name="email"
              error={fieldError.email || errors.email?.message}
              className={s.fieldInput}
              wrapClassName={s.fieldValue}
              disabled={!isEditing}
            />
          </div>
          <div className={cn(s.field, { [s.isEditing]: isEditing })}>
            <div className={s.fieldName}>Correspondence address</div>
            <Input
              ref={register}
              name="correspondenceAddress"
              className={s.fieldInput}
              wrapClassName={s.fieldValue}
              disabled={!isEditing}
              error={errors?.correspondenceAddress?.message}
            />
          </div>
          <div className={cn(s.field, { [s.isEditing]: isEditing })}>
            <div className={s.fieldName}>Residential address</div>
            <Input
              ref={register}
              name="residentialAddress"
              className={s.fieldInput}
              wrapClassName={s.fieldValue}
              disabled={!isEditing}
              error={errors?.residentialAddress?.message}
            />
          </div>
        </div>
        {workplaces.map((item, index) => (
          <div className={s.block} key={item.fieldsId}>
            <div className={cn(s.field)}>
              <h3 className={cn(s.title)}>{index + 1}. Company info</h3>
              <button
                onClick={() => inactivateUser(item)}
                className={cn(s.inactivateButton, { [s.unvisible]: isEditing })}
              >
                Inactivate
              </button>
            </div>
            <div className={cn(s.field, { [s.isEditing]: isEditing })}>
              <div className={s.fieldName}>Company name</div>
              <Controller
                control={control}
                name={`workplaces[${index}].company.name`}
                defaultValue={item.company.name}
                render={({ value }) => (
                  <Input
                    value={value}
                    className={cn(s.fieldInput, { [s.isNotEditable]: isEditing })}
                    wrapClassName={s.fieldValue}
                    disabled={!isEditing}
                    readOnly
                  />
                )}
              />
              <Controller
                control={control}
                name={`workplaces[${index}].companyId`}
                defaultValue={item.companyId}
                render={({ value }) => (
                  <Input
                    value={value}
                    wrapClassName={s.unvisible}
                    readOnly
                  />
                )}
              />
            </div>
            <Controller
              control={control}
              name={`workplaces[${index}].positions`}
              defaultValue={transformStoreToDropdownPositions(item.positions)}
              render={({ value: positions }) => (
                <>
                  <div className={cn(s.field, { [s.isEditing]: isEditing })}>
                    <div className={s.fieldName}>Position</div>
                    <Dropdown
                      placeholder="Select position"
                      options={positions}
                      setActive={(id) => onPositionChange(id, index, positions)}
                      disabled={!isEditing}
                      error={errors?.workplaces?.[index]?.positions?.message}
                      className={s.fieldDropdown}
                      isMultiple
                    />
                  </div>
                  <div className={cn({ [s.unvisible]: !isDropdownShareholderActive(positions) })}>
                    <div className={cn(s.field, { [s.isEditing]: isEditing })}>
                      <div className={s.fieldName}>Shares owned</div>
                      <Controller
                        control={control}
                        name={`workplaces[${index}].votingValue`}
                        defaultValue={item.votingValue || DEFAULT_VOTING_VALUE}
                        render={({ value }) => (
                          <Input
                            type="number"
                            min="0"
                            max="100"
                            step="0.01"
                            value={value}
                            error={errors?.workplaces?.[index]?.votingValue?.message}
                            className={s.fieldInput}
                            placeholder="1"
                            wrapClassName={s.fieldValue}
                            onChange={(e) => setValue(`workplaces[${index}].votingValue`, e.target.value)}
                            disabled={!isEditing || !isDropdownShareholderActive(positions)}
                            readOnly={!isDropdownShareholderActive(positions)}
                          />
                        )}
                      />
                    </div>
                    <div className={cn(s.field, s.fieldVetoPower, { [s.isEditing]: isEditing })}>
                      <div className={s.fieldName}>Veto power</div>
                      <div className={s.vetoPowerField}>
                        <Controller
                          control={control}
                          name={`workplaces[${index}].vetoPower`}
                          defaultValue={item.vetoPower || false}
                          render={({ value }) => (
                            <>
                              {isEditing && (
                                <Checkbox
                                  id={`vetopower${index}`}
                                  isChecked={value}
                                  onChange={() => setValue(`workplaces[${index}].vetoPower`, !value)}
                                  disabled={!isDropdownShareholderActive(positions)}
                                />
                              )}
                              {!isEditing && value && (
                                <img
                                  src={IC_SUCCESS_TRANSPARENT}
                                  alt="hasVetoPower"
                                />
                              )}
                              {!isEditing && !value && <span>-</span>}
                            </>
                          )}
                        />
                      </div>
                    </div>
                  </div>
                </>
              )}
            />
            <div className={s.formErrors}>
              {fieldError?.workplaces?.[index]?.map((el) => (
                <span key={`${el + index}`} className={s.err}>
                  {SERVER_ERRORS[el]}
                </span>
              ))}
            </div>
          </div>
        ))}
        <div className={s.block}>
          <h3 className={cn(s.title)}>Add comment</h3>
          <div className={cn(s.field, s.comment)}>
            <TextareaAutosize
              name="comment"
              maxLength="300"
              placeholder="Enter comment..."
              value={userComment}
              onChange={(e) => setUserComment(e.target.value)}
              className={cn(s.textarea)}
              disabled={role !== USER_ROLES.CO_SEC}
              onBlur={handleBlurComment}
            />
            <div className={s.controls}>
              <button
                type="button"
                onMouseDown={handleMouseDownComment}
                onClick={createOrEditComment}
                className={s.btn}
              >
                <img src={IC_CHECK} alt="add" />
              </button>
              <button
                type="button"
                onMouseDown={handleMouseDownComment}
                onClick={deleteComment}
                className={s.btn}
              >
                <img src={IC_CLOSE} alt="del" />
              </button>
            </div>
          </div>
        </div>
        {formErrors && (
          <div className={s.formErrors}>
            {formErrors.map(({ field, message }) => (
              <div className={s.formErrors}>
                {field !== 'id' && (
                  <span className={s.formErrorsField}>
                    {field.replace(/([A-Z])/g, ' $1').trim()}:&nbsp;
                  </span>
                )}
                <span>{SERVER_ERRORS[message] || SERVER_ERRORS.DEFAULT}</span>
              </div>
            ))}
          </div>
        )}
        {isEditing && (
          <div className={s.buttons}>
            <Button
              className={s.button}
              value="Cancel"
              theme="white"
              type="button"
              onClick={() => onCancel()}
            />
            <Button
              className={s.button}
              value="Save changes"
              type="submit"
              onClick={() => handleSubmit(onSubmit)}
              theme="gray"
            />
          </div>
        )}
      </form>
    </div>
  );

};

export default CosignatoryProfile;
