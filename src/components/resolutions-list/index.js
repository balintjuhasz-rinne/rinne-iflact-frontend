import React from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import cn from 'classnames';
import ResolutionBlock from '../resolution-block';
import Link from '../custom-link';
import { createDynamicPath } from '../../helpers/url.helpers';

import { RESOLUTION_PATH, RESOLUTION } from '../../constants/router.constants';

import s from './resolutions-list.module.scss';
import { getUserIdSelector, getUserRoleSelector } from '../../selectors/user.selectors';
import { isVoted } from '../../helpers/resolutions.helpers';

const ResolutionsList = ({ list, grid }) => {

  const userId = useSelector(getUserIdSelector);
  const { role } = useSelector(getUserRoleSelector);
  return (
    <div className={cn(s.root, s[`grid-${grid}`])}>
      {list.map(({
        resolution: {
          id, name, votingStartDate, votingEndDate, status, company, cosec, emergency,
        },
        voting: { cosignatories },
      }) => (
        <Link href={RESOLUTION_PATH} as={createDynamicPath(RESOLUTION, id)} className={s.resolution} key={id}>
          <ResolutionBlock
            id={id}
            name={name}
            status={status}
            startDate={votingStartDate}
            endDate={votingEndDate}
            members={cosignatories}
            company={company?.name}
            creator={cosec}
            emergency={emergency}
            isVoted={isVoted(cosignatories, userId, role)}
          />
        </Link>
      ))}
    </div>
  );
};

ResolutionsList.propTypes = {
  list: PropTypes.array,
  grid: PropTypes.oneOf([4, 3]),
};

ResolutionsList.defaultProps = {
  list: [],
  grid: 4,
};

export default ResolutionsList;
