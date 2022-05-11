import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import style from './style.module.css';
import { ReactComponent as Avatar } from '../../../assets/images/avatar.svg';
import Button from '../Button';
import { useDialog } from '../Dialog/Provider';
import PreviewDialog from '../Dialog/dialogs/preview-dialog';
import FormGroup from '../FormGroup';
import TextArea from '../TextArea';
import { COMMENT_TYPE } from '../../constants/enums';
import {
  createAnswer,
  updateAnswer,
} from '../../../stores/answers/answerSlice';

export interface InputInterface {
  content: string;
}

interface CommentInputInterface {
  type: number;
  data?: any;
  questionId?: string;
  defaultValue?: string;
  onClose?: (event?: any) => void;
}

const CommentInput = (props: CommentInputInterface) => {
  const { type, data, questionId, defaultValue, onClose } = props;
  const { t } = useTranslation();
  const { appendDialog } = useDialog();
  const dispatch = useDispatch();

  const { register, getValues, handleSubmit, reset, setValue } =
    useForm<InputInterface>();

  const { answer, isLoading, isError, isSuccess, message } = useSelector(
    (state: any) => state.answers
  );

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
        reset();
        toast(t('toast.add_answer_success'));
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
        toast(t('toast.edit_answer_success'));
        onClose && onClose();
      }
    }
  };

  // Check if user not login
  if (!user) {
    return null;
  }

  return (
    <div className={style.container}>
      <div className={style.img}>
        {data?.user?.avatarImg ? (
          <img
            src={data?.user?.avatarImg}
            alt={data?.user?.displayName}
            className={style.avatarImg}
          />
        ) : (
          <Avatar className={style.avatar} />
        )}
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
