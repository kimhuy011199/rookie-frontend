import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import Spinner from '../../shared/components/Spinner';
import { getQuestions, reset } from '../../stores/questions/questionSlice';

function Questions() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { questions, isLoading, isError, message } = useSelector(
    (state: any) => state.questions
  );

  useEffect(() => {
    dispatch(getQuestions());

    return () => {
      dispatch(reset());
    };
  }, [navigate, dispatch]);

  useEffect(() => {
    console.log({ questions, isError, message });
  }, [questions, isError, message]);

  return (
    <>
      <Spinner isLoading={isLoading} />
      <h2>Questions page</h2>;
    </>
  );
}

export default Questions;
