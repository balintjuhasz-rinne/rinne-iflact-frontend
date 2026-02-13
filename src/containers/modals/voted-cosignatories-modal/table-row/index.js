import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import { formatDistanceToNow, format } from 'date-fns';
import ShowMoreText from 'react-show-more-text';
import AvatarIcon from '../../../../components/avatar-icon';
import { IC_SUCCESS_TRANSPARENT } from '../../../../constants/image.constants';
import s from './table-row.module.scss';

const TableRow = ({
  name, surname, image, email, vetoPower, comment, voteDate,
}) => (
  <div className={s.wrapper}>
    <div className={s.cell}>
      <div className={s.privacy}>
        <AvatarIcon name={name} surname={surname} avatar={image} size="lg" />
        {vetoPower && <img className={s.veto} src={IC_SUCCESS_TRANSPARENT} alt="hasVetoPower" />}
        <span className={s.initials}>{`${name} ${surname ?? ''}`}</span>
      </div>
    </div>
    <div className={s.cell}>
      <span className={s.email}>
        {email}
      </span>
    </div>
    <div className={cn(s.cell, s.comment)}>
      {comment
      && (
        <>
          <span className={s.time}>{formatDistanceToNow(new Date(comment.createdAt))} ago</span>
          <ShowMoreText
            lines={3}
            more="Show more"
            less="Show less"
            className="comment-text"
            anchorClass="anchor"
            expanded={false}
          >
            {comment.text}
          </ShowMoreText>
        </>
      )}
    </div>
    { voteDate
    && (
      <div className={s.cell}>
        <span className={s.voteDate}>
          {format(new Date(voteDate), 'dd MMM yyyy, hh:mm aaaa')}
        </span>
      </div>
    )}
  </div>
);

TableRow.propTypes = {
  name: PropTypes.string,
  surname: PropTypes.string,
  image: PropTypes.string,
  email: PropTypes.string,
  comment: PropTypes.object,
  vetoPower: PropTypes.bool,
  voteDate: PropTypes.string,
};

TableRow.defaultProps = {
  name: '',
  surname: '',
  image: '',
  email: '',
  comment: null,
  vetoPower: false,
  voteDate: '',
};

export default TableRow;
