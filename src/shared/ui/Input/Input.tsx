// src/shared/ui/Input/Input.tsx

import type {
  InputHTMLAttributes,
  ReactNode,
  ForwardedRef,
} from 'react';
import { forwardRef, useId } from 'react';
import styles from './Input.module.css';

export interface InputProps
  extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  helperText?: string;
  error?: string;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
  fullWidth?: boolean;
}

export const Input = forwardRef(function Input(
  {
    id,
    label,
    helperText,
    error,
    leftIcon,
    rightIcon,
    fullWidth = false,
    className,
    ...rest
  }: InputProps,
  ref: ForwardedRef<HTMLInputElement>
) {
  const autoId = useId();
  const inputId = id ?? autoId;
  const helperId = helperText ? `${inputId}-helper` : undefined;
  const errorId = error ? `${inputId}-error` : undefined;

  const describedBy = [helperId, errorId].filter(Boolean).join(' ') || undefined;

  const wrapperClasses = [
    styles.wrapper,
    fullWidth ? styles.fullWidth : '',
    className ?? '',
  ]
    .filter(Boolean)
    .join(' ');

  const fieldClasses = [
    styles.fieldWrapper,
    leftIcon ? styles.withLeftIcon : '',
    rightIcon ? styles.withRightIcon : '',
    error ? styles.hasError : '',
  ]
    .filter(Boolean)
    .join(' ');

  const inputClasses = [
    styles.input,
    error ? styles.inputError : '',
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <div className={wrapperClasses}>
      {label && (
        <label
          htmlFor={inputId}
          className={styles.label}
        >
          {label}
        </label>
      )}

      <div className={fieldClasses}>
        {leftIcon && (
          <span className={styles.iconLeft} aria-hidden="true">
            {leftIcon}
          </span>
        )}

        <input
          id={inputId}
          ref={ref}
          className={inputClasses}
          aria-invalid={!!error || undefined}
          aria-describedby={describedBy}
          {...rest}
        />

        {rightIcon && (
          <span className={styles.iconRight} aria-hidden="true">
            {rightIcon}
          </span>
        )}
      </div>

      {error ? (
        <p id={errorId} className={styles.errorText}>
          {error}
        </p>
      ) : helperText ? (
        <p id={helperId} className={styles.helperText}>
          {helperText}
        </p>
      ) : null}
    </div>
  );
});

export default Input;
