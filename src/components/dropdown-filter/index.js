import React, { useState, useRef, memo } from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import DropdownList from '../dropdown/dropdown-list';
import DropdownIcon from '../icons/sort-icon';
import s from './dropdown.module.scss';

const Dropdown = ({
  options, floated, className, disabled, activeOption, setActive, label,
}) => {
  const triggerRef = useRef(null);
  const [open, toggleOpen] = useState(false);
  const handleTrigger = () => { toggleOpen(!open); };

  return (
    <div className={cn(
      s.dropdown,
      className,
      { [s.open]: open },
    )}
    >
      {label && <span className={s.label}>{label}</span>}
      <button
        disabled={disabled}
        ref={triggerRef}
        className={s.trigger}
        onClick={(e) => handleTrigger(e)}
      >
        <span className={s.text}>{activeOption.title}</span>
        <DropdownIcon active={open} />
      </button>
      {open && (
        <DropdownList
          isAttached={false}
          floated={floated}
          active={activeOption}
          triggerRef={triggerRef}
          options={options}
          toggleOpen={toggleOpen}
          setActive={setActive}
        />
      )}
    </div>
  );
};

Dropdown.propTypes = {
  disabled: PropTypes.bool,
  options: PropTypes.array.isRequired,
  setActive: PropTypes.func,
  className: PropTypes.string,
  floated: PropTypes.oneOf(['right', 'left']),
  activeOption: PropTypes.object.isRequired,
  label: PropTypes.string,
};

Dropdown.defaultProps = {
  disabled: false,
  className: '',
  floated: 'right',
  setActive: () => {},
  label: '',
};
export default memo(Dropdown);
