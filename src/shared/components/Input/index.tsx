import React from 'react';
import style from './style.module.css';

interface InputInterface {
  error?: string;
  type?: string;
}

type InputType = React.HTMLProps<HTMLInputElement> & InputInterface;

const Input = React.forwardRef<HTMLInputElement, InputType>(
  ({ type, error, ...rest }, ref) => {
    const inputProps = {
      ref,
      type,
      className: `${style.inputText} ${error && style.errorInput}`,
    };

    return <input {...inputProps} {...rest} />;
  }
);

export default Input;
