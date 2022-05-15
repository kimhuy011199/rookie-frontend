import { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import Spinner from '../../shared/components/Spinner';
import { getQuestions, reset } from '../../stores/questions/questionSlice';
import style from './style.module.css';
import { Question } from '../../shared/constants/types/Question';
import QuestionItem from '../../shared/components/QuestionItem';
import Pagination from '../../shared/components/Pagination';

function Questions() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [searchParams] = useSearchParams();
  const currentPage = searchParams.get('page') || '1';

  const { questions, isLoading } = useSelector((state: any) => state.questions);

  useEffect(() => {
    dispatch(getQuestions(+currentPage));

    return () => {
      dispatch(reset());
    };
  }, [navigate, dispatch, currentPage]);

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
          <Pagination {...questions} />
        </>
      )}
    </>
  );
}

export default Questions;
