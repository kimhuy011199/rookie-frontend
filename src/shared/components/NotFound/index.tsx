import React from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import Button from '../Button';
import style from './style.module.css';

interface NotFoundInterface {
  isNotFound: boolean;
}

const NotFound = (props: NotFoundInterface) => {
  const { isNotFound } = props;
  const navigate = useNavigate();
  const { t } = useTranslation();

  const onClick = () => {
    navigate('/');
  };

  if (!isNotFound) {
    return null;
  }

  return (
    <div className={style.notFound}>
      <h2 className={style.title}>{t('not_found.title')}</h2>
      <span className={style.content}>{t('not_found.content')}</span>
      <Button label={t('not_found.action')} handleFuncion={onClick} />
    </div>
  );
};

export default NotFound;
