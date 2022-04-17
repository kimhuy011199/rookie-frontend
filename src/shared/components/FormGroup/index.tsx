import React, { cloneElement } from 'react';
import style from './style.module.css';

interface FormGroupInterface {
  label?: string;
  error?: string;
  type?: string;
}

type FormGroupType = React.HTMLProps<HTMLInputElement> & FormGroupInterface;

const FormGroup = (props: FormGroupType) => {
  const { label, error, children } = props;

  const renderLabel = label && <label className={style.label}>{label}</label>;
  const renderError = error && (
    <span className={style.errorMessage}>{error}</span>
  );

  return (
    <div className={style.formGroup}>
      {renderLabel}
      {cloneElement(children as React.ReactElement, { error })}
      {renderError}
    </div>
  );
};

export default FormGroup;
