import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Document, Page, pdfjs } from 'react-pdf';
import cn from 'classnames';
import { useRouter } from 'next/router';
import { useSelector } from 'react-redux';
import Modal from '../../../components/modal/index';
import VotingModalHeader from './voting-modal-header';
import VotingModalDocuments from './voting-modal-documents';
import VotingModalComments from './voting-modal-comments';
import ErrorModalBase from '../error-modal/error-modal-base';
import PageLoader from '../../../components/page-loader';
import { getResolutionInfoSelector } from '../../../selectors/resolution.selectors';
import { getUserSelector } from '../../../selectors/user.selectors';
import s from './voting-modal.module.scss';

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

const VotingModal = ({
  closeModal, resolutionId, documents,
}) => {
  const router = useRouter();
  const [pages, setPages] = useState([]);
  const [isError, setError] = useState(false);
  const [path, setPath] = useState(documents.sort((a, b) => a.id - b.id)[0].path);
  const [isOpenPostField, setOpenPostField] = useState(false);
  const { info: { comments } } = useSelector(getResolutionInfoSelector);
  const { user: { id: userId } } = useSelector(getUserSelector);
  const isUserHaveComment = comments?.some(({ author }) => author.id === userId);
  const [isOpenCommentsSidebar, setOpenCommentsSidebar] = useState();

  const onDocumentLoadSuccess = ({ numPages }) => {
    const pageArr = Array.from(Array(numPages).keys());
    setPages(pageArr);
  };

  const onDocumentLoadError = () => {
    setError(true);
  };

  const renderError = () => (
    <div className={s.error}>
      <ErrorModalBase closeModal={closeModal} error="Error while loading document!" />
    </div>
  );

  const openCommentsAccessories = (state) => {
    setOpenPostField(state);
    setOpenCommentsSidebar(state);
  };

  useEffect(() => {
    setOpenCommentsSidebar(!!comments?.length);
  }, [comments]);

  useEffect(() => {
    router.events.on('routeChangeStart', closeModal);
    return () => {
      router.events.off('routeChangeStart', closeModal);
    };
  }, []);

  return (
    <Modal closeModal={closeModal} isPrimary={false}>
      <div className={s.wrapper}>
        <VotingModalHeader
          closeModal={closeModal}
          resolutionId={resolutionId}
          isUserHaveComment={isUserHaveComment}
          setOpenPostField={openCommentsAccessories}
        />
        <VotingModalDocuments
          list={documents}
          path={path}
          setPath={setPath}
        />
        {isOpenCommentsSidebar
          && (
            <VotingModalComments
              isOpenPostField={isOpenPostField}
              setOpenPostField={setOpenPostField}
              setOpenCommentsSidebar={setOpenCommentsSidebar}
              comments={comments}
              userId={userId}
              resolutionId={resolutionId}
            />
          )}
        <div className={cn(s.documentWrap, { [s.hasError]: isError })} data-modal-hide="false">
          <Document
            file={path}
            onLoadSuccess={onDocumentLoadSuccess}
            onLoadError={onDocumentLoadError}
            error={renderError}
            loading={<PageLoader className={s.loader} />}
          >
            {pages.map((page) => (
              <Page
                pageNumber={page + 1}
                width={801}
                className={s.page}
                key={page}
              />
            ))}
          </Document>
        </div>
      </div>
    </Modal>
  );
};

VotingModal.propTypes = {
  closeModal: PropTypes.func.isRequired,
  resolutionId: PropTypes.number.isRequired,
  documents: PropTypes.array.isRequired,
};

export default VotingModal;
