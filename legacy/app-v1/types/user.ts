export interface User {
  fullName: string;
  email: string;
  password: string;
}

export interface UserData {
  fullName: string;
  cpf: string;
  birthDate: string;
  gender: string;
  phone: string;
  email: string;
}

export interface PasswordFormData {
  currentPassword: string;
  newPassword: string;
  confirmNewPassword: string;
}
