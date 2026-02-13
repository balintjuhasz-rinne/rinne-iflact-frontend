import React, {
  useState, useRef, memo, useMemo,
} from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';

import DropdownList from './dropdown-list';
import DropdownIcon from '../icons/sort-icon';
import DropdownTriggerContent from './dropdown-trigger-content';

import s from './dropdown.module.scss';

const Dropdown = ({
  options, floated, localClassName,
  className, isFluid, placeholder,
  disabled, activeOption,
  setActive, label, error,
  isSearchable, onSearch,
  searchValue, isMultiple,
  manualOption, isAttached,
}) => {
  const triggerRef = useRef(null);
  const [open, toggleOpen] = useState(false);

  const handleTrigger = () => {
    toggleOpen(!open);
  };

  const onLabelClick = () => {
    triggerRef.current.focus();
  };

  const optionsToShow = useMemo(() => (isSearchable
    ? options.filter((option) => option?.title?.toLowerCase().includes(searchValue.toLowerCase()))
    : options),
  [options, searchValue]);

  const multipleOptionsToShow = useMemo(() => options.filter((item) => item.isActive), [options]);

  return (
    <div className={cn(
      s.dropdown,
      className,
      s[localClassName],
      {
        [s.open]: open,
        [s.fluid]: isFluid,
        [s.attached]: isAttached,
        [s.error]: error,
      },
    )}
    >
      {label && (
        <button
          className={s.label}
          tabIndex={-1}
          type="button"
          onClick={onLabelClick}
        >
          {label}
        </button>
      )}
      <div
        disabled={disabled}
        ref={triggerRef}
        role="button"
        onKeyDown={() => {}}
        className={cn(s.trigger,
          { [s.isSearchable]: isSearchable },
          { [s.placeholderShown]: !isMultiple && !activeOption?.title && placeholder },
          { [s.multiplePlaceholderShown]: isMultiple && multipleOptionsToShow.length < 1 })}
        onClick={(e) => handleTrigger(e)}
      >
        <DropdownTriggerContent
          isSearchable={isSearchable}
          searchValue={searchValue}
          onSearch={onSearch}
          placeholder={placeholder}
          isMultiple={isMultiple}
          multipleOptions={multipleOptionsToShow}
          activeOption={activeOption}
          manualOption={manualOption}
        />
        {!disabled && <DropdownIcon active={open} />}
      </div>
      {open && (
        <DropdownList
          floated={floated}
          isFluid={isFluid}
          isAttached={isAttached}
          localClassName={localClassName}
          active={activeOption}
          triggerRef={triggerRef}
          options={optionsToShow}
          toggleOpen={toggleOpen}
          setActive={setActive}
          searchValue={searchValue}
          isMultiple={isMultiple}
        />
      )}
      {error && <span className={s.errorHint}>{error}</span>}
    </div>
  );
};

Dropdown.propTypes = {
  error: PropTypes.string,
  disabled: PropTypes.bool,
  isFluid: PropTypes.bool,
  isAttached: PropTypes.bool,
  manualOption: PropTypes.node,
  options: PropTypes.array.isRequired,
  setActive: PropTypes.func,
  className: PropTypes.string,
  localClassName: PropTypes.string,
  placeholder: PropTypes.string,
  floated: PropTypes.oneOf(['right', 'left']),
  activeOption: PropTypes
    .oneOfType([PropTypes.array, PropTypes.object]),
  label: PropTypes.string,
  isSearchable: PropTypes.bool,
  onSearch: PropTypes.func,
  searchValue: PropTypes.string,
  isMultiple: PropTypes.bool,
};

Dropdown.defaultProps = {
  activeOption: {},
  error: '',
  placeholder: '',
  disabled: false,
  className: '',
  localClassName: '',
  floated: 'right',
  isFluid: false,
  isAttached: true,
  manualOption: null,
  setActive: () => {},
  label: '',
  isSearchable: false,
  isMultiple: false,
  onSearch: () => {},
  searchValue: '',
};
export default memo(Dropdown);
