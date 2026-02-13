import React from 'react';
import PropTypes from 'prop-types';
// import Switcher from '../../../components/switcher';
import SortBtn from '../../../components/sort-btn';
import s from './panel.module.scss';

const CompaniesPanel = ({
  isSortAZ, setSort,
}) => {
  const toggleSort = () => setSort(!isSortAZ);
  return (
    <div className={s.panel}>
      <SortBtn active={isSortAZ} onClick={() => toggleSort()}>
        <span className={s.hint}>Sort by</span>
        Name
      </SortBtn>
    </div>
  );
};

CompaniesPanel.propTypes = {
  isSortAZ: PropTypes.bool.isRequired,
  setSort: PropTypes.func.isRequired,
};

export default CompaniesPanel;
