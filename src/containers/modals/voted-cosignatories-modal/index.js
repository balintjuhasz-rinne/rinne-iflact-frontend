import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';

import Modal from '../../../components/modal';
import TableHead from './table-head';
import TableRow from './table-row';

import s from './voted-cosignatories-modal.module.scss';

const VotedCosignatoriesModal = ({
  closeModal, cosignatories, percentage, threshold, title, comments, showVetoPower,
}) => (
  <Modal title={title || 'Users Who Approved'} closeModal={closeModal} className={s.voiting}>
    <TableHead isNotVoted={!title} />
    <div className={s.list}>
      {cosignatories.map(({
        name, surname, email, avatar, vetoPower, id, voteDate,
      }) => {
        const authorComment = comments.filter(({ author }) => author.id === id);
        return (
          <TableRow
            name={name}
            surname={surname}
            email={email}
            image={avatar?.path}
            key={`${name}${surname}`}
            vetoPower={showVetoPower && vetoPower}
            comment={authorComment[0]}
            voteDate={voteDate}
          />
        );
      })}
    </div>
    <div className={s.bottomLine}>
      <span className={s.text}>Total:</span>
      <span className={cn(s.result, { [s.succeed]: percentage >= threshold })}>{percentage}%</span>
    </div>
  </Modal>
);

VotedCosignatoriesModal.propTypes = {
  closeModal: PropTypes.func.isRequired,
  cosignatories: PropTypes.array,
  percentage: PropTypes.string,
  threshold: PropTypes.number,
  title: PropTypes.string,
  comments: PropTypes.array,
  showVetoPower: PropTypes.bool,
};

VotedCosignatoriesModal.defaultProps = {
  cosignatories: [],
  comments: [],
  percentage: 0,
  threshold: 0,
  title: '',
  showVetoPower: false,
};

export default VotedCosignatoriesModal;
