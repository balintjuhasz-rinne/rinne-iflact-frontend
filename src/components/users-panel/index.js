import cn from 'classnames';
import PropTypes from 'prop-types';
import React from 'react';
import { COSIGNATORY_PROFILE, COSIGNATORY_PROFILE_PATH } from '../../constants/router.constants';
import { USER_POSITIONS } from '../../constants/user.constants';
import { createDynamicPath } from '../../helpers/url.helpers';
import { transformPositionsToString } from '../../helpers/account.helpers';
import Link from '../custom-link';
import Item from './item';
import s from './users.module.scss';

const UsersPanel = ({
  title, className, list, onInvite, shouldShowInvite, shouldShowPending, isDirectorsResolution, withLink,
}) => (
  <div className={cn(className, s.wrap)}>
    <div className={s.head}>
      <h3 className={s.title}>{title}</h3>
      {shouldShowInvite && <button className={s.invite} onClick={onInvite}>+ Invite</button>}
    </div>
    {list?.length > 0 ? (
      <div className={s.list}>
        {list.map(({
          id, name, surname, avatar, status, workplaces, votingValue, position, registrationCompleted,
        }) => (withLink && (registrationCompleted || !shouldShowPending) ? (
          <Link
            href={COSIGNATORY_PROFILE_PATH}
            as={createDynamicPath(COSIGNATORY_PROFILE, id)}
            className={s.item}
            key={id}
          >
            <Item
              key={id}
              name={name}
              surname={surname}
              avatar={avatar}
              status={status}
              position={position ? USER_POSITIONS[position] : transformPositionsToString(workplaces?.[0]?.positions)}
              votingValue={votingValue || workplaces?.[0]?.votingValue}
              shouldShowPending={shouldShowPending}
              isDirectorsResolution={isDirectorsResolution}
              registrationCompleted={registrationCompleted}
            />
          </Link>
        ) : (
          <Item
            key={id}
            name={name}
            surname={surname}
            avatar={avatar}
            status={status}
            position={position ? USER_POSITIONS[position] : transformPositionsToString(workplaces?.[0]?.positions)}
            votingValue={votingValue || workplaces?.[0]?.votingValue}
            shouldShowPending={shouldShowPending}
            isDirectorsResolution={isDirectorsResolution}
            registrationCompleted={registrationCompleted}
          />
        )))}
      </div>
    ) : <div className={s.list}>Empty list</div>}
  </div>
);

UsersPanel.propTypes = {
  title: PropTypes.string.isRequired,
  className: PropTypes.string,
  list: PropTypes.array,
  onInvite: PropTypes.func,
  shouldShowInvite: PropTypes.bool,
  shouldShowPending: PropTypes.bool,
  withLink: PropTypes.bool,
  isDirectorsResolution: PropTypes.bool,
};

UsersPanel.defaultProps = {
  className: '',
  onInvite: () => {},
  shouldShowPending: true,
  shouldShowInvite: true,
  withLink: false,
  list: [],
  isDirectorsResolution: false,
};

export default UsersPanel;
