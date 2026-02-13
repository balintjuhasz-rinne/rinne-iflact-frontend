import React from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { format } from 'date-fns';
import cn from 'classnames';

import Avatar from '../avatar-icon';
import Link from '../custom-link';
import InactiveUserTab from '../user-inactive';

import { USER_STATUS, USER_ROLES } from '../../constants/user.constants';
import { ACTIVITY_ACTIONS } from '../../constants/companies.constants';
import {
  RESOLUTION_PATH, RESOLUTION, COSIGNATORY_PROFILE_PATH, COSIGNATORY_PROFILE,
} from '../../constants/router.constants';
import { IC_FLACT_SYSTEM } from '../../constants/image.constants';
import { createDynamicPath } from '../../helpers/url.helpers';
import { getUserSelector } from '../../selectors/user.selectors';

import s from './latest-activity.module.scss';

const LatestActivity = ({ list, className, hide }) => {
  const { user: { role } } = useSelector(getUserSelector);

  return (
    <div className={cn(className, s.wrap)}>
      <div className={s.header}>
        <h4 className={s.title}>Latest Activity</h4>
        {hide}
      </div>
      <div className={s.list}>
        {list.length > 0 ? list.map(({
          id, resolutionId, createdAt, user, action,
        }) => (
          <div key={id} className={s.item}>
            <div className={s.head}>
              <span className={s.date}>{format(new Date(createdAt), 'dd.MM.yy hh:mm aaaa')} in</span>
              <Link className={s.resolution} href={RESOLUTION_PATH} as={createDynamicPath(RESOLUTION, resolutionId)}>
                Resolution ID {resolutionId}
              </Link>
            </div>
            <div className={s.user}>
              { role === USER_ROLES.CO_SEC && user?.role === USER_ROLES.CO_SIGNATORY ? (
                <Link className={s.name} href={COSIGNATORY_PROFILE_PATH} as={createDynamicPath(COSIGNATORY_PROFILE, user.id)}>
                  <Avatar name={user.name} surname={user.surname} avatar={user?.avatar?.path} className={s.avatar} />
                </Link>
              ) : user ? <Avatar name={user.name} surname={user.surname} avatar={user?.avatar?.path} className={s.avatar} />
                : <Avatar name="Flact" surname="System" avatar={IC_FLACT_SYSTEM} className={s.avatar} />}
              <div>
                <span className={s.name}>
                  {user ? `${user.name} ${user.surname ?? ''}` : 'Flact System'}
                </span>
                {user?.status === USER_STATUS.INACTIVE && <InactiveUserTab text="Inactive" /> }
              </div>
              <span className={s.action}>{ACTIVITY_ACTIONS[action]}</span>
            </div>
          </div>
        )) : <span className={s.emptyListMessage}>No activities yet</span>}
      </div>
    </div>
  );
};

LatestActivity.propTypes = {
  className: PropTypes.string,
  hide: PropTypes.element,
  list: PropTypes.array.isRequired,
};

LatestActivity.defaultProps = {
  className: '',
  hide: null,
};

export default React.memo(LatestActivity);
