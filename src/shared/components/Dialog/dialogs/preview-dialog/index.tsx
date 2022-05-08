import React from 'react';
import { useTranslation } from 'react-i18next';
import { COMMENT_TYPE } from '../../../../constants/enums';
import MarkdownRender from '../../../Markdown';
import { Dialog } from '../../Provider';
import style from './style.module.css';

interface PreviewDialogInterface {
  title?: string;
  content: string;
  close?: Function;
  type?: number;
}

const PreviewDialog = (props: PreviewDialogInterface) => {
  const { title, content, close, type = COMMENT_TYPE.QUESTION } = props;
  const inlineStyle = {
    maxWidth: '60rem',
    minHeight: '40rem',
    height: '40rem',
    width: '90%',
    overflowY: 'auto',
  };
  const { t } = useTranslation();

  return (
    <Dialog close={close} inlineStyle={inlineStyle}>
      {type === COMMENT_TYPE.QUESTION && (
        <div className={style.head}>
          <span className={style.label}>{t('questions.label.question')}</span>
          <h2 className={style.heading}>{title}</h2>
        </div>
      )}
      <MarkdownRender content={content} />
    </Dialog>
  );
};

export default PreviewDialog;
