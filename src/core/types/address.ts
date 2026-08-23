// src/core/types/address.ts

export interface AddressData {
  id?: string;
  label?: string;

  fullName: string;
  phone: string;

  zipCode: string;
  street: string;
  number: string;
  complement?: string;
  district: string;
  city: string;
  state: string;

  reference?: string;
  country?: string;

  isDefault?: boolean;

  createdAt?: string;
  updatedAt?: string;
}
