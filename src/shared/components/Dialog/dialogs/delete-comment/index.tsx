import React from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
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

  const submitDelete = () => {
    try {
      dispatch(deleteAnswer(data?._id));
      toast(t('toast.delete_answer_success'));
    } catch (error: any) {}
  };

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
