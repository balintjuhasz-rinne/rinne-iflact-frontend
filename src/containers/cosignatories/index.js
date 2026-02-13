import { useRouter } from 'next/router';
import React, { useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  clearFilterConfig, setCosignatories, setCurrentPage, setFilterConfig, setSortConfig,
} from '../../actions/cosignatories.actions';
import { showModal } from '../../actions/modal.actions';
import Button from '../../components/buttons/primary-button';
import EmptyScreen from '../../components/empty-screen';
import PageLoader from '../../components/page-loader';
import { ERROR_MODAL, INVITE_COSIGNATORY_MODAL } from '../../constants/modal.constants';
import { COSIGNATORIES_PATH } from '../../constants/router.constants';
import { isPageListEmpty, normalizeError } from '../../helpers/functions.helper';
import DashboardWrapper from '../../layouts/dashboard-wrapper';
import { makeSelectCosignatories } from '../../selectors/cosignatories.selectors';
import CosignatoriesFilter from './cosignatories-filter';
import CosignatoriesHeader from './cosignatories-header';
import CosignatoriesTable from './cosignatories-table';

const Cosignatories = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const [isLoading, setLoading] = useState(false);
  const {
    currentPage, list, filterConfig, sortConfig,
  } = useSelector(makeSelectCosignatories);

  const isShowEmptyScreen = useMemo(() => isPageListEmpty(list, filterConfig), [list, filterConfig]);
  const [isQueryFiltersSetted, setIsQueryFiltersSetted] = useState(false);
  const showInviteModal = () => {
    dispatch(showModal(INVITE_COSIGNATORY_MODAL));
  };

  useEffect(() => {
    const {
      page, sortOrder, sortParam, ...filters
    } = router.query;
    dispatch(setCurrentPage(page));
    dispatch(setFilterConfig(filters));
    dispatch(setSortConfig({
      ...(sortParam && { sortParam }),
      ...(sortParam && { sortOrder: +sortOrder }),
    }));
    setIsQueryFiltersSetted(true);
  }, [router.asPath]);

  useEffect(() => () => {
    dispatch(setCurrentPage());
    dispatch(clearFilterConfig());
  }, []);

  useEffect(() => {
    if (!isQueryFiltersSetted) {
      return;
    }

    router.push({
      pathname: COSIGNATORIES_PATH.slice(0, -1),
      query: {
        page: currentPage,
        ...filterConfig,
        ...sortConfig,
      },
    });

    (async () => {
      try {
        setLoading(true);
        await dispatch(setCosignatories());
      } catch (err) {
        const error = normalizeError(err);
        dispatch(showModal(ERROR_MODAL, { error }));
      } finally {
        setLoading(false);
      }
    })();
  }, [
    currentPage,
    filterConfig.name,
    filterConfig.companyId,
    filterConfig.status,
    sortConfig.sortParam,
    sortConfig.sortOrder,
  ]);

  return (
    <>
      {isLoading && <PageLoader />}
      {isShowEmptyScreen ? (
        <EmptyScreen text="No Users">
          <Button value="Invite Co-signatory" theme="orange" onClick={showInviteModal} />
        </EmptyScreen>
      ) : (
        <>
          <CosignatoriesHeader />
          <DashboardWrapper>
            <CosignatoriesFilter />
            <CosignatoriesTable />
          </DashboardWrapper>
        </>
      )}
    </>
  );
};

export default Cosignatories;
