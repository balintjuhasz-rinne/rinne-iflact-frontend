import React from 'react';
import { useRouter } from 'next/router';
import Statistics from '../../../containers/company/statistics';

const CompaniesStat = () => {
  const { query } = useRouter();
  return <Statistics companyId={query.id} />;
};

CompaniesStat.getInitialProps = () => {};

export default CompaniesStat;
