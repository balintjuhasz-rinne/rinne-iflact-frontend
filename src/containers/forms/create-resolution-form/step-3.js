import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { format } from 'date-fns';
import Button from '../../../components/buttons/primary-button';
import { SERVER_ERRORS } from '../../../constants/error.constants';
import { hideModal, showModal } from '../../../actions/modal.actions';
import { CREATE_RESOLUTION_MODAL, SUCCESS_MODAL } from '../../../constants/modal.constants';
import { IC_PDF } from '../../../constants/image.constants';
import { getNewResolutionSelector } from '../../../selectors/resolutions.selectors';
import { getCompaniesSelector } from '../../../selectors/companies.selectors';
import { prepareNewResolution, createResolution, setResolutionIds } from '../../../actions/resolutions.actions';
import { setAllActivities } from '../../../actions/activities.actions';
import { formatTimezone } from '../../../helpers/functions.helper';
import s from './create-resolution-form.module.scss';

// LOV optionlists:
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

const CreateResolutionStep3 = () => {
  const dispatch = useDispatch();
  const [isLoading, setLoading] = useState(false);
  const { newResolution: data } = useSelector(getNewResolutionSelector);
  const { list: companies } = useSelector(getCompaniesSelector); // a céges LOV-hoz

  const [formErrors, setFormErrors] = useState([]);
  const fieldChange = (field, value) => {
    dispatch(prepareNewResolution({ [field]: value }));
  };

  // Helper: id → title
  const getLabel = (list, id) => {
    const found = list.find((opt) => opt.id === id);
    return found ? found.title : id || '-';
  };

  // A Trader cég nevét a companies listából jelenítjük meg
  const traderName = companies && data.commodityTrader
    ? getLabel(
      companies.map(({ id, name }) => ({ id, title: name })),
      data.commodityTrader,
    )
    : data.commodityTrader || '-';

  const paymentInLabel = getLabel(paymentOptions, data.paymentIn);
  const secondPaymentInLabel = getLabel(paymentOptions, data.secondPaymentIn);
  const commodityLabel = getLabel(commodityOptions, data.commodity);
  const unitLabel = getLabel(unitOptions, data.commodityUnit);

  const onCreateResolution = async () => {
    try {
      setLoading(true);
      await dispatch(createResolution({
        ...data,
        votingEndDate: formatTimezone(data.votingEndDate),
        votingStartDate: formatTimezone(data.votingStartDate, true),
      }));
      dispatch(hideModal(CREATE_RESOLUTION_MODAL));
      await dispatch(setResolutionIds());
      await dispatch(setAllActivities());
      dispatch(showModal(SUCCESS_MODAL, {
        text: 'Contract Successfully created',
      }));
    } catch (err) {
      const formErrs = err.response?.data.errors.map(({ message }) => message);
      if (formErrs) {
        setFormErrors(formErrs);
      }
    } finally {
      setLoading(false);
    }
  };

  // Szépített amount formázás (2 tizedes, ezres)
  const formatAmount = (val) => (val === undefined || val === null || val === ''
    ? '-'
    : Number(val).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 }));

  return (
    <div className={s.wrap}>
      <div className={s.content}>
        <div className={s.grid}>
          <div className={s.item}>
            <div className={s.key}>Company name</div>
            <div className={s.val}>{data.companyName}</div>
          </div>
          <div className={s.item}>
            <div className={s.key}>Contract name</div>
            <div className={s.val}>{data.name}</div>
          </div>
          <div className={s.item}>
            <div className={s.key}>Contract Date</div>
            <div className={s.val}>
              {data.votingStartDate ? format(new Date(data.votingStartDate), 'dd.MM.yyyy') : '-'}
            </div>
          </div>
          <div className={s.item}>
            <div className={s.key}>Deferred Payment date</div>
            <div className={s.val}>
              {data.votingEndDate ? format(new Date(data.votingEndDate), 'dd.MM.yyyy') : '-'}
            </div>
          </div>
        </div>
        <div className={s.item}>
          <div className={s.key}>Details</div>
          <div className={s.val}>{data.description}</div>
        </div>

        {/* ÚJ szekció: Commodity mezők */}
        <div className={s.grid}>
          <div className={s.item}>
            <div className={s.key}>Commodity Trader</div>
            <div className={s.val}>{traderName}</div>
          </div>
          <div className={s.item}>
            <div className={s.key}>Commodity Purchase Amount</div>
            <div className={s.val}>{formatAmount(data.commodityPurchaseAmount)}</div>
          </div>
          <div className={s.item}>
            <div className={s.key}>Payment in</div>
            <div className={s.val}>{paymentInLabel}</div>
          </div>
          <div className={s.item}>
            <div className={s.key}>Commodity</div>
            <div className={s.val}>{commodityLabel}</div>
          </div>
          <div className={s.item}>
            <div className={s.key}>Commodity unit</div>
            <div className={s.val}>{unitLabel}</div>
          </div>
          <div className={s.item}>
            <div className={s.key}>Commodity quantity</div>
            <div className={s.val}>{data.commodityQuantity !== undefined ? data.commodityQuantity : '-'}</div>
          </div>
          <div className={s.item}>
            <div className={s.key}>Commodity unique ID</div>
            <div className={s.val}>{data.commodityUniqueId || '-'}</div>
          </div>
          <div className={s.item}>
            <div className={s.key}>Description of Commodity</div>
            <div className={s.val}>{data.commodityDescription || '-'}</div>
          </div>
          <div className={s.item}>
            <div className={s.key}>Sell Amount</div>
            <div className={s.val}>{formatAmount(data.sellAmount)}</div>
          </div>
          <div className={s.item}>
            <div className={s.key}>Payment in</div>
            <div className={s.val}>{secondPaymentInLabel}</div>
          </div>
          <div className={s.item}>
            <div className={s.key}>Agency deal needed?</div>
            <div className={s.val}>{data.agencyDeal ? 'Yes' : 'No'}</div>
          </div>
        </div>

        <div className={s.grid}>
          <div className={s.item}>
            <div className={s.key}>Required Approval Ratio</div>
            <div className={s.val}>{data.approvalRatio}%</div>
          </div>
          {/*
          <div className={s.item}>
            <div className={s.key}>Emergency</div>
            <div className={s.val}>{data.emergency ? 'Yes' : 'No'}</div>
          </div>
          */}
          {Array.isArray(data.file) && data.file.map((item) => (
            <div className={s.itemFile} key={item.id}>
              <img className={s.pdf} src={IC_PDF} alt="pdf" />
              <div className={s.info}>
                <p className={s.title}>{item.originalName}</p>
                <span className={s.size}>{item.size}</span>
              </div>
            </div>
          ))}
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
        <div className={s.stepHint}>3/3</div>
        <Button
          disabled={isLoading}
          theme="white"
          value="Back"
          type="button"
          onClick={() => fieldChange('step', 2)}
        />
        <Button
          disabled={isLoading}
          isLoading={isLoading}
          theme="gray"
          value="Confirm"
          onClick={onCreateResolution}
        />
      </div>
    </div>
  );
};
export default CreateResolutionStep3;
