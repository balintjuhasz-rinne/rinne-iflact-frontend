import React, { useRef } from 'react';
import PropTypes from 'prop-types';

import PageLoader from '../page-loader';
import { isEmptyObject } from '../../helpers/functions.helper';
import { IC_CAMERA, IC_TRASH_WHITE } from '../../constants/image.constants';
import { getInitials } from '../../helpers/account.helpers';

import s from './avatar-loader.module.scss';
import SizedImage from '../sized-image';

const AvatarLoader = ({
  title,
  selectedFile,
  selectFile,
  removeFile,
  name,
  surname,
  error,
  isLoading,
  setFileError,
}) => {
  const fileInputRef = useRef();
  const fileSelected = async (e) => {
    e.preventDefault();
    setFileError(null);
    const [fileCandidate] = fileInputRef.current.files;
    if (!fileCandidate) return;
    await selectFile(fileCandidate);
  };

  return (
    <div className={s.wrap}>
      {isLoading ? <PageLoader withoutText /> : (
        <>
          {!selectedFile || isEmptyObject(selectedFile) ? (
            <div className={s.initials}>
              {getInitials(name, surname)}
            </div>
          ) : <SizedImage className={s.photo} height={228} width={228} src={selectedFile.path} alt="" />}

          <div className={s.panel}>
            <button className={s.remove} onClick={removeFile}>
              <img src={IC_TRASH_WHITE} alt="remove-avatar" />
            </button>
            <label
              className={s.add}
              htmlFor={title}
              onDrop={fileSelected}
            >
              <img src={IC_CAMERA} alt="" />
              <input
                id={title}
                ref={fileInputRef}
                className={s.input}
                type="file"
                accept="image/x-png,image/gif,image/jpeg"
                onChange={fileSelected}
              />
            </label>
          </div>
        </>
      )}
      {error && <span className={s.error}>{error}</span> }
    </div>
  );
};

AvatarLoader.propTypes = {
  title: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  surname: PropTypes.string.isRequired,
  selectedFile: PropTypes.object,
  selectFile: PropTypes.func.isRequired,
  error: PropTypes.string,
  isLoading: PropTypes.bool.isRequired,
  setFileError: PropTypes.func,
  removeFile: PropTypes.func,
};

AvatarLoader.defaultProps = {
  selectedFile: () => {},
  error: '',
  setFileError: () => {},
  removeFile: () => {},
};

export default AvatarLoader;
