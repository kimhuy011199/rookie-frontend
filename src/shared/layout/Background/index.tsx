import React from 'react';
import style from './style.module.css';

const Background = (props: any) => {
  return (
    <div className={style.background}>
      <img src="/background.jpeg" alt="Background" className={style.img} />
      <div className={style.grid}></div>
      {props.children}
    </div>
  );
};

export default Background;
