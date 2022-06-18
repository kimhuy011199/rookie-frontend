import React, { useContext, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import style from './style.module.css';
import Button from '../Button';
import { useDialog } from '../Dialog/Provider';
import PreviewDialog from '../Dialog/dialogs/preview-dialog';
import FormGroup from '../FormGroup';
import TextArea from '../TextArea';
import { COMMENT_TYPE, NOTI_TYPE } from '../../constants/enums';
import {
  createAnswer,
  updateAnswer,
  reset,
} from '../../../stores/answers/answerSlice';
import { SocketContext } from '../../context/socket';
import Avatar from '../Avatar';
import { NOTI_ACTIONS } from '../../constants/constants';
import { createNotification } from '../../../stores/notifications/notificationSlice';
import NeedLogin from './NeedLogin';
import { answerType } from '../../../stores/answers/answerType';

export interface InputInterface {
  content: string;
}

interface CommentInputInterface {
  type: number;
  data?: any;
  avatarImg?: string;
  questionId?: string;
  defaultValue?: string;
  onClose?: (event?: any) => void;
}

const CommentInput = (props: CommentInputInterface) => {
  const { data, questionId, defaultValue, onClose } = props;
  const { t } = useTranslation();
  const { appendDialog } = useDialog();
  const dispatch = useDispatch();
  const socket = useContext(SocketContext);

  const {
    register,
    getValues,
    handleSubmit,
    reset: resetForm,
    setValue,
  } = useForm<InputInterface>();

  const { isLoading, isSuccess, isError } = useSelector(
    (state: any) => state.answers
  );
  const { question } = useSelector((state: any) => state.questions);
  const { user } = useSelector((state: any) => state.auth);

  const previewQuestion = () => {
    const content = getValues('content');
    appendDialog(
      <PreviewDialog content={content} type={COMMENT_TYPE.COMMENT} />
    );
  };

  const handleSubmitForm = (inputData: InputInterface) => {
    if (questionId) {
      // !defaultValue => create new answer
      if (!defaultValue) {
        const submitData = {
          content: inputData.content,
          questionId,
        };
        dispatch(createAnswer(submitData));
        const type = NOTI_TYPE.ANSWER_QUESTION;
        const { userId } = question;
        const actionId = user._id;
        dispatch(
          createNotification({
            userId,
            actionId,
            questionId,
            type,
          })
        );
        socket.emit(NOTI_ACTIONS.SEND_NOTI, {
          userId,
          action: { ...user, actionId },
          question: { ...question, questionId },
          type,
        });
        resetForm();
      } else {
        const newContent = getValues('content').trim();
        if (newContent === defaultValue || newContent === '') {
          onClose && onClose();
          return;
        }
        const submitData = {
          id: data._id,
          updatedData: { content: newContent },
        };
        dispatch(updateAnswer(submitData));
        setValue('content', '');
        onClose && onClose();
      }
    }
  };

  useEffect(() => {
    if (isSuccess === answerType.CREATE_ANSWER) {
      toast(t('toast.add_answer_success'));
    }
    if (isSuccess === answerType.UPDATE_ANSWER) {
      toast(t('toast.edit_answer_success'));
    }
    if (isError === answerType.CREATE_ANSWER) {
      toast(t('toast.unsuccess'));
    }

    return () => {
      dispatch(reset());
    };
  }, [dispatch, isSuccess, isError, t]);

  if (!user) {
    return <NeedLogin />;
  }

  return (
    <div className={style.container}>
      <div className={style.avatar}>
        <Avatar user={user} />
      </div>
      <div className={style.main}>
        <form onSubmit={handleSubmit(handleSubmitForm)}>
          <FormGroup>
            <TextArea
              placeholder={t('placeholder.add_answer')}
              rows={6}
              defaultValue={defaultValue || ''}
              {...register('content', {
                required: 'Content is required',
                minLength: {
                  value: 50,
                  message: 'Content must be have at least 50 characters',
                },
              })}
            />
          </FormGroup>
          <div className={style.actions}>
            {onClose && (
              <Button
                label={t('questions.label.cancel')}
                type="button"
                variant="outline"
                handleFuncion={onClose}
              />
            )}
            <Button
              label={t('questions.label.preview')}
              type="button"
              variant="outline"
              handleFuncion={previewQuestion}
            />
            <Button
              label={t('questions.label.submit')}
              loading={isLoading}
              variant="primary"
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default CommentInput;
