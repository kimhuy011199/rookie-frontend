import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { answerAction } from '../../../../../stores/answers/answerAction';
import { deleteAnswer } from '../../../../../stores/answers/answerSlice';
import ConfirmDialog from '../confirm';

interface DeleteCommentDialogInterface {
  data: any;
  close?: any;
}

const DeleteCommentDialog = (props: DeleteCommentDialogInterface) => {
  const { data, close } = props;
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { isSuccess, isError } = useSelector((state: any) => state.answers);

  const submitDelete = () => {
    dispatch(deleteAnswer(data?._id));
  };

  useEffect(() => {
    if (isSuccess === answerAction.DELETE_ANSWER) {
      toast(t('toast.delete_answer_success'));
    }
    if (isError === answerAction.DELETE_ANSWER) {
      toast(t('toast.unsuccess'));
    }
  }, [isError, isSuccess, t]);

  return (
    <ConfirmDialog
      close={close}
      title={t('dialog.delete_answer')}
      content={t('dialog.delete_answer_content')}
      submitBtnText={t('dialog.submit')}
      cancelBtnText={t('dialog.cancel')}
      onClick={submitDelete}
    />
  );
};

export default DeleteCommentDialog;
