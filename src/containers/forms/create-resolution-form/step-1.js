import React, { useState, useRef, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addDays, subDays } from 'date-fns';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { DEFAULT_DATE_PLACEHOLDER } from '../../../constants/global.constants';
import { RESOLUTION_TYPES, DEFAULT_NOTICE_PERIOD } from '../../../constants/resolution.constants';
import { SERVER_ERRORS } from '../../../constants/error.constants';
import { getCompaniesSelector } from '../../../selectors/companies.selectors';
import { getNewResolutionSelector } from '../../../selectors/resolutions.selectors';
import { setCompaniesList } from '../../../actions/companies.actions';
import { prepareNewResolution } from '../../../actions/resolutions.actions';
import { getDropdownOption } from '../../../helpers/functions.helper';
import Button from '../../../components/buttons/primary-button';
import Input from '../../../components/inputs/primary-input';
import Checkbox from '../../../components/inputs/checkbox';
import Dropdown from '../../../components/dropdown';
import DateInput from '../../../components/inputs/date-input';
import Textarea from '../../../components/inputs/textarea';
import { schema } from './validation.schema';
import s from './create-resolution-form.module.scss';

const paymentOptions = [
  { title: 'RLUSD', id: 'RLUSD' },
  { title: 'XRP', id: 'XRP' },
  { title: 'JPY', id: 'JPY' },
  { title: 'USD', id: 'USD' },
];
const commodityOptions = [
  { title: 'Car', id: 'car' },
  { title: 'Machinery', id: 'machinery' },
  { title: 'Boat', id: 'boat' },
];
const unitOptions = [
  { title: 'pcs', id: 'pcs' },
  { title: 'weight', id: 'weight' },
];

const CreateResolutionStep1 = () => {
  const dispatch = useDispatch();
  const noticePeriodDateRef = useRef(null);
  const { newResolution: data } = useSelector(getNewResolutionSelector);
  const [formErrors, setFormErrors] = useState([]);
  const [isCompaniesLoading, setCompaniesLoading] = useState(true);
  const [activeCompany, setActiveCompany] = useState();

  const {
    handleSubmit, errors, control, setValue, watch, clearErrors,
  } = useForm({
    mode: 'onSubmit',
    reValidateMode: 'onChange',
    resolver: yupResolver(schema),
    defaultValues: {
      ...data,
    },
  });

  const fieldChange = (field, value) => {
    dispatch(prepareNewResolution({ [field]: value }));
    setValue(field, value);
  };

  const handleVotingDate = (value, type) => {
    if (!value) return;
    const noticePeriodDate = noticePeriodDateRef.current?.value || DEFAULT_NOTICE_PERIOD;
    clearErrors(['votingStartDate', 'votingEndDate']);
    if (type === 'start') {
      setValue('votingStartDate', value);
      fieldChange('votingStartDate', value);
      const endDate = addDays(new Date(value), Number(noticePeriodDate));
      setValue('votingEndDate', endDate);
      fieldChange('votingEndDate', endDate);
      return;
    }
    setValue('votingEndDate', value);
    fieldChange('votingEndDate', value);
    const startDate = subDays(new Date(value), Number(noticePeriodDate));
    setValue('votingStartDate', startDate);
    fieldChange('votingStartDate', startDate);
  };

  const typeOptions = Object.entries(RESOLUTION_TYPES).map(([key, value]) => ({ title: value.title, id: key }));

  const setType = (id) => {
    clearErrors('type');
    fieldChange('type', id);
  };

  useEffect(() => {
    if (data.votingStartDate) {
      handleVotingDate(data.votingStartDate, 'start');
    }
    (async () => {
      try {
        setCompaniesLoading(true);
        await dispatch(setCompaniesList());
      } catch (err) {
        const formErrs = err.response?.data.errors.map(({ message }) => message);
        if (formErrs) setFormErrors(formErrs);
      } finally {
        setCompaniesLoading(false);
      }
    })();
  }, []);

  const { list: companies } = useSelector(getCompaniesSelector);
  const companiesOptions = companies.map(({ name, id }) => ({ title: name, id }));
  const votingStartDate = watch('votingStartDate');

  const handleNoticePeriod = () => {
    const { value } = noticePeriodDateRef.current;
    if (value.length > 4) {
      noticePeriodDateRef.current.value = value.slice(0, -1);
    }
    fieldChange('noticePeriod', value);
    handleVotingDate(votingStartDate, 'start');
  };
  const handleNoticePeriodBlur = () => {
    if (noticePeriodDateRef.current.value) return;
    noticePeriodDateRef.current.value = DEFAULT_NOTICE_PERIOD;
  };
  const setCompany = (id) => {
    const company = getDropdownOption(companiesOptions, id);
    clearErrors('companyId');
    fieldChange('companyId', company.id);
    setValue('companyId', company.id);
    fieldChange('companyName', company.title);
    setActiveCompany(company);
  };
  const onDropdownSearch = (e) => {
    setActiveCompany({ title: e.target.value });
  };
  useEffect(() => {
    if (!data.companyId || !companiesOptions.length) return;
    setCompany(data.companyId);
  }, [companies]);

  // Submit: csak hook form valid mezők esetén enged tovább
  const onSubmit = () => fieldChange('step', 2);

  return (
    <form className={s.wrap} onSubmit={handleSubmit(onSubmit)}>
      <div className={s.row}>
        <div className={s.oneThirdWidth}>
          {!isCompaniesLoading && (
            <Controller
              name="companyId"
              control={control}
              defaultValue={data.companyId}
              render={({ value, onChange, name }) => (
                <Dropdown
                  name={name}
                  label="Choose Company"
                  options={companiesOptions}
                  placeholder={activeCompany?.title ? '' : 'Choose company'}
                  setActive={(id) => { setCompany(id); onChange(id); }}
                  isSearchable
                  onSearch={onDropdownSearch}
                  searchValue={activeCompany?.title}
                  localClassName="invite"
                  value={value}
                  error={errors.companyId?.message}
                />
              )}
            />
          )}
        </div>
        <Controller
          name="name"
          control={control}
          defaultValue={data.name}
          render={({ value, onChange, name }) => (
            <Input
              wrapClassName={s.oneThirdWidth}
              label="Contract name *"
              placeholder="Contract name"
              name={name}
              value={value}
              onChange={(e) => { fieldChange('name', e.target.value); onChange(e.target.value); }}
              error={errors.name?.message}
            />
          )}
        />
        <div className={s.oneThirdWidth}>
          <Controller
            name="type"
            control={control}
            defaultValue={data.type}
            render={({ value, onChange, name }) => (
              <Dropdown
                name={name}
                options={typeOptions}
                label="Contract type *"
                placeholder="Contract type"
                setActive={(id) => { setType(id); onChange(id); }}
                error={errors.type?.message}
                activeOption={typeOptions.find((type) => value === type.id)}
                value={value}
              />
            )}
          />
        </div>
      </div>
      <div className={s.row}>
        <Controller
          control={control}
          name="votingStartDate"
          defaultValue={data.votingStartDate}
          render={({ value, onChange, name }) => (
            <DateInput
              wrapClassName={s.oneThirdWidth}
              label="Contract Date *"
              name={name}
              className={s.input}
              placeholder={DEFAULT_DATE_PLACEHOLDER}
              selected={value}
              error={errors.votingStartDate?.message}
              onChange={(date) => { handleVotingDate(date, 'start'); onChange(date); }}
            />
          )}
        />
        <Input
          wrapClassName={s.oneThirdWidth}
          label="Deferred Date, days *"
          ref={noticePeriodDateRef}
          type="number"
          max="100"
          disabled={!votingStartDate}
          defaultValue={data.noticePeriod}
          placeholder={DEFAULT_NOTICE_PERIOD}
          onChange={handleNoticePeriod}
          onBlur={handleNoticePeriodBlur}
        />
        <Controller
          control={control}
          name="votingEndDate"
          defaultValue={data.votingEndDate}
          render={({ value, onChange, name }) => (
            <DateInput
              wrapClassName={s.oneThirdWidth}
              label="Deferred Payment date *"
              name={name}
              className={s.input}
              placeholder={DEFAULT_DATE_PLACEHOLDER}
              selected={value}
              error={errors.votingEndDate?.message}
              onChange={(date) => { handleVotingDate(date); onChange(date); }}
            />
          )}
        />
      </div>
      <Controller
        name="description"
        control={control}
        defaultValue={data.description}
        render={({ value, onChange, name }) => (
          <Textarea
            label="Details *"
            placeholder="Enter details"
            name={name}
            hint="max 2000 characters"
            defaultValue={value}
            size="md"
            onChange={(e) => { fieldChange('description', e.target.value); onChange(e.target.value); }}
            error={errors.description?.message}
          />
        )}
      />
      <div className={s.grid}>
        {/* ÚJ MEZŐK - minden mezőhöz Controller */}
        <Controller
          name="commodityTrader"
          control={control}
          defaultValue={data.commodityTrader}
          render={({ value, onChange, name }) => (
            <Dropdown
              name={name}
              label="Commodity Trader *"
              options={companiesOptions}
              placeholder="Select trader"
              setActive={(id) => { fieldChange('commodityTrader', id); onChange(id); }}
              value={value}
              error={errors.commodityTrader?.message}
              activeOption={companiesOptions.find((option) => value === option.id)}
            />
          )}
        />
        <Controller
          name="commodityPurchaseAmount"
          control={control}
          defaultValue={data.commodityPurchaseAmount}
          render={({ value, onChange, name }) => (
            <Input
              label="Commodity Purchase amount *"
              name={name}
              placeholder="Amount"
              value={value}
              type="number"
              onChange={(e) => { fieldChange('commodityPurchaseAmount', e.target.value); onChange(e.target.value); }}
              error={errors.commodityPurchaseAmount?.message}
            />
          )}
        />
        <Controller
          name="paymentIn"
          control={control}
          defaultValue={data.paymentIn || 'RLUSD'}
          render={({ value, onChange, name }) => (
            <Dropdown
              name={name}
              label="Payment in *"
              options={paymentOptions}
              setActive={(id) => { fieldChange('paymentIn', id); onChange(id); }}
              value={value}
              error={errors.paymentIn?.message}
              activeOption={paymentOptions.find((o) => value === o.id) || paymentOptions[0]}
            />
          )}
        />
        <Controller
          name="commodity"
          control={control}
          defaultValue={data.commodity || 'car'}
          render={({ value, onChange, name }) => (
            <Dropdown
              name={name}
              label="Commodity *"
              options={commodityOptions}
              setActive={(id) => { fieldChange('commodity', id); onChange(id); }}
              value={value}
              error={errors.commodity?.message}
              activeOption={commodityOptions.find((o) => value === o.id) || commodityOptions[0]}
            />
          )}
        />
        <Controller
          name="commodityUnit"
          control={control}
          defaultValue={data.commodityUnit}
          render={({ value, onChange, name }) => (
            <Dropdown
              name={name}
              label="Commodity unit *"
              options={unitOptions}
              setActive={(id) => { fieldChange('commodityUnit', id); onChange(id); }}
              value={value}
              error={errors.commodityUnit?.message}
              activeOption={unitOptions.find((o) => value === o.id)}
            />
          )}
        />
        <Controller
          name="commodityQuantity"
          control={control}
          defaultValue={data.commodityQuantity}
          render={({ value, onChange, name }) => (
            <Input
              label="Commodity quantity *"
              name={name}
              placeholder="Quantity"
              type="number"
              value={value}
              onChange={(e) => { fieldChange('commodityQuantity', e.target.value); onChange(e.target.value); }}
              error={errors.commodityQuantity?.message}
            />
          )}
        />
        <Controller
          name="commodityUniqueId"
          control={control}
          defaultValue={data.commodityUniqueId}
          render={({ value, onChange, name }) => (
            <Input
              label="Commodity unique ID"
              name={name}
              maxLength={50}
              placeholder="Unique ID"
              value={value}
              onChange={(e) => { fieldChange('commodityUniqueId', e.target.value); onChange(e.target.value); }}
              error={errors.commodityUniqueId?.message}
            />
          )}
        />
        <Controller
          name="commodityDescription"
          control={control}
          defaultValue={data.commodityDescription}
          render={({ value, onChange, name }) => (
            <Textarea
              label="Description of Commodity"
              name={name}
              maxLength={200}
              placeholder="Description"
              defaultValue={value}
              onChange={(e) => { fieldChange('commodityDescription', e.target.value); onChange(e.target.value); }}
              error={errors.commodityDescription?.message}
            />
          )}
        />
        <Controller
          name="sellAmount"
          control={control}
          defaultValue={data.sellAmount}
          render={({ value, onChange, name }) => (
            <Input
              label="Sell Amount *"
              name={name}
              placeholder="Amount"
              type="number"
              value={value}
              onChange={(e) => { fieldChange('sellAmount', e.target.value); onChange(e.target.value); }}
              error={errors.sellAmount?.message}
            />
          )}
        />
        <Controller
          name="secondPaymentIn"
          control={control}
          defaultValue={data.secondPaymentIn || 'RLUSD'}
          render={({ value, onChange, name }) => (
            <Dropdown
              name={name}
              label="Payment in *"
              options={paymentOptions}
              setActive={(id) => { fieldChange('secondPaymentIn', id); onChange(id); }}
              value={value}
              error={errors.secondPaymentIn?.message}
              activeOption={paymentOptions.find((o) => value === o.id) || paymentOptions[0]}
            />
          )}
        />
      </div>
      <div className={s.grid}>
        <div className={s.row}>
          <Controller
            name="agencyDeal"
            control={control}
            defaultValue={typeof data.agencyDeal === 'undefined' ? true : data.agencyDeal}
            render={({ value, onChange, name }) => (
              <Checkbox
                name={name}
                label="Agency deal needed?"
                checked={value}
                onChange={() => { fieldChange('agencyDeal', !value); onChange(!value); }}
              />
            )}
          />
          {/*
          <Controller
            name="emergency"
            control={control}
            defaultValue={data.emergency}
            render={({ value, onChange, name }) => (
              <Checkbox
                name={name}
                label="Emergency"
                type="gray"
                defaultValue
                id="emergency"
                checked={value}
                onChange={() => { fieldChange('emergency', !value); onChange(!value); }}
                className={s.checkbox}
              />
            )}
          />
          */}
        </div>
      </div>
      {!!formErrors.length && (
        <div className={s.errors}>
          {formErrors.map((item) => (
            <div key={item} className={s.error}>{SERVER_ERRORS[item] || SERVER_ERRORS.DEFAULT}</div>
          ))}
        </div>
      )}
      <div className={s.panel}>
        <div className={s.stepHint}>1/3</div>
        <Button theme="gray" value="Continue" type="submit" />
      </div>
    </form>
  );
};

export default CreateResolutionStep1;
