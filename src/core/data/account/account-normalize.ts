import type { AddressData } from '@/core/types/address';
import type {
  Gender,
  UserData,
} from '@/core/types/user-data';

const GENDERS: readonly Gender[] = [
  '',
  'male',
  'female',
  'other',
  'prefer_not_to_say',
];

function isRecord(
  value: unknown,
): value is Record<string, unknown> {
  return (
    typeof value === 'object' &&
    value !== null &&
    !Array.isArray(value)
  );
}

function requiredString(
  record: Record<string, unknown>,
  key: string,
): string | null {
  const value = record[key];

  return typeof value === 'string'
    ? value
    : null;
}

function optionalString(
  record: Record<string, unknown>,
  key: string,
): string | undefined | null {
  const value = record[key];

  if (value === undefined) {
    return undefined;
  }

  return typeof value === 'string'
    ? value
    : null;
}

function optionalBoolean(
  record: Record<string, unknown>,
  key: string,
): boolean | undefined | null {
  const value = record[key];

  if (value === undefined) {
    return undefined;
  }

  return typeof value === 'boolean'
    ? value
    : null;
}

export function normalizeUserProfile(
  value: unknown,
): UserData | null {
  if (!isRecord(value)) {
    return null;
  }

  const fullName =
    requiredString(value, 'fullName');

  const email =
    requiredString(value, 'email');

  const cpf =
    requiredString(value, 'cpf');

  const birthDate =
    requiredString(value, 'birthDate');

  const genderValue =
    requiredString(value, 'gender');

  const phone =
    requiredString(value, 'phone');

  if (
    fullName === null ||
    email === null ||
    cpf === null ||
    birthDate === null ||
    genderValue === null ||
    phone === null ||
    !GENDERS.includes(
      genderValue as Gender,
    )
  ) {
    return null;
  }

  return {
    fullName,
    email,
    cpf,
    birthDate,
    gender:
      genderValue as Gender,
    phone,
  };
}

export function normalizeAddress(
  value: unknown,
): AddressData | null {
  if (!isRecord(value)) {
    return null;
  }

  const fullName =
    requiredString(value, 'fullName');

  const phone =
    requiredString(value, 'phone');

  const zipCode =
    requiredString(value, 'zipCode');

  const street =
    requiredString(value, 'street');

  const number =
    requiredString(value, 'number');

  const district =
    requiredString(value, 'district');

  const city =
    requiredString(value, 'city');

  const state =
    requiredString(value, 'state');

  const label =
    optionalString(value, 'label');

  const complement =
    optionalString(
      value,
      'complement',
    );

  const reference =
    optionalString(
      value,
      'reference',
    );

  const country =
    optionalString(
      value,
      'country',
    );

  const isDefault =
    optionalBoolean(
      value,
      'isDefault',
    );

  if (
    fullName === null ||
    phone === null ||
    zipCode === null ||
    street === null ||
    number === null ||
    district === null ||
    city === null ||
    state === null ||
    label === null ||
    complement === null ||
    reference === null ||
    country === null ||
    isDefault === null
  ) {
    return null;
  }

  return {
    fullName,
    phone,
    zipCode,
    street,
    number,
    district,
    city,
    state,
    ...(label !== undefined
      ? { label }
      : {}),
    ...(complement !== undefined
      ? { complement }
      : {}),
    ...(reference !== undefined
      ? { reference }
      : {}),
    ...(country !== undefined
      ? { country }
      : {}),
    ...(isDefault !== undefined
      ? { isDefault }
      : {}),
  };
}
