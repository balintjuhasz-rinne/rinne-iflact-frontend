import React, { useState, useRef } from 'react';
import cn from 'classnames';
import PropTypes from 'prop-types';

import PreviewLoader from './preview-loader';

import { IC_FILE_UPLOAD } from '../../constants/image.constants';

import s from './file-loader.module.scss';

const FileLoader = ({
  label,
  selectedFile,
  isFileAlwaysShown,
  selectFile,
  removeFile,
  name,
  error,
  isLoading,
  setFileError,
  shouldShowDescription,
  multiple,
  className,
}) => {

  const [isOnDrag, setOnDrag] = useState(false);
  const fileInputRef = useRef();

  const fileSelected = async (e) => {
    e.preventDefault();
    setFileError(null);
    setOnDrag(false);
    let fileCandidate = null;
    if (e.type === 'drop') {
      const { files } = e.dataTransfer;
      fileCandidate = files;
    }
    if (e.type === 'change' && fileInputRef.current.files.length) {
      fileCandidate = fileInputRef.current.files;
    }

    if (!fileCandidate) return;

    await selectFile(fileCandidate);
  };

  return (
    <>
      {selectedFile?.sort((a, b) => a.id - b.id).map((item) => (
        <PreviewLoader
          key={item.id}
          size={item.size}
          title={item.originalName}
          removeFile={() => removeFile(item.id)}
        />
      ))}
      {
        (!selectedFile?.length || isFileAlwaysShown) && (
          <div className={cn(className, s.wrap)}>
            <div className={cn(s.container, { [s.drag]: isOnDrag })}>
              {isLoading ? <span className={s.loading}>File is loading...</span> : (
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
                  {shouldShowDescription && <div>This document will be viewable by the users </div>}
                  <input
                    id={name}
                    ref={fileInputRef}
                    className={s.input}
                    type="file"
                    accept=".doc, .docx, .pdf"
                    onChange={fileSelected}
                    multiple={multiple}
                  />
                </label>
              )}
            </div>
            {error && <span className={s.error}>{error}</span> }
          </div>
        )
      }
    </>
  );
};

FileLoader.propTypes = {
  selectedFile: PropTypes.array,
  label: PropTypes.string,
  selectFile: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired,
  error: PropTypes.string,
  isLoading: PropTypes.bool.isRequired,
  setFileError: PropTypes.func,
  removeFile: PropTypes.func.isRequired,
  isFileAlwaysShown: PropTypes.bool,
  className: PropTypes.string,
  shouldShowDescription: PropTypes.bool,
  multiple: PropTypes.bool,
};

FileLoader.defaultProps = {
  selectedFile: null,
  label: 'Choose a file',
  error: '',
  setFileError: null,
  isFileAlwaysShown: false,
  multiple: false,
  className: '',
  shouldShowDescription: true,
};

export default FileLoader;
