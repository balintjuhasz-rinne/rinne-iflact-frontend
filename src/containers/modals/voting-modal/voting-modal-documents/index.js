import React from 'react';
import cn from 'classnames';
import PropTypes from 'prop-types';
import s from './voting-modal-documents.module.scss';

const VotingModalDocuments = ({ list, path, setPath }) => (
  <div className={s.wrap} data-modal-hide="false">
    <h5 className={s.title}>Documents of the Contract</h5>
    <ul className={s.list}>
      {list.sort((a, b) => a.id - b.id).map(({ originalName, size, path: documentPath }) => (
        <li
          aria-hidden="true"
          key={size + originalName}
          onKeyDown={() => {}}
          onClick={() => setPath(documentPath)}
          className={cn(s.item, { [s.active]: path === documentPath })}
        >
          {originalName}
          <span className={s.size}>{size}</span>
        </li>
      ))}
    </ul>
  </div>
);

VotingModalDocuments.propTypes = {
  list: PropTypes.array.isRequired,
  path: PropTypes.string.isRequired,
  setPath: PropTypes.func.isRequired,
};

export default VotingModalDocuments;
