import React from 'react';
import style from './style.module.css';

interface TextAreaInterface {
  error?: string;
  canResized?: boolean;
}

type TextAreaType = React.HTMLProps<HTMLTextAreaElement> & TextAreaInterface;

const TextArea = React.forwardRef<HTMLTextAreaElement, TextAreaType>(
  ({ error, canResized = true, ...rest }, ref) => {
    const inputProps = {
      ref,
      className: `${style.inputText} ${error && style.errorInput} ${
        !canResized && style.resize
      }`,
    };

    return <textarea {...inputProps} {...rest} />;
  }
);

export default TextArea;
