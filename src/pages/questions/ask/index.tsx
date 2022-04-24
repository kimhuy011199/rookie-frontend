import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useForm } from 'react-hook-form';
import style from './style.module.css';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import FormGroup from '../../../shared/components/FormGroup';
import Input from '../../../shared/components/Input';
import Button from '../../../shared/components/Button';
import TextArea from '../../../shared/components/TextArea';
import TagInput from '../../../shared/components/TagInput';
import { useDialog } from '../../../shared/components/Dialog/Provider';
import PreviewDialog from '../../../shared/components/Dialog/dialogs/preview-dialog';
import { createQuestion } from '../../../stores/questions/questionSlice';

export interface AskQuestionInterface {
  title: string;
  content: string;
  tags: string[];
}

const AskQuestion = () => {
  const { appendDialog } = useDialog();
  const { t } = useTranslation();
  const {
    register,
    getValues,
    handleSubmit,
    formState: { errors },
  } = useForm<AskQuestionInterface>();

  const [tags, setTags] = useState<string[]>([]);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { questions, isLoading, isError, isSuccess, message } = useSelector(
    (state: any) => state.questions
  );

  const handleSubmitForm = (data: AskQuestionInterface) => {
    const questionData = { ...data, tags };
    dispatch(createQuestion(questionData));
    console.log(questionData);
  };

  const previewQuestion = () => {
    const [title, content] = getValues(['title', 'content']);
    if (!title || !content) {
      return;
    }
    appendDialog(<PreviewDialog title={title} content={content} />);
  };

  return (
    <>
      <h2 className={style.heading}>{t('questions.ask_question_title')}</h2>
      <div className={style.container}>
        <div className={style.form}>
          <form onSubmit={handleSubmit(handleSubmitForm)}>
            <FormGroup
              label={t('questions.label.title')}
              boldLabel
              subLabel={t('questions.label.sub_title')}
              error={errors.title?.message}
            >
              <Input
                type="text"
                {...register('title', {
                  required: 'Title is required',
                })}
              />
            </FormGroup>
            <FormGroup
              label={t('questions.label.content')}
              boldLabel
              subLabel={t('questions.label.sub_content')}
              error={errors.content?.message}
            >
              <TextArea
                rows={12}
                canResized={false}
                {...register('content', {
                  required: 'Content is required',
                })}
              />
            </FormGroup>
            <FormGroup
              label={t('questions.label.tags')}
              boldLabel
              subLabel={t('questions.label.sub_tags')}
            >
              <TagInput tags={tags} setTags={setTags} />
            </FormGroup>
            <div className={style.action}>
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
            {isError && <span className={style.serverError}>{message}</span>}
          </form>
        </div>
        <div className={style.suggestion}></div>
      </div>
    </>
  );
};

export default AskQuestion;
