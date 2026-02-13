import React, { useEffect, useRef, useState } from 'react';
import ScrollLock, { TouchScrollable } from 'react-scrolllock';
import PropTypes from 'prop-types';
import FocusLock from 'react-focus-lock';
import cn from 'classnames';

import { IC_CLOSE } from '../../constants/image.constants';
import { KEY_CODE } from '../../constants/global.constants';

import s from './modal.module.scss';

const Modal = ({
  className, overlayClassName, children, closeModal, shouldShowClose, title, isPrimary,
}) => {
  const content = useRef(null);
  const [target, setTarget] = useState(null);

  const handleEscapeClose = (e) => {
    if (e.keyCode === KEY_CODE.ESC) {
      closeModal();
    }
  };

  const handleOutsideClose = (e) => {
    const shouldNotHide = !!(e.target.closest("[data-modal-hide='false']") || e.target.dataset.modalHide === false);
    if ((content?.current?.contains(target) || content?.current?.contains(e.target) || shouldNotHide)) {
      setTarget(null);
      return;
    }
    setTarget(null);
    closeModal();
  };

  useEffect(() => {
    document.addEventListener('keydown', handleEscapeClose);
    return () => document.removeEventListener('keydown', handleEscapeClose);
  }, []);

  return (
    <TouchScrollable>
      <FocusLock autoFocus={false}>
        <ScrollLock accountForScrollbars={false}>
          <div
            id="overlay"
            tabIndex={-1}
            role="presentation"
            onClick={(e) => handleOutsideClose(e)}
            onMouseDown={(e) => setTarget(e.target)}
            className={cn(overlayClassName, s.overlay, { [s.isPrimary]: isPrimary })}
          >
            {isPrimary ? (
              <div className={cn(className, s.wrap)} ref={content}>
                {title && <h5 className={s.title}>{title}</h5>}
                {shouldShowClose && (
                  <button onClick={closeModal} className={s.closeButton}>
                    <img src={IC_CLOSE} alt="close" />
                  </button>
                )}
                {children}
              </div>
            ) : children}
          </div>
        </ScrollLock>
      </FocusLock>
    </TouchScrollable>
  );
};

Modal.propTypes = {
  children: PropTypes.node.isRequired,
  closeModal: PropTypes.func.isRequired,
  title: PropTypes.string,
  className: PropTypes.string,
  isPrimary: PropTypes.bool,
  overlayClassName: PropTypes.string,
  shouldShowClose: PropTypes.bool,
};

Modal.defaultProps = {
  title: '',
  className: '',
  isPrimary: true,
  overlayClassName: '',
  shouldShowClose: true,
};

export default Modal;
