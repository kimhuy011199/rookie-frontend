import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { login, reset } from '../../../stores/auth/authSlice';
import FormGroup from '../../../shared/components/FormGroup';
import Input from '../../../shared/components/Input';
import Button from '../../../shared/components/Button';
import {
  EMAIL_PATTERN,
  PASSWORD_PATTERN,
} from '../../../shared/constants/patterns';
import { ReactComponent as Logo } from '../../../assets/images/logo.svg';
import style from '../style.module.css';

export interface LoginUserInterface {
  email: string;
  password: string;
}

function Login() {
  const { t } = useTranslation();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginUserInterface>();

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user, isLoading, isError, isSuccess, message } = useSelector(
    (state: any) => state.auth
  );

  useEffect(() => {
    if (isSuccess || user) {
      navigate('/');
    }

    dispatch(reset());
  }, [user, isSuccess, navigate, dispatch]);

  const handleSubmitForm = (data: LoginUserInterface) => {
    dispatch(login(data));
  };

  return (
    <>
      <div className={style.logo}>
        <Logo />
      </div>
      <h2 className={style.heading}>{t('auth.login.desc')}</h2>
      <div className={style.form}>
        <form onSubmit={handleSubmit(handleSubmitForm)}>
          <FormGroup
            label={t('auth.label.email')}
            error={errors.email?.message}
          >
            <Input
              type="text"
              {...register('email', {
                required: 'Email is required',
                pattern: {
                  value: EMAIL_PATTERN,
                  message: 'Please enter a valid email',
                },
              })}
            />
          </FormGroup>
          <FormGroup
            label={t('auth.label.password')}
            error={errors.password?.message}
          >
            <Input
              type="password"
              {...register('password', {
                required: 'Password is required',
                pattern: {
                  value: PASSWORD_PATTERN,
                  message: 'Please enter a valid password',
                },
              })}
            />
          </FormGroup>
          <Button
            label={t('auth.label.submit')}
            loading={isLoading}
            variant="primary"
          />
          {isError && <span className={style.serverError}>{message}</span>}
        </form>
      </div>
      <span className={style.action}>
        {t('auth.login.q')}
        <Link className={style.link} to="/auth/register">
          {t('auth.login.a')}
        </Link>
      </span>
    </>
  );
}

export default Login;
