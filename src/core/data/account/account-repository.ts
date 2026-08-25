import 'server-only';

import {
  FieldValue,
  type DocumentData,
} from 'firebase-admin/firestore';

import { getFirebaseAdminFirestore } from '@/core/lib/firebase/admin/firebase-admin';
import type { AddressData } from '@/core/types/address';
import type { UserData } from '@/core/types/user-data';

export interface AccountData {
  profile: UserData | null;
  address: AddressData | null;
}

const USERS_COLLECTION = 'users';

function accountDocument(uid: string) {
  return getFirebaseAdminFirestore()
    .collection(USERS_COLLECTION)
    .doc(uid);
}

function normalizeDocumentData(
  data: DocumentData | undefined,
): AccountData {
  if (!data) {
    return {
      profile: null,
      address: null,
    };
  }

  return {
    profile:
      data.profile && typeof data.profile === 'object'
        ? (data.profile as UserData)
        : null,
    address:
      data.address && typeof data.address === 'object'
        ? (data.address as AddressData)
        : null,
  };
}

export async function getAccountData(
  uid: string,
): Promise<AccountData> {
  const snapshot = await accountDocument(uid).get();

  if (!snapshot.exists) {
    return {
      profile: null,
      address: null,
    };
  }

  return normalizeDocumentData(snapshot.data());
}

export async function saveUserProfile(
  uid: string,
  profile: UserData,
): Promise<UserData> {
  const normalizedProfile: UserData = {
    ...profile,
    id: uid,
    updatedAt: new Date().toISOString(),
  };

  await accountDocument(uid).set(
    {
      profile: normalizedProfile,
      updatedAt: FieldValue.serverTimestamp(),
    },
    {
      merge: true,
    },
  );

  return normalizedProfile;
}

export async function saveAddress(
  uid: string,
  address: AddressData,
): Promise<AddressData> {
  const normalizedAddress: AddressData = {
    ...address,
    id: address.id ?? 'default',
    isDefault: address.isDefault ?? true,
    updatedAt: new Date().toISOString(),
  };

  await accountDocument(uid).set(
    {
      address: normalizedAddress,
      updatedAt: FieldValue.serverTimestamp(),
    },
    {
      merge: true,
    },
  );

  return normalizedAddress;
}
