import { yupResolver } from '@hookform/resolvers/yup';
import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { deleteCompany, updateCompany } from '../../../actions/company.actions';
import { loadFile } from '../../../actions/global.actions';
import { hideModal, showModal } from '../../../actions/modal.actions';
import { setUser } from '../../../actions/user.actions';
import Button from '../../../components/buttons/primary-button';
import ImageLoader from '../../../components/image-loader';
import DateInput from '../../../components/inputs/date-input';
import Input from '../../../components/inputs/primary-input';
import Textarea from '../../../components/inputs/textarea';
import { REQUIRED, SERVER_ERRORS } from '../../../constants/error.constants';
import {
  DELETE_COMPANY_MODAL,
  EDIT_COMPANY_MODAL,
} from '../../../constants/modal.constants';
import { COMPANIES_PATH } from '../../../constants/router.constants';
import {
  formatTimezone,
  normalizeError,
} from '../../../helpers/functions.helper';
import { getUserCompanyIdSelector } from '../../../selectors/user.selectors';
import s from './edit-company-form.module.scss';
import { schema } from './validation.schema';

const EditCompanyForm = ({
  isCosecFirstEnter,
  info,
  isCompanyHasResolutions,
}) => {
  const dispatch = useDispatch();
  const router = useRouter();
  const [formErrors, setFormErrors] = useState([]);
  const [fileError, setFileError] = useState(null);
  const [isFileLoading, setFileLoading] = useState(false);

  const companyId = useSelector(getUserCompanyIdSelector);
  const [file, setFile] = useState(info.logo);
  const datePlaceholder = 'DD/MM/YYYY';

  const [incorporationDate, setIncorporationDate] = useState({
    value: info.incorporationDate ? new Date(info.incorporationDate) : null,
  });
  const [financialYearEndDate, setFinancialYearEndDate] = useState({
    value: info.financialYearEndDate
      ? new Date(info.financialYearEndDate)
      : null,
  });
  const [nextMeetingDate, setNextMeetingDate] = useState({
    value: info.nextMeetingDate ? new Date(info.nextMeetingDate) : null,
  });

  const { register, handleSubmit, errors } = useForm({
    mode: 'onSubmit',
    reValidateMode: 'onSubmit',
    resolver: yupResolver(schema),
  });

  const isCosecCompany = info.id === companyId;

  const closeModal = () => {
    dispatch(hideModal(EDIT_COMPANY_MODAL));
  };

  const onSubmit = async (data) => {
    if (!incorporationDate || !incorporationDate.value) {
      setIncorporationDate({ error: REQUIRED });
      return;
    }

    if (!financialYearEndDate || !financialYearEndDate.value) {
      setFinancialYearEndDate({ error: REQUIRED });
      return;
    }

    const company = {
      ...data,
      id: info.id || companyId,
      logoId: file?.id || null,
      logo: file,
      incorporationDate: formatTimezone(incorporationDate.value, true),
      financialYearEndDate: formatTimezone(financialYearEndDate.value, true),
      nextMeetingDate: formatTimezone(nextMeetingDate.value, true),
    };

    try {
      await dispatch(updateCompany(company));
      if (isCosecCompany) {
        await dispatch(setUser());
      }
      await closeModal();
    } catch (err) {
      const formErrs = err.response?.data.errors.map(({ message }) => message);
      if (formErrs) setFormErrors(formErrs);
    }
  };

  const confirmDeleteCompany = () => {
    dispatch(hideModal(EDIT_COMPANY_MODAL));
    dispatch(
      showModal(DELETE_COMPANY_MODAL, {
        deleteCompany: () => {
          router.push(COMPANIES_PATH);
          dispatch(deleteCompany(info.id));
        },
      }),
    );
  };

  const selectCompanyLogo = async (logo) => {
    if (!logo) {
      setFile(null);
      return;
    }
    try {
      setFileLoading(true);
      const data = await loadFile(logo, 'logo');
      setFile(...data);
    } catch (err) {
      setFileError(normalizeError(err?.response?.data?.errors || 'error'));
    } finally {
      setFileLoading(false);
    }
  };

  return (
    <form className={s.form} onSubmit={handleSubmit(onSubmit)}>
      <div className={s.row}>
        <Input
          label="Company name *"
          placeholder="Company name"
          name="name"
          wrapClassName={s.halfWidth}
          ref={register}
          error={errors.name?.message}
          defaultValue={info.name}
        />
        <Input
          label="Company registration number *"
          placeholder="Company registration number"
          name="registrationNumber"
          wrapClassName={s.halfWidth}
          ref={register}
          error={errors.registrationNumber?.message}
          defaultValue={info.registrationNumber}
        />
      </div>
      <div className={s.row}>
        <Input
          label="Company email *"
          placeholder="Company email"
          name="email"
          wrapClassName={s.halfWidth}
          ref={register}
          error={errors.email?.message}
          defaultValue={info.email}
        />
        <Input
          label="Company phone number *"
          placeholder="+"
          name="phoneNumber"
          wrapClassName={s.halfWidth}
          ref={register}
          error={errors.phoneNumber?.message}
          defaultValue={info.phoneNumber}
        />
      </div>
      <div className={s.row}>
        <Input
          label="Company address *"
          placeholder="Company address"
          name="address"
          wrapClassName={s.halfWidth}
          ref={register}
          error={errors.address?.message}
          defaultValue={info.address}
        />
        <Input
          label="Website"
          placeholder="http://"
          name="website"
          wrapClassName={s.halfWidth}
          ref={register}
          error={errors.website?.message}
          defaultValue={info.website}
        />
      </div>
      <div className={s.row}>
        <DateInput
          wrapClassName={s.oneThirdWidth}
          label="Date of incorporation *"
          error={incorporationDate.error}
          placeholder={datePlaceholder}
          selected={incorporationDate.value}
          onChange={(date) => setIncorporationDate({ value: date })}
        />
        <DateInput
          wrapClassName={s.oneThirdWidth}
          label="Financial year end *"
          error={financialYearEndDate.error}
          placeholder={datePlaceholder}
          selected={financialYearEndDate.value}
          onChange={(date) => setFinancialYearEndDate({ value: date })}
        />
        <DateInput
          wrapClassName={s.oneThirdWidth}
          label="Last Annual General Meeting"
          error={nextMeetingDate?.error}
          placeholder={datePlaceholder}
          selected={nextMeetingDate.value}
          onChange={(date) => setNextMeetingDate({ value: date })}
        />
      </div>
      <div className={s.row}>
        <Textarea
          label="Company Profile"
          placeholder="Enter company profile information..."
          name="profile"
          hint="max 500 characters"
          size="md"
          error={errors.profile?.message}
          ref={register}
          defaultValue={info.profile}
        />
      </div>
      <div className={s.row}>
        <Textarea
          label="Comment"
          placeholder="Enter comment for the company..."
          name="comment"
          hint="max 500 characters"
          size="md"
          error={errors.comment?.message}
          ref={register}
          defaultValue={info.comment}
        />
      </div>

      <div className={s.row}>
        <ImageLoader
          label="Click to upload company logo"
          selectedFile={file}
          selectFile={selectCompanyLogo}
          name="create-company-logo"
          error={fileError}
          isLoading={isFileLoading}
          setFileError={setFileError}
          sizeLimit={2}
        />
      </div>
      {!!formErrors.length && (
        <div className={s.errors}>
          {formErrors.map((item) => (
            <div className={s.error}>
              {SERVER_ERRORS[item] || SERVER_ERRORS.DEFAULT}
            </div>
          ))}
        </div>
      )}
      <div className={s.panel}>
        <Button
          theme="red"
          value="Delete company"
          type="button"
          onClick={confirmDeleteCompany}
          disabled={
            isCosecFirstEnter || isCosecCompany || isCompanyHasResolutions
          }
        />
        <Button
          theme="white"
          value="Cancel"
          type="button"
          onClick={closeModal}
          disabled={isCosecFirstEnter}
        />
        <Button theme="gray" value="Save changes" type="submit" />
      </div>
    </form>
  );
};

EditCompanyForm.propTypes = {
  isCosecFirstEnter: PropTypes.bool,
  info: PropTypes.object.isRequired,
  isCompanyHasResolutions: PropTypes.bool,
};

EditCompanyForm.defaultProps = {
  isCosecFirstEnter: false,
  isCompanyHasResolutions: false,
};

export default EditCompanyForm;
