import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import style from './style.module.css';
import Spinner from '../../../shared/components/Spinner';
import Error from '../../../shared/components/Error';
import { ERROR_CODE } from '../../../shared/constants/enums';

const SingleUser = () => {
  const { id } = useParams();
  const dispatch = useDispatch();

  const { user, isLoading, isError, message } = useSelector(
    (state: any) => state.auth
  );

  useEffect(() => {
    if (id) {
      // dispatch();
    }
  }, [id, dispatch]);
  // console.log(user);

  return (
    <>
      <Spinner isLoading={isLoading} />
      <Error
        show={isError && message?.errorCode === 404}
        code={ERROR_CODE.NOT_FOUND}
      />
    </>
  );
};

export default SingleUser;
