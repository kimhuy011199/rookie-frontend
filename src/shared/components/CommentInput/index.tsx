import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import style from './style.module.css';
import { ReactComponent as Avatar } from '../../../assets/images/avatar.svg';
import Button from '../Button';
import { useDialog } from '../Dialog/Provider';
import PreviewDialog from '../Dialog/dialogs/preview-dialog';
import FormGroup from '../FormGroup';
import TextArea from '../TextArea';
import { COMMENT_TYPE } from '../../constants/enums';
import { createAnswer } from '../../../stores/answers/answerSlice';

export interface InputInterface {
  content: string;
}

interface CommentInputInterface {
  type: number;
  data?: any;
  questionId?: string;
}

const CommentInput = (props: CommentInputInterface) => {
  const { type, data, questionId } = props;
  const { t } = useTranslation();
  const { appendDialog } = useDialog();
  const dispatch = useDispatch();

  const { register, getValues, handleSubmit, reset } =
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

  const handleSubmitForm = (data: InputInterface) => {
    if (questionId) {
      const submitData = { content: data.content, questionId };
      dispatch(createAnswer(submitData));
      reset();
    }
  };

  // Check if user not login
  if (!user) {
    return null;
  }

  return (
    <div className={style.container}>
      <div className={style.img}>
        {data?.img ? (
          <img src={data?.img} alt={data?.displayName} />
        ) : (
          <Avatar className={style.avatar} />
        )}
      </div>
      <div className={style.main}>
        <form onSubmit={handleSubmit(handleSubmitForm)}>
          <FormGroup>
            <TextArea
              rows={6}
              defaultValue={data?.content || ''}
              {...register('content', {
                required: 'Content is required',
              })}
            />
          </FormGroup>
          <div className={style.actions}>
            <Button
              label={t('questions.label.submit')}
              loading={isLoading}
              variant="primary"
            />
            <Button
              label={t('questions.label.preview')}
              type="button"
              variant="outline"
              handleFuncion={previewQuestion}
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default CommentInput;
