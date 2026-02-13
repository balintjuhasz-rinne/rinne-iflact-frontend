import React, { useState, useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import formatDistanceToNow from 'date-fns/formatDistanceToNow';
import { IC_CLOSE, IC_DOTS } from '../../../../constants/image.constants';
import s from './voting-modal-comments.module.scss';
import Textarea from '../../../../components/inputs/textarea';
import { createOrEditResolutionComment, deleteResolutionComment } from '../../../../actions/resolution.actions';
import Button from '../../../../components/buttons/primary-button';
import { setResolutionActivities } from '../../../../actions/activities.actions';

const VotingModalComments = ({
  isOpenPostField,
  setOpenPostField,
  setOpenCommentsSidebar,
  comments,
  resolutionId,
  userId,
}) => {
  const dispatch = useDispatch();
  const [isDropdownShow, setIsDropdownShow] = useState(false);
  const dropdownRef = useRef(null);

  const {
    register, handleSubmit, errors, reset, setValue,
  } = useForm({
    mode: 'onSubmit',
    reValidateMode: 'onChange',
  });

  const onSubmit = async (data) => {
    await dispatch(createOrEditResolutionComment(resolutionId, data.text));
    await dispatch(setResolutionActivities(resolutionId));
    reset();
    setOpenPostField(false);
  };

  const editComment = async (text) => {
    await setOpenPostField(true);
    setIsDropdownShow(false);
    setValue('text', text);
  };

  const deleteComment = async () => {
    setIsDropdownShow(false);
    await dispatch(deleteResolutionComment(resolutionId));
    await dispatch(setResolutionActivities(resolutionId));
  };

  const onCancel = () => {
    if (!comments?.length) {
      setOpenPostField(false);
      setOpenCommentsSidebar(false);
    } else {
      setOpenPostField(false);
    }
  };

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setIsDropdownShow(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [dropdownRef]);

  return (
    <div className={s.wrap} data-modal-hide="false">
      <div className={s.header}>
        <h5 className={s.title}>Comments</h5>
        {!comments?.length
          && (
            <button className={s.close} onClick={() => setOpenCommentsSidebar(false)}>
              <img src={IC_CLOSE} alt="close" />
            </button>
          )}
      </div>
      {isOpenPostField
        && (
          <form className={s.form} onSubmit={handleSubmit(onSubmit)}>
            <Textarea
              placeholder="Add comment..."
              name="text"
              size="md"
              maxLength="300"
              ref={
                register({
                  required: 'Comment required',
                  maxLength: {
                    value: 300,
                    message: 'Max length 300 symbols',
                  },
                })
              }
              error={errors.text?.message}
            />
            <div className={s.controls}>
              <Button
                theme="white"
                value="Cancel"
                type="button"
                className={s.btn}
                onClick={() => onCancel()}
              />
              <Button
                theme="gray"
                value="Post"
                type="submit"
              />
            </div>
          </form>
        )}
      <div className={s.comments}>
        {comments?.map(({ author, text, createdAt }) => (
          <div key={author.id} className={s.comment}>
            <div className={s.head}>
              <span className={s.time}>{formatDistanceToNow(new Date(createdAt))} ago</span>
              <span className={s.name}>{userId === author.id ? 'You' : `${author.name } ${ author.surname ?? ''}`}</span>
            </div>
            <div className={s.middle}>
              <p className={s.text}>{text}</p>
              {userId === author.id
                && (
                  <div className={s.actions}>
                    <button
                      className={s.dots}
                      onClick={() => setIsDropdownShow(!isDropdownShow)}
                    >
                      <img src={IC_DOTS} alt="dots" />
                    </button>
                    {isDropdownShow
                    && (
                      <div
                        ref={dropdownRef}
                        className={s.dropdown}
                      >
                        <button
                          className={s.button}
                          onClick={() => editComment(text)}
                        >
                          Edit
                        </button>
                        <button
                          className={s.button}
                          onClick={() => deleteComment()}
                        >
                          Delete comment
                        </button>
                      </div>
                    )}
                  </div>
                )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

VotingModalComments.propTypes = {
  comments: PropTypes.array.isRequired,
  isOpenPostField: PropTypes.bool.isRequired,
  setOpenPostField: PropTypes.func.isRequired,
  setOpenCommentsSidebar: PropTypes.func.isRequired,
  resolutionId: PropTypes.number.isRequired,
  userId: PropTypes.number.isRequired,
};

export default VotingModalComments;
