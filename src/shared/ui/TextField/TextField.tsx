// src/shared/ui/TextField/TextField.tsx

import type {
  TextareaHTMLAttributes,
  ReactNode,
  ForwardedRef,
} from 'react';
import { forwardRef, useId } from 'react';
import styles from './TextField.module.css';

export interface TextFieldProps
  extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  helperText?: string;
  error?: string;
  fullWidth?: boolean;
  leftIcon?: ReactNode;
}

export const TextField = forwardRef(function TextField(
  {
    id,
    label,
    helperText,
    error,
    fullWidth = false,
    className,
    rows = 3,
    leftIcon,
    ...rest
  }: TextFieldProps,
  ref: ForwardedRef<HTMLTextAreaElement>
) {
  const autoId = useId();
  const textareaId = id ?? autoId;
  const helperId = helperText ? `${textareaId}-helper` : undefined;
  const errorId = error ? `${textareaId}-error` : undefined;

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
    error ? styles.hasError : '',
  ]
    .filter(Boolean)
    .join(' ');

  const textareaClasses = [
    styles.textarea,
    error ? styles.textareaError : '',
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <div className={wrapperClasses}>
      {label && (
        <label
          htmlFor={textareaId}
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

        <textarea
          id={textareaId}
          ref={ref}
          className={textareaClasses}
          rows={rows}
          aria-invalid={!!error || undefined}
          aria-describedby={describedBy}
          {...rest}
        />
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

export default TextField;
