import React from 'react';
import { useSelector } from 'react-redux';

import Step1 from './step-1';
import Step2 from './step-2';
import Step3 from './step-3';

import { getNewResolutionSelector } from '../../../selectors/resolutions.selectors';

const CreateCompanyForm = () => {
  const { newResolution: { step } } = useSelector(getNewResolutionSelector);

  return (
    <>
      {step === 1 && <Step1 />}
      {step === 2 && <Step2 />}
      {step === 3 && <Step3 />}
    </>
  );
};

export default CreateCompanyForm;
