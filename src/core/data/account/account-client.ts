import type { AddressData } from '@/core/types/address';
import type { UserData } from '@/core/types/user-data';

export interface AccountData {
  profile: UserData | null;
  address: AddressData | null;
}

interface AccountResponse {
  profile?: UserData;
  address?: AddressData;
  error?: string;
}

async function accountRequest(
  init?: RequestInit,
): Promise<AccountResponse> {
  const response = await fetch('/api/account', {
    ...init,
    headers: {
      'Content-Type': 'application/json',
      ...init?.headers,
    },
  });

  const body = (await response.json()) as AccountResponse;

  if (!response.ok) {
    throw new Error(
      body.error ?? 'Account request failed.',
    );
  }

  return body;
}

export async function loadAccountData(): Promise<AccountData> {
  const response = await accountRequest({
    method: 'GET',
  });

  return {
    profile: response.profile ?? null,
    address: response.address ?? null,
  };
}

export async function persistUserProfile(
  profile: UserData,
): Promise<UserData> {
  const response = await accountRequest({
    method: 'PATCH',
    body: JSON.stringify({
      profile,
    }),
  });

  if (!response.profile) {
    throw new Error(
      'Account profile response is missing.',
    );
  }

  return response.profile;
}

export async function persistAddress(
  address: AddressData,
): Promise<AddressData> {
  const response = await accountRequest({
    method: 'PATCH',
    body: JSON.stringify({
      address,
    }),
  });

  if (!response.address) {
    throw new Error(
      'Account address response is missing.',
    );
  }

  return response.address;
}
