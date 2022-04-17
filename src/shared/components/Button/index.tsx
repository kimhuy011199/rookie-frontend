import React from 'react';
import style from './style.module.css';

interface FormGroupInterface {
  loading?: boolean;
  type?: any;
  label?: string;
  variant?: 'primary' | 'outline';
  handleFuncion?: () => void;
}

const FormGroup = (props: FormGroupInterface) => {
  const { variant, type, label, loading, handleFuncion } = props;
  const generateClassName = () => {
    switch (variant) {
      case 'primary':
        return style.primary;
      case 'outline':
        return style.outline;
      default:
        return style.primary;
    }
  };

  return (
    <button
      className={`${style.button} ${generateClassName()}`}
      disabled={loading}
      type={type}
      onClick={handleFuncion}
    >
      {label}
    </button>
  );
};

export default FormGroup;
