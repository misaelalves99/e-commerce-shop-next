// src/features/auth/components/AuthForm.tsx
'use client';

import { FormEvent, useState } from 'react';

export type AuthFormMode = 'login' | 'register';

export type AuthFormValues = {
  name?: string;
  email: string;
  password: string;
  confirmPassword?: string;
};

type FieldName = 'name' | 'email' | 'password' | 'confirmPassword';

type Errors = Partial<Record<FieldName, string>>;

type Props = {
  mode: AuthFormMode;
  isSubmitting: boolean;
  serverError?: string | null;
  onSubmit: (values: AuthFormValues) => void | Promise<void>;
};

export default function AuthForm({
  mode,
  isSubmitting,
  serverError,
  onSubmit,
}: Props) {
  const [values, setValues] = useState<AuthFormValues>({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const [errors, setErrors] = useState<Errors>({});

  const isRegister = mode === 'register';

  const updateField = (field: FieldName, value: string) => {
    setValues((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next[field];
        return next;
      });
    }
  };

  const validate = (): boolean => {
    const nextErrors: Errors = {};

    if (isRegister) {
      if (!values.name || values.name.trim().length < 2) {
        nextErrors.name = 'Informe seu nome completo.';
      }
    }

    if (!values.email || values.email.trim().length === 0) {
      nextErrors.email = 'Informe um e-mail válido.';
    } else if (!values.email.includes('@')) {
      nextErrors.email = 'E-mail inválido.';
    }

    if (!values.password || values.password.trim().length < 6) {
      nextErrors.password = 'A senha deve ter pelo menos 6 caracteres.';
    }

    if (isRegister) {
      if (!values.confirmPassword) {
        nextErrors.confirmPassword = 'Confirme sua senha.';
      } else if (values.confirmPassword !== values.password) {
        nextErrors.confirmPassword = 'As senhas não coincidem.';
      }
    }

    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    if (!validate()) return;

    onSubmit({
      name: values.name?.trim() || undefined,
      email: values.email.trim(),
      password: values.password,
      confirmPassword: values.confirmPassword,
    });
  };

  return (
    <form
      className="auth-form form-card"
      onSubmit={handleSubmit}
      noValidate
      aria-busy={isSubmitting}
    >
      {/* Erro de servidor / autenticação */}
      {serverError && (
        <div className="form-alert form-alert-error" role="alert">
          <span>{serverError}</span>
        </div>
      )}

      {/* Nome (apenas cadastro) */}
      {isRegister && (
        <div className="field">
          <label className="field-label" htmlFor="name">
            Nome completo
          </label>
          <div className="field-control">
            <input
              id="name"
              name="name"
              type="text"
              autoComplete="name"
              className={`field-input ${
                errors.name ? 'field-input-error' : ''
              }`}
              placeholder="Como aparecerá nos pedidos"
              value={values.name ?? ''}
              onChange={(e) => updateField('name', e.target.value)}
              disabled={isSubmitting}
            />
            {errors.name && <p className="field-error">{errors.name}</p>}
          </div>
        </div>
      )}

      {/* E-mail */}
      <div className="field">
        <label className="field-label" htmlFor="email">
          E-mail
        </label>
        <div className="field-control">
          <input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            className={`field-input ${
              errors.email ? 'field-input-error' : ''
            }`}
            placeholder="seuemail@exemplo.com"
            value={values.email}
            onChange={(e) => updateField('email', e.target.value)}
            disabled={isSubmitting}
          />
          {errors.email && <p className="field-error">{errors.email}</p>}
        </div>
      </div>

      {/* Senha */}
      <div className="field">
        <label className="field-label" htmlFor="password">
          Senha
        </label>
        <div className="field-control">
          <input
            id="password"
            name="password"
            type="password"
            autoComplete={isRegister ? 'new-password' : 'current-password'}
            className={`field-input ${
              errors.password ? 'field-input-error' : ''
            }`}
            placeholder={isRegister ? 'Crie uma senha segura' : 'Sua senha'}
            value={values.password}
            onChange={(e) => updateField('password', e.target.value)}
            disabled={isSubmitting}
          />
          {errors.password && <p className="field-error">{errors.password}</p>}
          {isRegister && !errors.password && values.password.length >= 6 && (
            <p className="field-helper">
              Dica: use letras maiúsculas, minúsculas e números.
            </p>
          )}
        </div>
      </div>

      {/* Confirmar senha (apenas cadastro) */}
      {isRegister && (
        <div className="field">
          <label className="field-label" htmlFor="confirmPassword">
            Confirmar senha
          </label>
          <div className="field-control">
            <input
              id="confirmPassword"
              name="confirmPassword"
              type="password"
              autoComplete="new-password"
              className={`field-input ${
                errors.confirmPassword ? 'field-input-error' : ''
              }`}
              placeholder="Repita a mesma senha"
              value={values.confirmPassword ?? ''}
              onChange={(e) => updateField('confirmPassword', e.target.value)}
              disabled={isSubmitting}
            />
            {errors.confirmPassword && (
              <p className="field-error">{errors.confirmPassword}</p>
            )}
          </div>
        </div>
      )}

      {/* Ações */}
      <div className="form-actions">
        <button
          type="submit"
          className="btn-primary"
          disabled={isSubmitting}
        >
          {isSubmitting
            ? isRegister
              ? 'Criando conta...'
              : 'Entrando...'
            : isRegister
            ? 'Criar conta'
            : 'Entrar'}
        </button>
      </div>
    </form>
  );
}
