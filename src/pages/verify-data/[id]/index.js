import React from 'react';
import UnregisterScreen from '../../../layouts/unregister-screen';
import VerifyDataPanel from '../../../containers/verify-data-panel';

const VerifyDataPage = () => (
  <UnregisterScreen shouldHideInfoText>
    <VerifyDataPanel />
  </UnregisterScreen>
);

export default VerifyDataPage;
