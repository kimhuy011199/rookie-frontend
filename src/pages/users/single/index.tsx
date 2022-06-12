import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import style from './style.module.css';
import Spinner from '../../../shared/components/Spinner';
import Error from '../../../shared/components/Error';
import { ERROR_CODE } from '../../../shared/constants/enums';
import { useTranslation } from 'react-i18next';
import Avatar from '../../../shared/components/Avatar';

const SingleUser = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { t } = useTranslation();

  const { user, isLoading, isError, message } = useSelector(
    (state: any) => state.auth
  );

  const userInfo = {
    display_name: user.displayName,
    email: user.email,
    github: user.linkGithub,
    linkedin: user.linkLinkedIn,
    about: user.about,
  };
  const entries = Object.entries(userInfo);

  useEffect(() => {
    if (id) {
      // dispatch();
    }
  }, [id, dispatch]);

  return (
    <>
      <Spinner isLoading={isLoading} />
      <Error
        show={isError && message?.errorCode === 404}
        code={ERROR_CODE.NOT_FOUND}
      />
      <div className={style.container}>
        <div className={style.avatar}>
          <Avatar user={user} />
        </div>
        <div className={style.right}>
          <h3 className={style.heading}>
            {t('settings.heading.personal_info')}
          </h3>
          <ul className={style.list}>
            {entries.map((item: any, index) => (
              <li key={index} className={style.item}>
                <span className={style.label}>
                  {t(`settings.label.${item[0]}`)}
                </span>
                {item[0] === 'github' || item[0] === 'linkedin' ? (
                  // eslint-disable-next-line jsx-a11y/anchor-has-content
                  <a
                    className={style.title}
                    href={item[1]}
                    target="_blank"
                    rel="noreferrer"
                  >
                    {item[1]}
                  </a>
                ) : (
                  <span className={style.title}>{item[1]}</span>
                )}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
};

export default SingleUser;
