import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setCompanyResolutions } from '../../../actions/company.actions';
import { showModal } from '../../../actions/modal.actions';
import EmptyScreen from '../../../components/empty-screen';
import PageLoader from '../../../components/page-loader';
import { ERROR_MODAL } from '../../../constants/modal.constants';
import { normalizeError } from '../../../helpers/functions.helper';
import DashboardWrapper from '../../../layouts/dashboard-wrapper';
import { getCompanyResolutionsSelector, getCompanySelector } from '../../../selectors/company.selectors';
import Header from '../header';
import Panel from '../panel';
import StatisticsFilter from './statistics-filter';
import TableHeader from './table-header';
import TableList from './table-list';

const CompanyStatistics = ({ companyId }) => {
  const dispatch = useDispatch();
  const { list, filterConfig } = useSelector(getCompanyResolutionsSelector);
  const { info } = useSelector(getCompanySelector);
  const [isLoading, setLoading] = useState(true);
  const [isFisrtLoad, setIsFirstLoad] = useState(true);

  useEffect(() => {
    if (isFisrtLoad) {
      setIsFirstLoad(false);
      return;
    }
    (async () => {
      try {
        setLoading(true);
        await dispatch(setCompanyResolutions(companyId));
      } catch (err) {
        const error = normalizeError(err);
        dispatch(showModal(ERROR_MODAL, { error }));
      } finally {
        setLoading(false);
      }
    })();
  }, [filterConfig]);

  return (
    <>
      {isLoading && <PageLoader />}
      <Header title={info.name} companyId={+companyId} />
      <DashboardWrapper>
        <Panel company={companyId} active="statistics" />
        <StatisticsFilter />
        {list.length > 0 ? (
          <>
            <TableHeader />
            <TableList list={list} />
          </>
        ) : (
          <EmptyScreen text="Resolutions list is empty" />
        )}
      </DashboardWrapper>
    </>
  );
};

CompanyStatistics.propTypes = {
  companyId: PropTypes.string.isRequired,
};

CompanyStatistics.defaultProps = {
};

export default CompanyStatistics;
