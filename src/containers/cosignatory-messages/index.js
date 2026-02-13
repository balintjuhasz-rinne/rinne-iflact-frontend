import React, { useEffect, useState, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import CosignatoryMessagesFilter from './cosignatory-messages-filter';
import CosignatoryMessagesTable from './cosignatory-messages-table';
import PageLoader from '../../components/page-loader';
import EmptyScreen from '../../components/empty-screen';

import { normalizeError, isPageListEmpty } from '../../helpers/functions.helper';
import { setCosignatoryMessages } from '../../actions/cosignatory.actions';
import { makeCosignatoryMessagesSelector } from '../../selectors/cosignatory.selectors';
import { showModal } from '../../actions/modal.actions';
import { ERROR_MODAL } from '../../constants/modal.constants';

const CosignatoryMessages = () => {
  const dispatch = useDispatch();
  const { messages, messagesFilterConfig, registrationCompleted } = useSelector(makeCosignatoryMessagesSelector);

  const [isLoading, setLoading] = useState(false);
  const { query: { id } } = useRouter();

  useEffect(() => {
    (async () => {

      try {
        setLoading(true);
        await dispatch(setCosignatoryMessages(id));
      } catch (e) {
        const error = normalizeError(e);
        dispatch(showModal(ERROR_MODAL, { error }));
        throw new Error(e);
      } finally {
        setLoading(false);
      }
    })();
  }, [registrationCompleted]);

  const isListEmpty = useMemo(() => isPageListEmpty(messages, messagesFilterConfig), [messages, messagesFilterConfig]);

  return (
    <>
      {isLoading && <PageLoader />}
      {isListEmpty ? <EmptyScreen text="No messages yet" /> : (
        <>
          <CosignatoryMessagesFilter />
          <CosignatoryMessagesTable />
        </>
      )}
    </>
  );
};

export default CosignatoryMessages;
