import React, { useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';

import Checkbox from '../../inputs/checkbox';

import s from './dropdown-list.module.scss';

const DropdownList = ({
  options, toggleOpen, active, triggerRef, setActive, localClassName, floated, isFluid, isAttached, isMultiple, searchValue,
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

  const handleSelect = (id) => {
    setActive(id);
    toggleOpen(false);
  };

  const handleMultipleSelect = (id) => setActive(id);

  return (
    <div
      ref={listRef}
      className={cn(
        s.list,
        s[localClassName],
        s[`floated-${floated}`],
        { [s.fluid]: isFluid },
        { [s.attached]: isAttached },
      )}
    >
      {options.map(({ title, id, isActive }) => (
        <React.Fragment key={id || title}>
          {isMultiple
            ? (
              <Checkbox
                label={title}
                type="gray"
                id={id || 'all'}
                checked={isActive}
                onChange={() => handleMultipleSelect(id)}
                className={s.checkbox}
              />
            )
            : (
              <button
                tabIndex={id === active?.title ? -1 : 0}
                type="button"
                className={cn(s.item, { [s.active]: id === active?.title || id === active?.id || searchValue === title })}
                onClick={() => handleSelect(id || title)}
              >
                {title}
              </button>
            )}
        </React.Fragment>
      ))}
    </div>
  );
};

DropdownList.propTypes = {
  active: PropTypes.object,
  options: PropTypes.array.isRequired,
  setActive: PropTypes.func.isRequired,
  toggleOpen: PropTypes.func.isRequired,
  triggerRef: PropTypes.any.isRequired,
  localClassName: PropTypes.string,
  floated: PropTypes.string,
  isFluid: PropTypes.bool,
  isAttached: PropTypes.bool,
  searchValue: PropTypes.string,
  isMultiple: PropTypes.bool,
};
DropdownList.defaultProps = {
  localClassName: '',
  floated: 'right',
  isFluid: false,
  isAttached: true,
  active: null,
  searchValue: '',
  isMultiple: false,
};
export default DropdownList;
