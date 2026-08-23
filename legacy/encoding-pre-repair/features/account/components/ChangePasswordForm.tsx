// src/features/account/components/ChangePasswordForm.tsx
'use client';

import { useState } from 'react';
import type { FormEvent } from 'react';

import type { PasswordFormData } from '@/core/types/password';

interface ChangePasswordFormProps {
  isSubmitting: boolean;
  serverError?: string | null;
  successMessage?: string | null;
  onSubmit: (values: PasswordFormData) => void | Promise<void>;
}

type PasswordErrors = Partial<Record<keyof PasswordFormData, string>>;

export default function ChangePasswordForm({
  isSubmitting,
  serverError,
  successMessage,
  onSubmit,
}: ChangePasswordFormProps) {
  const [values, setValues] = useState<PasswordFormData>({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });

  const [errors, setErrors] = useState<PasswordErrors>({});

  const handleChange = (
    field: keyof PasswordFormData,
    value: string,
  ) => {
    setValues(prev => ({ ...prev, [field]: value }));
    setErrors(prev => ({ ...prev, [field]: undefined }));
  };

  const validate = (data: PasswordFormData): PasswordErrors => {
    const next: PasswordErrors = {};

    if (!data.currentPassword.trim()) {
      next.currentPassword = 'Informe sua senha atual.';
    }

    if (!data.newPassword.trim()) {
      next.newPassword = 'Informe a nova senha.';
    } else if (data.newPassword.length < 8) {
      next.newPassword =
        'A nova senha deve ter pelo menos 8 caracteres.';
    }

    if (!data.confirmPassword.trim()) {
      next.confirmPassword = 'Confirme a nova senha.';
    } else if (data.newPassword !== data.confirmPassword) {
      next.confirmPassword = 'As senhas não coincidem.';
    }

    return next;
  };

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();

    const validationErrors = validate(values);
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length > 0) return;

    await onSubmit(values);
  };

  return (
    <form
      className="form-root"
      onSubmit={handleSubmit}
      noValidate
    >
      {(serverError || successMessage) && (
        <div
          className={`form-alert ${
            serverError ? 'form-alert--error' : 'form-alert--success'
          }`}
        >
          {serverError ?? successMessage}
        </div>
      )}

      <div className="form-grid form-grid--1-col">
        {/* Senha atual */}
        <div className="form-field">
          <label
            className="field-label"
            htmlFor="currentPassword"
          >
            Senha atual
          </label>
          <input
            id="currentPassword"
            name="currentPassword"
            type="password"
            autoComplete="current-password"
            className={`field-input ${
              errors.currentPassword ? 'field-input--error' : ''
            }`}
            value={values.currentPassword}
            onChange={event =>
              handleChange(
                'currentPassword',
                event.target.value,
              )
            }
          />
          {errors.currentPassword && (
            <p className="field-error">
              {errors.currentPassword}
            </p>
          )}
        </div>

        {/* Nova senha */}
        <div className="form-field">
          <label className="field-label" htmlFor="newPassword">
            Nova senha
          </label>
          <input
            id="newPassword"
            name="newPassword"
            type="password"
            autoComplete="new-password"
            className={`field-input ${
              errors.newPassword ? 'field-input--error' : ''
            }`}
            value={values.newPassword}
            onChange={event =>
              handleChange('newPassword', event.target.value)
            }
          />
          {errors.newPassword && (
            <p className="field-error">
              {errors.newPassword}
            </p>
          )}
          <p className="field-hint">
            Use no mínimo 8 caracteres. Combine letras maiúsculas,
            minúsculas, números e símbolos.
          </p>
        </div>

        {/* Confirmar nova senha */}
        <div className="form-field">
          <label
            className="field-label"
            htmlFor="confirmPassword"
          >
            Confirmar nova senha
          </label>
          <input
            id="confirmPassword"
            name="confirmPassword"
            type="password"
            autoComplete="new-password"
            className={`field-input ${
              errors.confirmPassword ? 'field-input--error' : ''
            }`}
            value={values.confirmPassword}
            onChange={event =>
              handleChange(
                'confirmPassword',
                event.target.value,
              )
            }
          />
          {errors.confirmPassword && (
            <p className="field-error">
              {errors.confirmPassword}
            </p>
          )}
        </div>
      </div>

      <div className="form-footer">
        <p className="form-hint">
          Ao alterar sua senha, sessões antigas podem ser
          desconectadas por segurança (comportamento simulado).
        </p>
        <div className="form-actions">
          <button
            type="submit"
            className="btn-primary"
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Alterando...' : 'Alterar senha'}
          </button>
        </div>
      </div>
    </form>
  );
}
