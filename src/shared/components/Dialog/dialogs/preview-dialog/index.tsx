import React from 'react';
import { Dialog } from '../../Provider';
import style from './style.module.css';

interface PreviewDialogInterface {
  title: string;
  content: string;
  tags?: string[];
  close?: Function;
}

const PreviewDialog = (props: PreviewDialogInterface) => {
  const { title, content, tags, close } = props;
  const inlineStyle = {
    maxWidth: '60rem',
    minHeight: '30rem',
    height: '30rem',
    width: '90%',
    overflow: 'scroll',
  };

  return (
    <Dialog close={close} inlineStyle={inlineStyle}>
      <h2 className={style.heading}>{title}</h2>
      <div className={style.content}>{content}</div>
    </Dialog>
  );
};

export default PreviewDialog;
