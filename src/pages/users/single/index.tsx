import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import style from './style.module.css';
import Spinner from '../../../shared/components/Spinner';
import Error from '../../../shared/components/Error';
import { ERROR_CODE } from '../../../shared/constants/enums';
import { useTranslation } from 'react-i18next';
import Avatar from '../../../shared/components/Avatar';
import {
  getQuestionByUserId,
  reset,
} from '../../../stores/questions/questionSlice';
import List from '../../../shared/components/List';
import QuestionLinkItem from '../../../shared/components/QuestionLinkItem';
import UserInfoItem from './components/UserInfoItem';
import { questionType } from '../../../stores/questions/questionType';
import { toast } from 'react-toastify';
import { getUserById } from '../../../stores/users/userSlice';
import { userType } from '../../../stores/users/userType';

const SingleUser = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const [userInfoList, setUserInfoList] = useState<any>();

  const { user, isLoading, isError, isSuccess, message } = useSelector(
    (state: any) => state.users
  );

  const {
    userQuestions,
    isError: isQuestionError,
    isSuccess: isQuestionSuccess,
  } = useSelector((state: any) => state.questions);

  useEffect(() => {
    if (id) {
      dispatch(getUserById(id));
      dispatch(getQuestionByUserId(id));
    }
  }, [id, dispatch]);

  useEffect(() => {
    if (id && user?._id === id && isSuccess === userType.GET_USER_BY_ID) {
      const userInfo = {
        display_name: user.displayName,
        email: user.email,
        github: user.linkGithub,
        linkedin: user.linkLinkedIn,
        about: user.about,
      };
      const userInfoEntries = Object.entries(userInfo);
      setUserInfoList(userInfoEntries);
    }
  }, [id, user, isSuccess]);

  useEffect(() => {
    if (isQuestionSuccess === questionType.DELETE_QUESTION) {
      toast(t('toast.delete_question_success'));
    }
  }, [isQuestionSuccess, t]);

  useEffect(() => {
    if (isQuestionError === questionType.GET_QUESTION_BY_USER_ID) {
      toast(t('toast.unsuccess'));
    }
    if (isError === userType.GET_USER_BY_ID) {
      toast(t('toast.unsuccess'));
    }

    return () => {
      dispatch(reset());
    };
  }, [isQuestionError, isError, t, dispatch]);

  return (
    <>
      <Spinner isLoading={isLoading} />
      <Error
        show={isError === userType.GET_USER_BY_ID && message?.errorCode === 404}
        code={ERROR_CODE.NOT_FOUND}
      />
      {user && user?._id === id && userInfoList && (
        <>
          <div className={style.container}>
            <div className={style.avatar}>
              <Avatar user={user} size="lg" />
            </div>
            <div className={style.information}>
              <List
                data={userInfoList}
                heading={t('settings.heading.personal_info')}
              >
                <UserInfoItem />
              </List>
              <List
                data={userQuestions}
                heading={t('settings.heading.user_questions')}
                emptyListContent={t('questions.no_questions')}
              >
                <QuestionLinkItem />
              </List>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default SingleUser;
