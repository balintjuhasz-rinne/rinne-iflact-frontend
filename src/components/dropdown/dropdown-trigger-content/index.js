import React from 'react';
import PropTypes from 'prop-types';

import s from './dropdown-trigger-content.module.scss';

const DropdownTriggerContent = ({
  isSearchable,
  searchValue,
  placeholder,
  onSearch,
  isMultiple,
  multipleOptions,
  activeOption,
  manualOption,
}) => {
  if (isSearchable) {
    return (
      <input
        value={searchValue}
        placeholder={placeholder}
        className={s.search}
        onChange={(e) => onSearch(e)}
      />
    );
  }

  if (isMultiple) {
    const optionAll = multipleOptions.find(({ id }) => id === '');
    return (
      <span className={s.text}>
        {multipleOptions.length > 0
          ? optionAll
            ? optionAll.title
            : multipleOptions.map((option) => option.title).join(', ')
          : placeholder}
      </span>
    );
  }
  return (
    <span className={s.text}>
      {manualOption || activeOption?.title || placeholder}
    </span>
  );
};

DropdownTriggerContent.propTypes = {
  isSearchable: PropTypes.bool.isRequired,
  searchValue: PropTypes.string.isRequired,
  placeholder: PropTypes.string.isRequired,
  onSearch: PropTypes.func.isRequired,
  manualOption: PropTypes.node,
  isMultiple: PropTypes.bool,
  multipleOptions: PropTypes.array,
  activeOption: PropTypes
    .oneOfType([PropTypes.array, PropTypes.object])
    .isRequired,
};

DropdownTriggerContent.defaultProps = {
  manualOption: null,
  isMultiple: false,
  multipleOptions: [],
};

export default DropdownTriggerContent;
