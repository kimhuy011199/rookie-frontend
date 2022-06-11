import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout, reset } from '../../../stores/auth/authSlice';
import styles from './style.module.css';
import { ReactComponent as Logo } from '../../../assets/images/logo.svg';
import Button from '../../components/Button';
import { useTranslation } from 'react-i18next';
import UserMenu from '../../components/UserMenu';

function Header() {
  const { user } = useSelector((state: any) => state.auth);
  const { t } = useTranslation();

  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <div className={styles.logo}>
          <h1>
            <Link to="/">
              <Logo />
            </Link>
          </h1>
        </div>
        <ul className={styles.list}>
          {user ? (
            <>
              <li className={styles.item}></li>
              <li className={styles.item}>
                <UserMenu />
              </li>
            </>
          ) : (
            <>
              <li className={styles.item}>
                <Link className={styles.link} to="auth/login">
                  <Button label={t('header.login')} variant="primary" />
                </Link>
              </li>
              <li className={styles.item}>
                <Link className={styles.link} to="auth/register">
                  <Button label={t('header.register')} variant="outline" />
                </Link>
              </li>
            </>
          )}
        </ul>
      </div>
    </header>
  );
}

export default Header;
