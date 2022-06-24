import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import { filterAnswer } from '../../../stores/answers/answerSlice';
import { FILTER_TYPE } from '../../constants/enums';
import style from './style.module.css';

const FilterButtons = () => {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const [filterType, setFilterType] = useState(FILTER_TYPE.OLDEST_ANSWER);

  const filterList = [
    { type: FILTER_TYPE.NEWEST_ANSWER, label: 'filter.newest_answer' },
    { type: FILTER_TYPE.OLDEST_ANSWER, label: 'filter.oldest_answer' },
    { type: FILTER_TYPE.MOST_LIKES, label: 'filter.most_likes' },
    { type: FILTER_TYPE.LOWEST_LIKES, label: 'filter.lowest_likes' },
  ];

  const handleChangeFilter = (type: number) => {
    setFilterType(type);
    dispatch(filterAnswer(type));
  };

  return (
    <div className={style.filterContainer}>
      <span className={style.heading}>{t('filter.heading')}</span>
      <ul className={style.list}>
        {filterList.map((item) => (
          <li className={style.item} key={item.type}>
            <button
              className={`${filterType === item.type && style.active} ${
                style.btn
              }`}
              onClick={() => handleChangeFilter(item.type)}
            >
              {t(`${item.label}`)}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FilterButtons;
