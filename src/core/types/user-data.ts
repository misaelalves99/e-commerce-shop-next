// src/core/types/user-data.ts

export type Gender =
  | ''
  | 'male'
  | 'female'
  | 'other'
  | 'prefer_not_to_say';

export interface UserData {
  id?: string;

  fullName: string;
  email: string;

  /** CPF usado apenas na experiência demonstrativa */
  cpf: string;

  birthDate: string;
  gender: Gender;
  phone: string;

  createdAt?: string;
  updatedAt?: string;
}
