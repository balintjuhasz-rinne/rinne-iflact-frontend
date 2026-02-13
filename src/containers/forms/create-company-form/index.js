import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import Button from '../../../components/buttons/primary-button';
import Input from '../../../components/inputs/primary-input';
import Textarea from '../../../components/inputs/textarea';
import ImageLoader from '../../../components/image-loader';
import DateInput from '../../../components/inputs/date-input';

import { DEFAULT_DATE_PLACEHOLDER } from '../../../constants/global.constants';
import { normalizeError, formatTimezone } from '../../../helpers/functions.helper';
import { getCompaniesPageSelector } from '../../../selectors/companies.selectors';
import { SERVER_ERRORS, REQUIRED } from '../../../constants/error.constants';
import { hideModal } from '../../../actions/modal.actions';
import { createCompany } from '../../../actions/company.actions';
import { loadFile } from '../../../actions/global.actions';

import { CREATE_COMPANY_MODAL } from '../../../constants/modal.constants';

import { schema } from './validation.schema';
import s from './create-company-form.module.scss';

const CreateCompanyForm = () => {
  const dispatch = useDispatch();
  const [formErrors, setFormErrors] = useState([]);
  const [file, setFile] = useState(null);
  const [isFileLoading, setFileLoading] = useState(false);
  const [fileError, setFileError] = useState(null);
  const { currentPage } = useSelector(getCompaniesPageSelector);

  const [incorporationDate, setIncorporationDate] = useState({ value: null });
  const [financialYearEndDate, setFinancialYearEndDate] = useState({ value: null });
  const [nextMeetingDate, setNextMeetingDate] = useState({ value: null });

  const {
    register, handleSubmit, errors,
  } = useForm({
    mode: 'onSubmit',
    reValidateMode: 'onSubmit',
    resolver: yupResolver(schema),
  });

  const closeModal = () => {
    dispatch(hideModal(CREATE_COMPANY_MODAL));
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

    try {
      const company = {
        ...data,
        incorporationDate: formatTimezone(incorporationDate.value, true),
        financialYearEndDate: formatTimezone(financialYearEndDate.value, true),
        nextMeetingDate: formatTimezone(nextMeetingDate.value, true),
        logoId: file?.id || null,
        logo: file,
      };

      await dispatch(createCompany({
        ...company,
      }, currentPage));

      await closeModal();
    } catch (err) {
      const formErrs = err.response?.data.errors.map(({ message }) => message);
      if (formErrs) setFormErrors(formErrs);
    }
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
        />
        <Input
          label="Company registration number *"
          placeholder="Company registration number"
          name="registrationNumber"
          wrapClassName={s.halfWidth}
          ref={register}
          error={errors.registrationNumber?.message}
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
        />
        <Input
          label="Company phone number *"
          placeholder="+"
          name="phoneNumber"
          wrapClassName={s.halfWidth}
          ref={register}
          error={errors.phoneNumber?.message}
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
        />
        <Input
          label="Website"
          placeholder="Website url"
          name="website"
          wrapClassName={s.halfWidth}
          ref={register}
          error={errors.website?.message}
        />
      </div>
      <div className={s.row}>
        <DateInput
          wrapClassName={s.oneThirdWidth}
          label="Date of incorporation *"
          error={incorporationDate?.error}
          placeholder={DEFAULT_DATE_PLACEHOLDER}
          selected={incorporationDate.value}
          onChange={(date) => setIncorporationDate({ value: date })}
        />
        <DateInput
          wrapClassName={s.oneThirdWidth}
          label="Financial year end *"
          error={financialYearEndDate?.error}
          placeholder={DEFAULT_DATE_PLACEHOLDER}
          selected={financialYearEndDate.value}
          onChange={(date) => setFinancialYearEndDate({ value: date })}
        />
        <DateInput
          wrapClassName={s.oneThirdWidth}
          label="Last Annual General Meeting"
          error={nextMeetingDate?.error}
          placeholder={DEFAULT_DATE_PLACEHOLDER}
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
            <div key={item} className={s.error}>{SERVER_ERRORS[item] || SERVER_ERRORS.DEFAULT}</div>
          ))}
        </div>
      )}
      <div className={s.panel}>
        <Button theme="white" value="Cancel" type="button" onClick={closeModal} />
        <Button theme="gray" value="CREATE COMPANY" type="submit" />
      </div>
    </form>
  );
};

export default CreateCompanyForm;
