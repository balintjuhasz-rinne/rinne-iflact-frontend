import React, { useState } from 'react';
import { useDispatch } from 'react-redux';

import Button from '../../components/buttons/primary-button';
import FileLoader from '../../components/file-loader';

import { normalizeError } from '../../helpers/functions.helper';
import { loadFile } from '../../actions/global.actions';
import { uploadTemplate } from '../../actions/templates.actions';
import { hideModal, showModal } from '../../actions/modal.actions';
import { CLIENT_ERRORS, REQUIRED } from '../../constants/error.constants';
import { UPLOAD_TEMPLATE_MODAL, ERROR_MODAL, SUCCESS_MODAL } from '../../constants/modal.constants';
import { AVALIABLE_DOC_FORMATS } from '../../constants/other.constants';

import s from './upload-template.module.scss';

const UploadTemplate = () => {
  const dispatch = useDispatch();
  const [file, setFile] = useState(null);
  const [isLoading, setLoading] = useState(false);
  const [isFileLoading, setFileLoading] = useState(false);
  const [fileError, setFileError] = useState(null);

  const removeFile = () => {
    setFile(null);
  };

  const onSelectFile = async ([fileCandidate]) => {
    if (!fileCandidate) {
      setFile(null);
      return;
    }
    if (AVALIABLE_DOC_FORMATS.every((item) => item !== fileCandidate.type)) {
      setFileError(CLIENT_ERRORS.SHOULD_BE_A_PDF_FORMAT);
      return;
    }
    setFileError(null);
    try {
      setFileLoading(true);
      const loadedFile = await loadFile(fileCandidate, 'template');
      setFile(loadedFile);
    } catch (err) {
      setFileError(normalizeError(err?.response?.data?.errors || 'error'));
    } finally {
      setFileLoading(false);
    }
  };

  const closeModal = () => {
    dispatch(hideModal(UPLOAD_TEMPLATE_MODAL));
  };

  const onSuccess = () => {
    closeModal();
    dispatch(showModal(SUCCESS_MODAL, {
      text: 'Template was uploaded',
    }));
  };

  const onSubmit = async () => {
    if (!file) {
      setFileError(REQUIRED);
    } else {
      try {
        setLoading(true);
        await dispatch(uploadTemplate(file[0].id));
        await onSuccess();
      } catch (e) {
        const error = normalizeError(e);
        dispatch(showModal(ERROR_MODAL, {
          error,
        }));
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <div className={s.wrap}>
      <div className={s.row}>
        <FileLoader
          selectedFile={file}
          selectFile={onSelectFile}
          removeFile={removeFile}
          isLoading={isFileLoading}
          error={fileError}
          setFileError={setFileError}
          className={s.fileArea}
          shouldShowDescription={false}
          name="upload-template"
        />
      </div>
      <div className={s.bottomLine}>
        <Button
          className={s.button}
          theme="white"
          value="Cancel"
          onClick={closeModal}
        />
        <Button
          className={s.button}
          theme="gray"
          value="Upload"
          onClick={onSubmit}
          isLoading={isLoading}
        />
      </div>
    </div>
  );
};

export default UploadTemplate;
