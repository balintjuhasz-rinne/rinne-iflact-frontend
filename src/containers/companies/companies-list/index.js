import React from 'react';
import PropTypes from 'prop-types';

import Link from '../../../components/custom-link';
import Avatars from '../../../components/avatars';

import { COMPANIES_PATH } from '../../../constants/router.constants';
import { IC_DEFAULT_COMPANY_LOGO } from '../../../constants/image.constants';
import { USER_STATUS, USER_ROLES } from '../../../constants/user.constants';

import s from './companies-list.module.scss';

const getPersons = (coSignatories) => (
  coSignatories.filter((user) => user.status === USER_STATUS.ACTIVE && user.role === USER_ROLES.CO_SIGNATORY)
);

const CompaniesList = ({ list }) => (
  <div className={s.wrap}>
    {list.map(({
      logo, name, address, industry, workplaces, id,
    }) => {
      const userList = workplaces.map((item) => item.user);
      const persons = getPersons(userList);
      return (
        <Link href={`${COMPANIES_PATH}${id}`} className={s.company} key={id}>
          <div className={s.col}>
            <img src={logo?.path || IC_DEFAULT_COMPANY_LOGO} alt={name} />
            <div className={s.info}>
              <span className={s.name}>{name}</span>
              <span className={s.address}>{address}</span>
            </div>
          </div>
          <div className={s.col}>
            <span className={s.industry}>{industry}</span>
            {!!persons?.length && <Avatars list={persons} />}
          </div>
        </Link>
      );
    })}
  </div>
);

CompaniesList.propTypes = {
  list: PropTypes.array.isRequired,
};

export default CompaniesList;
