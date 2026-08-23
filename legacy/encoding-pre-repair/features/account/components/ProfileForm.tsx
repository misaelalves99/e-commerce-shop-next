// src/features/account/components/ProfileForm.tsx
'use client';

import { useEffect, useState } from 'react';
import type { FormEvent } from 'react';

import type { UserData } from '@/core/types/user-data';

interface ProfileFormProps {
  initialValues: UserData | null;
  loading: boolean;
  isSubmitting: boolean;
  serverError?: string | null;
  successMessage?: string | null;
  onSubmit: (values: UserData) => void | Promise<void>;
}

type ProfileErrors = Partial<Record<keyof UserData, string>>;

export default function ProfileForm({
  initialValues,
  loading,
  isSubmitting,
  serverError,
  successMessage,
  onSubmit,
}: ProfileFormProps) {
  const [formValues, setFormValues] = useState<UserData | null>(initialValues);
  const [errors, setErrors] = useState<ProfileErrors>({});

  useEffect(() => {
    if (initialValues) {
      setFormValues(initialValues);
    }
  }, [initialValues]);

  const handleChange = (
    field: keyof UserData,
    value: string,
  ) => {
    if (!formValues) return;
    setFormValues(prev =>
      prev ? { ...prev, [field]: value } : prev,
    );
    setErrors(prev => ({ ...prev, [field]: undefined }));
  };

  const validate = (values: UserData): ProfileErrors => {
    const nextErrors: ProfileErrors = {};

    if (!values.fullName.trim()) {
      nextErrors.fullName = 'Informe seu nome completo.';
    }

    if (!values.email.trim()) {
      nextErrors.email = 'Informe um e-mail válido.';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) {
      nextErrors.email = 'Formato de e-mail inválido.';
    }

    if (values.cpf && values.cpf.replace(/\D/g, '').length < 11) {
      nextErrors.cpf = 'CPF incompleto.';
    }

    if (values.phone && values.phone.replace(/\D/g, '').length < 10) {
      nextErrors.phone = 'Telefone incompleto.';
    }

    return nextErrors;
  };

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    if (!formValues) return;

    const validationErrors = validate(formValues);
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length > 0) return;

    await onSubmit(formValues);
  };

  if (loading && !formValues) {
    return (
      <div className="form-skeleton">
        <div className="form-skeleton-line" />
        <div className="form-skeleton-line" />
        <div className="form-skeleton-line" />
      </div>
    );
  }

  if (!formValues) {
    return (
      <p className="form-hint">
        Carregando dados do perfil...
      </p>
    );
  }

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

      <div className="form-grid form-grid--2-cols">
        {/* Nome completo */}
        <div className="form-field">
          <label className="field-label" htmlFor="fullName">
            Nome completo
          </label>
          <input
            id="fullName"
            name="fullName"
            type="text"
            className={`field-input ${
              errors.fullName ? 'field-input--error' : ''
            }`}
            value={formValues.fullName}
            onChange={event =>
              handleChange('fullName', event.target.value)
            }
            placeholder="Como aparece em documentos"
            autoComplete="name"
          />
          {errors.fullName && (
            <p className="field-error">{errors.fullName}</p>
          )}
        </div>

        {/* E-mail */}
        <div className="form-field">
          <label className="field-label" htmlFor="email">
            E-mail
          </label>
          <input
            id="email"
            name="email"
            type="email"
            className={`field-input ${
              errors.email ? 'field-input--error' : ''
            }`}
            value={formValues.email}
            onChange={event =>
              handleChange('email', event.target.value)
            }
            placeholder="seuemail@exemplo.com"
            autoComplete="email"
          />
          {errors.email && (
            <p className="field-error">{errors.email}</p>
          )}
        </div>

        {/* CPF */}
        <div className="form-field">
          <label className="field-label" htmlFor="cpf">
            CPF
          </label>
          <input
            id="cpf"
            name="cpf"
            type="text"
            inputMode="numeric"
            className={`field-input ${
              errors.cpf ? 'field-input--error' : ''
            }`}
            value={formValues.cpf}
            onChange={event =>
              handleChange('cpf', event.target.value)
            }
            placeholder="000.000.000-00"
          />
          {errors.cpf && (
            <p className="field-error">{errors.cpf}</p>
          )}
          <p className="field-hint">
            Usado apenas para emissão de nota fiscal (mock).
          </p>
        </div>

        {/* Data de nascimento */}
        <div className="form-field">
          <label className="field-label" htmlFor="birthDate">
            Data de nascimento
          </label>
          <input
            id="birthDate"
            name="birthDate"
            type="date"
            className="field-input"
            value={formValues.birthDate}
            onChange={event =>
              handleChange('birthDate', event.target.value)
            }
          />
        </div>

        {/* Gênero */}
        <div className="form-field">
          <label className="field-label" htmlFor="gender">
            Gênero (opcional)
          </label>
          <select
            id="gender"
            name="gender"
            className="field-input"
            value={formValues.gender}
            onChange={event =>
              handleChange('gender', event.target.value)
            }
          >
            <option value="">Prefiro não informar</option>
            <option value="female">Feminino</option>
            <option value="male">Masculino</option>
            <option value="other">Outro</option>
          </select>
        </div>

        {/* Telefone */}
        <div className="form-field">
          <label className="field-label" htmlFor="phone">
            Telefone
          </label>
          <input
            id="phone"
            name="phone"
            type="tel"
            className={`field-input ${
              errors.phone ? 'field-input--error' : ''
            }`}
            value={formValues.phone}
            onChange={event =>
              handleChange('phone', event.target.value)
            }
            placeholder="(00) 00000-0000"
            autoComplete="tel"
          />
          {errors.phone && (
            <p className="field-error">{errors.phone}</p>
          )}
        </div>
      </div>

      <div className="form-footer">
        <p className="form-hint">
          Esses dados são usados apenas dentro deste projeto
          para simular um e-commerce real.
        </p>
        <div className="form-actions">
          <button
            type="submit"
            className="btn-primary"
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Salvando...' : 'Salvar alterações'}
          </button>
        </div>
      </div>
    </form>
  );
}
