import React from 'react';
import PropTypes from 'prop-types';
import { transformPositionsToString } from '../../helpers/account.helpers';
import s from './verify-data-panel.module.scss';

const Step2 = ({ workplaces }) => (
  <>
    <span className={s.note}>Companies to which you are invited</span>
    <div className={s.list}>
      {workplaces.map((item, index) => (
        <div className={s.row}>
          <span className={s.name}>
            <span>
              {index + 1}.
            </span>
            {item.company.name}
          </span>
          <span className={s.positions}>{transformPositionsToString(item.positions || [])}</span>
        </div>
      ))}
    </div>
  </>
);

Step2.propTypes = {
  workplaces: PropTypes.array.isRequired,
};

export default Step2;
