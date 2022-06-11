import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import Button from '../../../shared/components/Button';
import FormGroup from '../../../shared/components/FormGroup';
import Input from '../../../shared/components/Input';
import { PASSWORD_PATTERN } from '../../../shared/constants/patterns';
import { changePassword, reset } from '../../../stores/auth/authSlice';
import style from './style.module.css';
import { toast } from 'react-toastify';

export interface PasswordInputInterface {
  oldPassword: string;
  newPassword: string;
  confirmPassword: string;
}

const ChangePassword = () => {
  const { t } = useTranslation();
  const { user, isLoading, isError, isSuccess, message } = useSelector(
    (state: any) => state.auth
  );
  const {
    watch,
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<PasswordInputInterface>({});

  const dispatch = useDispatch();

  const handleSubmitForm = (data: PasswordInputInterface) => {
    dispatch(reset());
    dispatch(changePassword({ ...user, ...data }));
  };

  useEffect(() => {
    if (!isLoading && isSuccess) {
      toast(t('toast.update_user_success'));
    }
    if (!isLoading && isError) {
      setError('oldPassword', { type: 'custom', message });
      toast(t('toast.unsuccess'));
    }

    return () => {
      dispatch(reset());
    };
  }, [dispatch, isSuccess, isError, isLoading, t, setError, message]);

  return (
    <div className={style.container}>
      <div className={style.profile}>
        <h3 className={style.heading}>{t('settings.heading.change_pass')}</h3>
        <div className={style.form}>
          <form onSubmit={handleSubmit(handleSubmitForm)}>
            <FormGroup
              label={t('settings.label.old_password')}
              error={errors.oldPassword?.message}
              flexRow
            >
              <Input
                type="password"
                {...register('oldPassword', {
                  required: 'Password is required',
                  pattern: {
                    value: PASSWORD_PATTERN,
                    message: 'Please enter a valid password',
                  },
                })}
              />
            </FormGroup>
            <FormGroup
              label={t('settings.label.new_password')}
              error={errors.newPassword?.message}
              flexRow
            >
              <Input
                type="password"
                {...register('newPassword', {
                  required: 'Password is required',
                  pattern: {
                    value: PASSWORD_PATTERN,
                    message: 'Please enter a valid password',
                  },
                })}
              />
            </FormGroup>
            <FormGroup
              label={t('settings.label.confirm_password')}
              error={errors.confirmPassword?.message}
              flexRow
            >
              <Input
                type="password"
                {...register('confirmPassword', {
                  required: 'Password is required',
                  validate: (val: string) => {
                    if (watch('newPassword') !== val) {
                      return 'Your password does not match';
                    }
                  },
                })}
              />
            </FormGroup>
            <div className={style.actions}>
              <Button
                label={t('settings.label.submit')}
                loading={isLoading}
                variant="primary"
              />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ChangePassword;
