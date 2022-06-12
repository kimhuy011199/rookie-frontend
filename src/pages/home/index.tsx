import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import styles from './style.module.css';
import { ReactComponent as Coding } from '../../assets/images/home-icon.svg';
import { Link, useNavigate } from 'react-router-dom';
import Button from '../../shared/components/Button';
import { useSelector } from 'react-redux';

const Home = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { user } = useSelector((state: any) => state.auth);

  const goToLogin = () => {
    navigate('/auth/login');
  };

  useEffect(() => {
    if (user) {
      navigate('/questions');
    }
  }, [user, navigate]);

  return (
    <div className={styles.container}>
      <Coding className={styles.img} />
      <h2 className={styles.heading}>
        {t('home.heading')}
        <span className={styles.headingBold}>{t('home.heading_bold')}</span>
      </h2>
      <p className={styles.desc}>{t('home.desc')}</p>
      <Button
        label={t('home.login')}
        variant="primary"
        handleFuncion={goToLogin}
      />
      <span className={styles.questions}>
        {t('home.or')}
        <Link className={styles.link} to="/questions">
          {t('home.link')}
        </Link>
      </span>
    </div>
  );
};

export default Home;
