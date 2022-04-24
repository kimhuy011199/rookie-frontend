import React from 'react';
import { useTranslation } from 'react-i18next';
import MarkdownRender from '../../../Markdown';
import { Dialog } from '../../Provider';
import style from './style.module.css';

interface PreviewDialogInterface {
  title: string;
  content: string;
  close?: Function;
}

const PreviewDialog = (props: PreviewDialogInterface) => {
  const { title, content, close } = props;
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
      <div className={style.head}>
        <span className={style.label}>{t('questions.label.question')}</span>
        <h2 className={style.heading}>{title}</h2>
      </div>
      <MarkdownRender content={content} />
    </Dialog>
  );
};

export default PreviewDialog;
