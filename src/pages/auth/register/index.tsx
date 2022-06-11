import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import {
  register as registerUser,
  reset,
} from '../../../stores/auth/authSlice';
import FormGroup from '../../../shared/components/FormGroup';
import Input from '../../../shared/components/Input';
import Button from '../../../shared/components/Button';
import { useTranslation } from 'react-i18next';
import {
  EMAIL_PATTERN,
  PASSWORD_PATTERN,
  DISPLAYNAME_PATTERN,
} from '../../../shared/constants/patterns';
import { ReactComponent as Logo } from '../../../assets/images/favicon.svg';
import style from '../style.module.css';

export interface RegisterUserInterface {
  displayName: string;
  email: string;
  password: string;
  password2: string;
}

function Register() {
  const { t } = useTranslation();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<RegisterUserInterface>();

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

  const handleSubmitForm = (data: RegisterUserInterface) => {
    const { password2, ...userData } = data;
    dispatch(registerUser(userData));
  };

  return (
    <>
      <div className={style.logo}>
        <Logo />
      </div>
      <h2 className={style.heading}>{t('auth.register.desc')}</h2>
      <p className={style.sub}>{t('auth.register.sub')}</p>
      <div className={style.form}>
        <form onSubmit={handleSubmit(handleSubmitForm)}>
          <FormGroup
            label={t('auth.label.displayName')}
            error={errors.displayName?.message}
          >
            <Input
              type="text"
              {...register('displayName', {
                required: 'Display name is required',
                pattern: {
                  value: DISPLAYNAME_PATTERN,
                  message: 'Please enter a valid display name',
                },
              })}
            />
          </FormGroup>
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
          <FormGroup
            label={t('auth.label.password2')}
            error={errors.password2?.message}
          >
            <Input
              type="password"
              {...register('password2', {
                required: 'Password is required',
                validate: (val: string) => {
                  if (watch('password') !== val) {
                    return 'Your password does not match';
                  }
                },
              })}
            />
          </FormGroup>
          <Button
            label={t('auth.label.submit')}
            loading={isLoading}
            variant="primary"
            full
          />
          {isError && <span className={style.serverError}>{message}</span>}
        </form>
      </div>
      <span className={style.action}>
        {t('auth.register.q')}
        <Link className={style.link} to="/auth/login">
          {t('auth.register.a')}
        </Link>
      </span>
    </>
  );
}

export default Register;
