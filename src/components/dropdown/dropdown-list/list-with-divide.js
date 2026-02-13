import React, { useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import s from './dropdown-list.module.scss';

const DropdownListDivided = ({
  options, toggleOpen, active, triggerRef, setActive, localClassName, floated, isFluid, isAttached, searchValue,
}) => {
  const listRef = useRef(null);
  const handleClick = (e) => {
    if (listRef.current.contains(e.target) || triggerRef.current.contains(e.target)) {
      return;
    }
    toggleOpen(false);
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClick);
    return () => {
      document.removeEventListener('mousedown', handleClick);
    };
  }, []);

  const handleSelect = (obj) => {
    setActive(obj);
    toggleOpen(false);
  };

  const isOptionsEmpty = Object.keys(options).every((item) => options[item].length === 0);

  return (
    <div
      ref={listRef}
      className={cn(
        s.list,
        s.withDivide,
        s[localClassName],
        s[`floated-${floated}`],
        { [s.fluid]: isFluid },
        { [s.attached]: isAttached },
      )}
    >
      {isOptionsEmpty ? <span className={s.noResult}>No results for “{searchValue}”</span>
        : Object.keys(options).map((item) => (
          options[item].length ? (
            <React.Fragment key={item}>
              <span className={s.title}>{item}</span>
              {options[item].map(({ title, id, type }) => (
                <React.Fragment key={id || title}>
                  <button
                    tabIndex={id === active?.title ? -1 : 0}
                    type="button"
                    title={title}
                    className={cn(s.item, { [s.active]: id === active?.title || id === active?.id || searchValue === title })}
                    onClick={() => handleSelect({ id, title, type })}
                  >
                    {title}
                  </button>
                </React.Fragment>
              ))}
            </React.Fragment>
          ) : null
        ))}
    </div>
  );
};

DropdownListDivided.propTypes = {
  active: PropTypes.object,
  options: PropTypes.object.isRequired,
  setActive: PropTypes.func.isRequired,
  toggleOpen: PropTypes.func.isRequired,
  triggerRef: PropTypes.any.isRequired,
  localClassName: PropTypes.string,
  floated: PropTypes.string,
  isFluid: PropTypes.bool,
  isAttached: PropTypes.bool,
  searchValue: PropTypes.string,
};

DropdownListDivided.defaultProps = {
  localClassName: '',
  floated: 'right',
  isFluid: false,
  isAttached: true,
  active: null,
  searchValue: '',
};

export default DropdownListDivided;
