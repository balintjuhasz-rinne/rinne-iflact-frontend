import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import Input from '../../components/inputs/primary-input';
import { transformPositionsToString } from '../../helpers/account.helpers';
import s from './verify-data-panel.module.scss';

const Step1 = ({ user }) => {
  const isOnlyOneCompany = user.workplaces.length === 1;
  return (
    <>
      {isOnlyOneCompany
        && (
          <div className={s.inputsRow}>
            <Input
              label="Company name"
              value={user?.workplaces[0]?.company?.name || ''}
              wrapClassName={s.halfWidth}
              disabled
            />
            <Input
              label="Position"
              value={user.cosecPosition || transformPositionsToString(user.workplaces[0]?.positions || [])}
              wrapClassName={s.halfWidth}
              disabled
            />
          </div>
        )}
      <div className={s.inputsRow}>
        <Input
          label="Name"
          value={user?.name || ''}
          wrapClassName={cn(s.halfWidth, { [s.oneThirdWidth]: !isOnlyOneCompany })}
          disabled
        />
        <Input
          label="Surname"
          value={user?.surname || ''}
          wrapClassName={cn(s.halfWidth, { [s.oneThirdWidth]: !isOnlyOneCompany })}
          disabled
        />
        {!isOnlyOneCompany
          && (
            <Input
              label="ID"
              value={user?.personalId || ''}
              wrapClassName={s.oneThirdWidth}
              disabled
            />
          )}
      </div>
      <div className={s.inputsRow}>
        <Input
          label="Email"
          value={user?.email || ''}
          wrapClassName={s.halfWidth}
          disabled
        />
        <Input
          label="Phone number"
          value={user?.phoneNumber || ''}
          wrapClassName={s.halfWidth}
          disabled
        />
      </div>
    </>
  );
};

Step1.propTypes = {
  user: PropTypes.object.isRequired,
};

export default Step1;
