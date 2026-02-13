import React, {
  useState, useRef, memo,
} from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';

import DropdownList from './dropdown-list/list-with-divide';
import DropdownTriggerContent from './dropdown-trigger-content';
import { IC_SEARCH, IC_CLOSE } from '../../constants/image.constants';

import s from './dropdown.module.scss';

const DropdownWithDivide = ({
  options, floated, localClassName,
  className, isFluid, placeholder,
  disabled, activeOption,
  isAttached, isSearchable, onSearch, searchValue,
  setActive, label, error, manualOption,
}) => {
  const triggerRef = useRef(null);
  const [open, toggleOpen] = useState(false);

  const handleTrigger = () => {
    toggleOpen(!open);
  };

  const onLabelClick = () => {
    triggerRef.current.focus();
  };

  const optionsToShow = {};
  Object.keys(options).forEach((item) => {
    optionsToShow[item] = options[item].filter((el) => el.title.toLowerCase().includes(searchValue.toLowerCase()));
  });

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
          { [s.placeholderShown]: !activeOption?.title && placeholder })}
        onClick={(e) => handleTrigger(e)}
      >
        <DropdownTriggerContent
          isSearchable={isSearchable}
          searchValue={searchValue}
          onSearch={onSearch}
          placeholder={placeholder}
          activeOption={activeOption}
          manualOption={manualOption}
        />
        {searchValue
          ? (
            <button
              className={s.delete}
              onClick={() => setActive({})}
            >
              <img src={IC_CLOSE} alt="close" />
            </button>
          )
          : <img src={IC_SEARCH} alt="search" />}
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
        />
      )}
      {error && <span className={s.errorHint}>{error}</span>}
    </div>
  );
};

DropdownWithDivide.propTypes = {
  error: PropTypes.string,
  disabled: PropTypes.bool,
  isFluid: PropTypes.bool,
  isAttached: PropTypes.bool,
  manualOption: PropTypes.node,
  options: PropTypes.object.isRequired,
  setActive: PropTypes.func,
  className: PropTypes.string,
  localClassName: PropTypes.string,
  placeholder: PropTypes.string,
  floated: PropTypes.oneOf(['right', 'left']),
  activeOption: PropTypes.object,
  label: PropTypes.string,
  isSearchable: PropTypes.bool,
  onSearch: PropTypes.func,
  searchValue: PropTypes.string,
};

DropdownWithDivide.defaultProps = {
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
  onSearch: () => {},
  searchValue: '',
};
export default memo(DropdownWithDivide);
