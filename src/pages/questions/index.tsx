import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import Spinner from '../../shared/components/Spinner';
import { getQuestions, reset } from '../../stores/questions/questionSlice';
import style from './style.module.css';
import { Question } from '../../shared/constants/types/Question';
import QuestionItem from '../../shared/components/QuestionItem';

function Questions() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { questions, isLoading } = useSelector((state: any) => state.questions);

  useEffect(() => {
    dispatch(getQuestions());

    return () => {
      dispatch(reset());
    };
  }, [navigate, dispatch]);

  return (
    <>
      <Spinner isLoading={isLoading} />
      {questions?.questionsList && (
        <>
          <h2 className={style.heading}>Questions page</h2>
          <p className={style.desc}></p>
          <div className={style.questions}>
            <ul className={style.questionsList}>
              {questions?.questionsList.map((question: Question) => (
                <li key={question._id}>
                  <QuestionItem question={question} />
                </li>
              ))}
            </ul>
          </div>
        </>
      )}
    </>
  );
}

export default Questions;
