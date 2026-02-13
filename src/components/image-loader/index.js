import React, { useState, useRef } from 'react';
import cn from 'classnames';
import PropTypes from 'prop-types';

import PreviewLoader from './preview-loader';

import { isValidFileSize } from '../../helpers/functions.helper';
import { IC_FILE_UPLOAD } from '../../constants/image.constants';
import { CLIENT_ERRORS } from '../../constants/error.constants';

import s from './image-loader.module.scss';

const ImageLoader = ({
  label,
  selectedFile,
  selectFile,
  name,
  error,
  isLoading,
  setFileError,
  sizeLimit,
}) => {
  const [isOnDrag, setOnDrag] = useState(false);
  const fileInputRef = useRef();
  const fileSelected = async (e) => {
    e.preventDefault();
    setFileError(null);
    setOnDrag(false);
    let image = null;
    if (e.type === 'drop') {
      const { files } = e.dataTransfer;
      [image] = files;
    }
    if (e.type === 'change' && fileInputRef.current.files.length) {
      [image] = fileInputRef.current.files;
    }
    if (!image) return;
    if (!isValidFileSize(image.size, 2)) {
      setFileError(CLIENT_ERRORS.INVALID_FILE_SIZE);
      return;
    }
    await selectFile(image);
  };

  const removeFile = async () => {
    await selectFile();
  };

  return (selectedFile
    ? <PreviewLoader path={selectedFile.path} removeFile={removeFile} />
    : (
      <div className={s.wrap}>
        <div className={cn(s.container, { [s.drag]: isOnDrag })}>
          {isLoading ? <span className={s.loading}>Loading...</span> : (
            <label
              className={s.message}
              htmlFor={name}
              onDragOver={(e) => { setOnDrag(true); e.preventDefault(); }}
              onDragLeave={() => setOnDrag(false)}
              onDrop={fileSelected}
            >
              <img className={s.icon} src={IC_FILE_UPLOAD} alt="file" />
              <div>
                <span className={s.bold}>{label}&nbsp;</span>
                <span>or drag it here.</span>
              </div>
              {sizeLimit && <div>Up to {sizeLimit} MB</div>}
              <input
                id={name}
                ref={fileInputRef}
                className={s.input}
                type="file"
                accept="image/x-png,image/gif,image/jpeg"
                onChange={fileSelected}
              />
            </label>
          )}

        </div>
        {error && <span className={s.error}>{error}</span> }
      </div>
    ));
};

ImageLoader.propTypes = {
  selectedFile: PropTypes.object,
  label: PropTypes.string,
  selectFile: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired,
  error: PropTypes.string,
  isLoading: PropTypes.bool.isRequired,
  setFileError: PropTypes.func,
  sizeLimit: PropTypes.number,
};

ImageLoader.defaultProps = {
  selectedFile: null,
  label: 'Click to upload photo',
  error: '',
  setFileError: null,
  sizeLimit: null,
};

export default ImageLoader;
