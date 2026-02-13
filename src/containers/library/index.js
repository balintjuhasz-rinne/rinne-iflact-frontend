import React, { useMemo, useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import DashboardWrapper from '../../layouts/dashboard-wrapper';
import Header from './header';
import TemplatesTable from './templates-table';
import EmptyScreen from '../../components/empty-screen';
import PageLoader from '../../components/page-loader';
import Button from '../../components/buttons/primary-button';

import { setTemplates } from '../../actions/templates.actions';
import { makeTemplatesSelector } from '../../selectors/templates.selectors';
import { UPLOAD_TEMPLATE_MODAL, ERROR_MODAL } from '../../constants/modal.constants';
import { showModal } from '../../actions/modal.actions';
import { isPageListEmpty, normalizeError } from '../../helpers/functions.helper';

const Library = () => {
  const [isLoading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const { list } = useSelector(makeTemplatesSelector);
  const isShowEmptyScreen = useMemo(() => isPageListEmpty(list), [list]);

  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        await dispatch(setTemplates());
      } catch (e) {
        const error = normalizeError(e);
        dispatch(showModal(ERROR_MODAL, { error }));
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  return (
    <>
      {isLoading && <PageLoader />}
      {
        isShowEmptyScreen
          ? (
            <EmptyScreen text="No templates yet">
              <Button
                value="Upload Template"
                theme="orange"
                onClick={() => dispatch(showModal(UPLOAD_TEMPLATE_MODAL))}
              />
            </EmptyScreen>
          )
          : (
            <>
              <Header />
              <DashboardWrapper>
                <TemplatesTable />
              </DashboardWrapper>
            </>
          )
      }
    </>
  );
};

Library.propTypes = {};

export default Library;
