import React from 'react';
import { useRouter } from 'next/router';
import Logs from '../../../containers/company/logs';

const CompaniesLogs = () => {
  const { query } = useRouter();
  return <Logs companyId={query.id} />;
};

CompaniesLogs.getInitialProps = () => {};

export default CompaniesLogs;
