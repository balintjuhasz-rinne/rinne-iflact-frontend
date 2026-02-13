import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Button from '../../components/buttons/primary-button';
import FileLoader from '../../components/file-loader';
import { setResolution, editResolution } from '../../actions/resolution.actions';
import { getResolutionInfoSelector } from '../../selectors/resolution.selectors';
import { normalizeError } from '../../helpers/functions.helper';
import { loadFile } from '../../actions/global.actions';
import { hideModal, showModal } from '../../actions/modal.actions';

import { CLIENT_ERRORS, REQUIRED } from '../../constants/error.constants';
import { EDIT_RESOLUTION_MODAL, ERROR_MODAL, SUCCESS_MODAL } from '../../constants/modal.constants';

import s from './edit-resolution.module.scss';

const EditResolution = () => {
  const dispatch = useDispatch();
  const { info } = useSelector(getResolutionInfoSelector);
  const [file, setFile] = useState(info?.documents);
  const [isLoading, setLoading] = useState(false);
  const [isFileLoading, setFileLoading] = useState(false);
  const [fileError, setFileError] = useState(null);

  const removeFile = (id) => {
    const newFiles = file.filter((item) => item.id !== id);
    setFile(newFiles);
  };

  const onSelectFile = async (fileCandidate) => {
    if (file?.length >= 50 || fileCandidate.length + file?.length > 50) {
      setFileError(CLIENT_ERRORS.INVALID_FILE_COUNT);
      return;
    }

    if (!fileCandidate || !fileCandidate.length) {
      setFile(null);
      return;
    }

    let isPdfFiles = true;
    for (let i = 0; i < fileCandidate.length; i += 1) {
      if (fileCandidate[i].type !== 'application/pdf') isPdfFiles = false;
    }

    if (!isPdfFiles) {
      setFileError(CLIENT_ERRORS.SHOULD_BE_A_PDF_FORMAT);
      return;
    }

    setFileError(null);
    try {
      setFileLoading(true);
      const loadedFile = [];
      /* eslint-disable-next-line */
      for await (const item of fileCandidate) {
        const loadedItem = await loadFile(item, 'document');
        loadedFile.push(...loadedItem);
      }
      setFile([...file, ...loadedFile]);
    } catch (err) {
      setFileError(normalizeError(err?.response?.data?.errors || 'error'));
    } finally {
      setFileLoading(false);
    }
  };

  const closeModal = () => {
    dispatch(hideModal(EDIT_RESOLUTION_MODAL));
  };

  const onSuccess = () => {
    closeModal();
    dispatch(showModal(SUCCESS_MODAL, {
      text: 'Resolution was changed',
    }));
    dispatch(setResolution(info.id));
  };

  const onSubmit = async () => {
    if (!file.length) {
      setFileError(REQUIRED);
    } else {
      try {
        setLoading(true);
        const filesIds = file.map((item) => item.id);
        await dispatch(editResolution(info.id, filesIds));
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
          name="edit-resolution"
          selectedFile={file}
          selectFile={onSelectFile}
          removeFile={removeFile}
          isFileAlwaysShown
          isFileLoading={isFileLoading}
          error={fileError}
          setFileError={setFileError}
          multiple
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
          value="Save changes"
          onClick={onSubmit}
          isLoading={isLoading}
        />
      </div>
    </div>
  );
};

export default EditResolution;
