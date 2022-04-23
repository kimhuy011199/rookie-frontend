import React, { cloneElement } from 'react';
import style from './style.module.css';

interface FormGroupInterface {
  label?: string;
  boldLabel?: boolean;
  subLabel?: boolean;
  error?: string;
  type?: string;
}

type FormGroupType = React.HTMLProps<HTMLInputElement> & FormGroupInterface;

const FormGroup = (props: FormGroupType) => {
  const { label, boldLabel, subLabel, error, children } = props;

  const renderLabel = label && (
    <label className={`${style.label} ${boldLabel && 'font-medium'}`}>
      {label}
    </label>
  );
  const renderSubLabel = subLabel && (
    <span className={style.subLabel}>{subLabel}</span>
  );
  const renderError = error && (
    <span className={style.errorMessage}>{error}</span>
  );

  return (
    <div className={style.formGroup}>
      {renderLabel}
      {renderSubLabel}
      {cloneElement(children as React.ReactElement, { error })}
      {renderError}
    </div>
  );
};

export default FormGroup;
