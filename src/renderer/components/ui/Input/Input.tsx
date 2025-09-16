import React from 'react';
import './Input.css';

export interface InputProps {
  type?: 'text' | 'email' | 'password' | 'number' | 'tel' | 'url';
  placeholder?: string;
  value?: string;
  defaultValue?: string;
  disabled?: boolean;
  required?: boolean;
  error?: string;
  label?: string;
  helperText?: string;
  size?: 'small' | 'medium' | 'large';
  className?: string;
  'data-testid'?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onFocus?: (e: React.FocusEvent<HTMLInputElement>) => void;
  onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;
}

export const Input: React.FC<InputProps> = ({
  type = 'text',
  placeholder,
  value,
  defaultValue,
  disabled = false,
  required = false,
  error,
  label,
  helperText,
  size = 'medium',
  className = '',
  'data-testid': testId,
  onChange,
  onFocus,
  onBlur,
}) => {
  const baseClass = 'input';
  const sizeClass = `input--${size}`;
  const errorClass = error ? 'input--error' : '';
  const disabledClass = disabled ? 'input--disabled' : '';
  
  const inputClass = [
    baseClass,
    sizeClass,
    errorClass,
    disabledClass,
    className
  ].filter(Boolean).join(' ');

  const inputId = testId ? `${testId}-input` : undefined;

  return (
    <div className="input-wrapper">
      {label && (
        <label htmlFor={inputId} className="input-label">
          {label}
          {required && <span className="input-required">*</span>}
        </label>
      )}
      <input
        id={inputId}
        type={type}
        className={inputClass}
        placeholder={placeholder}
        value={value}
        defaultValue={defaultValue}
        disabled={disabled}
        required={required}
        data-testid={testId}
        onChange={onChange}
        onFocus={onFocus}
        onBlur={onBlur}
      />
      {error && <span className="input-error">{error}</span>}
      {helperText && !error && <span className="input-helper">{helperText}</span>}
    </div>
  );
};

