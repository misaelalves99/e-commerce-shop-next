// src/core/domain/user/user-profile-service.ts

import type { UserData } from '../../types/user-data';

export interface UserProfileValidationError {
  field: keyof UserData;
  message: string;
}

/**
 * Normaliza os dados de perfil (trim, lower/upper em alguns campos etc.).
 */
export function normalizeUserProfile(data: UserData): UserData {
  return {
    ...data,
    fullName: data.fullName.trim(),
    cpf: data.cpf.trim(),
    birthDate: data.birthDate.trim(),
    gender: data.gender,
    phone: data.phone.trim(),
    email: data.email.trim().toLowerCase(),
  };
}

/**
 * Valida regras simples do perfil de usuário.
 * Não substitui validação de backend; serve para UX no front.
 */
export function validateUserProfile(data: UserData): UserProfileValidationError[] {
  const errors: UserProfileValidationError[] = [];

  if (!data.fullName || data.fullName.trim().length < 3) {
    errors.push({
      field: 'fullName',
      message: 'Informe um nome completo válido.',
    });
  }

  if (!data.email || !data.email.includes('@')) {
    errors.push({
      field: 'email',
      message: 'Informe um e-mail válido.',
    });
  }

  if (!data.cpf || data.cpf.replace(/\D/g, '').length < 11) {
    errors.push({
      field: 'cpf',
      message: 'Informe um CPF válido.',
    });
  }

  if (!data.phone || data.phone.replace(/\D/g, '').length < 10) {
    errors.push({
      field: 'phone',
      message: 'Informe um telefone válido.',
    });
  }

  if (!data.birthDate) {
    errors.push({
      field: 'birthDate',
      message: 'Informe a data de nascimento.',
    });
  }

  return errors;
}

/**
 * Atualiza o perfil mesclando o estado atual com os novos dados.
 * É uma função pura – ideal para ser usada dentro de reducers ou hooks.
 */
export function updateUserProfile(current: UserData, patch: Partial<UserData>): UserData {
  const merged: UserData = {
    ...current,
    ...patch,
  };

  return normalizeUserProfile(merged);
}

/**
 * Verifica se o perfil está "completo" o suficiente para checkout,
 * baseado em campos mínimos.
 */
export function isProfileReadyForCheckout(data: UserData): boolean {
  const normalized = normalizeUserProfile(data);
  const errors = validateUserProfile(normalized);

  // Poderia ser mais flexível (ex.: permitir BUY NOW sem CPF),
  // mas aqui exigimos tudo para mostrar que o fluxo está robusto.
  return errors.length === 0;
}
