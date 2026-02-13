import React from 'react';
import PropTypes from 'prop-types';
import { format } from 'date-fns';

import Link from '../../../../components/custom-link';
import TableRow from '../../../../components/table/table-row';
import TableCell from '../../../../components/table/table-cell';
import { downloadHandler } from '../../../../helpers/functions.helper';
import StatusLabels from '../../../../components/status-labels';

import { RESOLUTION_TYPES, RESOLUTION_STATUSES } from '../../../../constants/resolution.constants';
import { RESOLUTION_PATH, RESOLUTION } from '../../../../constants/router.constants';
import { IC_PDF, IC_DOWNLOAD, IC_ALERT } from '../../../../constants/image.constants';
import { createDynamicPath } from '../../../../helpers/url.helpers';

import s from './table-list.module.scss';

const StatisticsTableList = ({ list }) => (
  <div className={s.cosignatoriesList}>
    {list.map(({
      documents,
      id,
      name,
      creationDate,
      votingStartDate,
      votingEndDate,
      status,
      resolveDate,
      emergency,
      type,
    }) => (
      <Link href={RESOLUTION_PATH} as={createDynamicPath(RESOLUTION, id)} className={s.rowLink} key={id}>
        <TableRow className={s.row}>
          <TableCell>{id}</TableCell>
          <TableCell className={s.cell}>
            <div className={s.icons}>
              <img src={IC_PDF} className={s.typeIcon} alt={document?.originalName} />
              {emergency && <img className={s.warn} src={IC_ALERT} alt="emergency" />}
            </div>
            <span>{name}</span>
          </TableCell>
          <TableCell>
            {format(new Date(creationDate), 'dd MMMM yyyy, hh:mm aaaa')}
          </TableCell>
          <TableCell>
            {format(new Date(votingStartDate), 'dd MMMM yyyy, hh:mm aaaa')}
          </TableCell>
          <TableCell>
            {format(new Date(votingEndDate), 'dd MMMM yyyy, hh:mm aaaa')}
          </TableCell>
          <TableCell>
            {RESOLUTION_STATUSES[status] === RESOLUTION_STATUSES.InProgress
              || RESOLUTION_STATUSES[status] === RESOLUTION_STATUSES.Upcoming
              ? RESOLUTION_STATUSES[status]
              : format(new Date(resolveDate), 'dd MMMM yyyy, hh:mm aaaa')}
          </TableCell>
          <TableCell>
            {RESOLUTION_TYPES[type].title}
          </TableCell>
          <TableCell>
            <StatusLabels label={status} />
          </TableCell>
          <TableCell className={s.cellLast} alignment="right">
            {documents?.map((item) => (
              <button
                className={s.download}
                onClick={(e) => {
                  e.preventDefault();
                  downloadHandler(item?.path, item?.originalName);
                }}
                key={item.id}
              >
                <img src={IC_DOWNLOAD} alt="download" />
              </button>
            ))}
          </TableCell>
        </TableRow>
      </Link>
    ))}
  </div>
);

StatisticsTableList.propTypes = {
  list: PropTypes.array.isRequired,
};

export default StatisticsTableList;
