import assert from 'node:assert/strict';
import test from 'node:test';

import {
  normalizeAddress,
  normalizeUserProfile,
} from '../src/core/data/account/account-normalize';

test(
  'normalizeUserProfile accepts the supported profile contract',
  () => {
    assert.deepEqual(
      normalizeUserProfile({
        fullName: 'Test User',
        email:
          'test@example.com',
        cpf: '123',
        birthDate:
          '2000-01-01',
        gender: 'other',
        phone: '11999999999',
      }),
      {
        fullName: 'Test User',
        email:
          'test@example.com',
        cpf: '123',
        birthDate:
          '2000-01-01',
        gender: 'other',
        phone: '11999999999',
      },
    );
  },
);

test(
  'normalizeUserProfile rejects invalid field types and gender values',
  () => {
    assert.equal(
      normalizeUserProfile({
        fullName: 'Test User',
        email:
          'test@example.com',
        cpf: '123',
        birthDate:
          '2000-01-01',
        gender:
          'unsupported',
        phone: '11999999999',
      }),
      null,
    );

    assert.equal(
      normalizeUserProfile({
        fullName: 123,
        email:
          'test@example.com',
        cpf: '123',
        birthDate:
          '2000-01-01',
        gender: 'male',
        phone: '11999999999',
      }),
      null,
    );
  },
);

test(
  'normalizeUserProfile strips server-owned and unknown fields',
  () => {
    const result =
      normalizeUserProfile({
        id: 'attacker-id',
        createdAt: 'fake',
        updatedAt: 'fake',
        admin: true,
        fullName: 'Test User',
        email:
          'test@example.com',
        cpf: '123',
        birthDate:
          '2000-01-01',
        gender: 'female',
        phone: '11999999999',
      });

    assert.deepEqual(
      result,
      {
        fullName: 'Test User',
        email:
          'test@example.com',
        cpf: '123',
        birthDate:
          '2000-01-01',
        gender: 'female',
        phone: '11999999999',
      },
    );
  },
);

test(
  'normalizeAddress accepts supported optional address fields',
  () => {
    assert.deepEqual(
      normalizeAddress({
        fullName: 'Receiver',
        phone: '11999999999',
        zipCode: '01001-000',
        street: 'Street',
        number: '10',
        district: 'Center',
        city: 'City',
        state: 'SP',
        complement: 'Apt 1',
        reference: 'Square',
        country: 'BR',
        label: 'Home',
        isDefault: false,
      }),
      {
        fullName: 'Receiver',
        phone: '11999999999',
        zipCode: '01001-000',
        street: 'Street',
        number: '10',
        district: 'Center',
        city: 'City',
        state: 'SP',
        complement: 'Apt 1',
        reference: 'Square',
        country: 'BR',
        label: 'Home',
        isDefault: false,
      },
    );
  },
);

test(
  'normalizeAddress rejects malformed required or optional fields',
  () => {
    assert.equal(
      normalizeAddress({
        fullName: 'Receiver',
        phone: '11999999999',
        zipCode: '01001-000',
        street: 'Street',
        number: '10',
        district: 'Center',
        city: 'City',
        state: 123,
      }),
      null,
    );

    assert.equal(
      normalizeAddress({
        fullName: 'Receiver',
        phone: '11999999999',
        zipCode: '01001-000',
        street: 'Street',
        number: '10',
        district: 'Center',
        city: 'City',
        state: 'SP',
        isDefault: 'yes',
      }),
      null,
    );
  },
);

test(
  'normalizeAddress strips server-owned and unknown fields',
  () => {
    const result =
      normalizeAddress({
        id: 'forged',
        createdAt: 'fake',
        updatedAt: 'fake',
        arbitrary: 'value',
        fullName: 'Receiver',
        phone: '11999999999',
        zipCode: '01001-000',
        street: 'Street',
        number: '10',
        district: 'Center',
        city: 'City',
        state: 'SP',
      });

    assert.deepEqual(
      result,
      {
        fullName: 'Receiver',
        phone: '11999999999',
        zipCode: '01001-000',
        street: 'Street',
        number: '10',
        district: 'Center',
        city: 'City',
        state: 'SP',
      },
    );
  },
);
