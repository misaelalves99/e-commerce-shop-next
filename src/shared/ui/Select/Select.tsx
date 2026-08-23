// src/shared/ui/Select/Select.tsx

import type {
  SelectHTMLAttributes,
  ReactNode,
  ForwardedRef,
} from 'react';
import { forwardRef, useId } from 'react';
import styles from './Select.module.css';

export interface SelectOption {
  value: string;
  label: string;
}

export interface SelectProps
  extends SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  helperText?: string;
  error?: string;
  fullWidth?: boolean;
  options?: SelectOption[];
  placeholderOption?: string;
  leftIcon?: ReactNode;
}

export const Select = forwardRef(function Select(
  {
    id,
    label,
    helperText,
    error,
    fullWidth = false,
    className,
    options,
    children,
    placeholderOption,
    leftIcon,
    ...rest
  }: SelectProps,
  ref: ForwardedRef<HTMLSelectElement>
) {
  const autoId = useId();
  const selectId = id ?? autoId;
  const helperId = helperText ? `${selectId}-helper` : undefined;
  const errorId = error ? `${selectId}-error` : undefined;

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

  const selectClasses = [
    styles.select,
    error ? styles.selectError : '',
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <div className={wrapperClasses}>
      {label && (
        <label
          htmlFor={selectId}
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

        <select
          id={selectId}
          ref={ref}
          className={selectClasses}
          aria-invalid={!!error || undefined}
          aria-describedby={describedBy}
          {...rest}
        >
          {placeholderOption && (
            <option value="" disabled hidden>
              {placeholderOption}
            </option>
          )}

          {options
            ? options.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))
            : children}
        </select>

        <span className={styles.iconRight} aria-hidden="true">
          ▾
        </span>
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

export default Select;
