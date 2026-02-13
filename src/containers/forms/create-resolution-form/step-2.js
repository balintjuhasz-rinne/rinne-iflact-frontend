import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import cn from 'classnames';

import Button from '../../../components/buttons/primary-button';
import Slider from '../../../components/inputs/slider-input';

import { normalizeError } from '../../../helpers/functions.helper';
import { RESOLUTION_TYPES } from '../../../constants/resolution.constants';
import { prepareNewResolution } from '../../../actions/resolutions.actions';
import { loadFile } from '../../../actions/global.actions';
import { getNewResolutionSelector } from '../../../selectors/resolutions.selectors';
import FileLoader from '../../../components/file-loader';
import { CLIENT_ERRORS } from '../../../constants/error.constants';

import s from './create-resolution-form.module.scss';

const CreateResolutionStep2 = () => {
  const dispatch = useDispatch();
  const { newResolution: data } = useSelector(getNewResolutionSelector);

  const [isFileLoading, setFileLoading] = useState(false);
  const [fileError, setFileError] = useState(null);
  const [loadedFile, setLoadedFile] = useState(data.file || []);

  const fieldChange = (field, value) => {
    dispatch(prepareNewResolution({ [field]: value }));
  };

  const removeFile = (id) => {
    const { file } = data;
    const newFiles = file.filter((item) => item.id !== id);
    const newIds = newFiles.map((item) => item.id);
    fieldChange('documentsIds', newIds);
    fieldChange('file', newFiles.length ? newFiles : null);
    setLoadedFile(newFiles);
  };

  const selectFile = async (fileCandidate) => {
    if (data?.file?.length >= 50 || fileCandidate.length + data?.file?.length > 50) {
      setFileError(CLIENT_ERRORS.INVALID_FILE_COUNT);
      return;
    }

    if (!fileCandidate || !fileCandidate.length) {
      fieldChange('file', null);
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
      const newLoadedFile = [...loadedFile];
      /* eslint-disable-next-line */
      for await (const item of fileCandidate) {
        const loadedItem = await loadFile(item, 'document');
        newLoadedFile.push(...loadedItem);
      }
      const loadFilesIds = newLoadedFile.map((item) => item.id);
      fieldChange('file', newLoadedFile);
      fieldChange('documentsIds', loadFilesIds);
      setLoadedFile(newLoadedFile);
    } catch (err) {
      setFileError(normalizeError(err?.response?.data?.errors || 'error'));
    } finally {
      setFileLoading(false);
    }
  };

  const onSubmit = () => {
    if (!data.file) {
      setFileError(CLIENT_ERRORS.REQUIRED);
      return;
    }
    fieldChange('step', 3);
  };

  useEffect(() => {
    if (data.approvalRatio) return;
    fieldChange('approvalRatio', RESOLUTION_TYPES[data.type].defaultMin);
  }, []);

  return (
    <div className={s.wrap}>
      <div className={s.row}>
        <Slider
          label="Required Approval Ratio, %"
          min={RESOLUTION_TYPES[data.type].defaultMin}
          defaultValue={data.approvalRatio || RESOLUTION_TYPES[data.type].defaultMin}
          onChange={(value) => fieldChange('approvalRatio', value)}
        />
      </div>
      <div className={cn(s.row, s.air)}>
        <FileLoader
          selectedFile={data.file || []}
          selectFile={selectFile}
          removeFile={removeFile}
          name="create-resolution"
          error={fileError}
          isLoading={isFileLoading}
          setFileError={setFileError}
          isFileAlwaysShown
          multiple
        />
      </div>
      <div className={s.panel}>
        <div className={s.stepHint}>2/3</div>
        <Button
          theme="white"
          value="Back"
          type="button"
          onClick={() => fieldChange('step', 1)}
        />
        <Button
          theme="gray"
          value={data.file ? 'Preview' : 'Continue'}
          onClick={onSubmit}
          type="submit"
        />
      </div>
    </div>
  );
};

export default CreateResolutionStep2;
