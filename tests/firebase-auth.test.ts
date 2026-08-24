import assert from 'node:assert/strict';
import test from 'node:test';

import type { User } from 'firebase/auth';

import { mapFirebaseUserToAuthUser } from '../src/core/auth/firebase-auth';

function createFirebaseUser(
  overrides: Partial<User> = {},
): User {
  return {
    uid: 'firebase-user-1',
    displayName: 'Maria Silva',
    email: 'maria@example.com',
    photoURL: 'https://example.com/avatar.jpg',
    emailVerified: true,
    providerData: [
      {
        providerId: 'password',
        uid: 'maria@example.com',
        displayName: 'Maria Silva',
        email: 'maria@example.com',
        phoneNumber: null,
        photoURL: null,
      },
    ],
    metadata: {
      creationTime: 'Sun, 23 Aug 2026 12:00:00 GMT',
      lastSignInTime: 'Sun, 23 Aug 2026 12:00:00 GMT',
    },
    ...overrides,
  } as User;
}

test('maps Firebase password user into application auth contract', () => {
  const result = mapFirebaseUserToAuthUser(createFirebaseUser());

  assert.deepEqual(result, {
    id: 'firebase-user-1',
    name: 'Maria Silva',
    email: 'maria@example.com',
    avatarUrl: 'https://example.com/avatar.jpg',
    provider: 'password',
    createdAt: 'Sun, 23 Aug 2026 12:00:00 GMT',
    emailVerified: true,
  });
});

test('maps Google Firebase provider correctly', () => {
  const user = createFirebaseUser({
    providerData: [
      {
        providerId: 'google.com',
        uid: 'google-user',
        displayName: 'Maria Google',
        email: 'maria@gmail.com',
        phoneNumber: null,
        photoURL: null,
      },
    ],
  });

  assert.equal(
    mapFirebaseUserToAuthUser(user).provider,
    'google',
  );
});

test('uses email identity when Firebase display name is absent', () => {
  const user = createFirebaseUser({
    displayName: null,
    email: 'fallback@example.com',
    photoURL: null,
  });

  const result = mapFirebaseUserToAuthUser(user);

  assert.equal(result.name, 'fallback');
  assert.equal(result.email, 'fallback@example.com');
  assert.equal(result.avatarUrl, undefined);
});
