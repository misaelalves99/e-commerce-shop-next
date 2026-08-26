import assert from 'node:assert/strict';
import test from 'node:test';

import {
  createSerializedWriter,
} from '../src/core/data/commerce/serialized-writer';

function deferred<T>() {
  let resolve:
    (value: T) => void =
      () => undefined;

  const promise =
    new Promise<T>(
      (promiseResolve) => {
        resolve =
          promiseResolve;
      },
    );

  return {
    promise,
    resolve,
  };
}

test(
  'serialized writer starts the next write only after the previous write settles',
  async () => {
    const first =
      deferred<number>();

    const second =
      deferred<number>();

    const started: number[] = [];

    const writer =
      createSerializedWriter<number>(
        async (value) => {
          started.push(value);

          if (value === 1) {
            return first.promise;
          }

          return second.promise;
        },
      );

    const firstWrite =
      writer.write(1);

    const secondWrite =
      writer.write(2);

    await Promise.resolve();

    assert.deepEqual(
      started,
      [1],
    );

    first.resolve(1);

    await firstWrite;
    await Promise.resolve();

    assert.deepEqual(
      started,
      [1, 2],
    );

    second.resolve(2);

    assert.equal(
      await secondWrite,
      2,
    );
  },
);

test(
  'serialized writer continues after a failed write',
  async () => {
    const started: number[] = [];

    const writer =
      createSerializedWriter<number>(
        async (value) => {
          started.push(value);

          if (value === 1) {
            throw new Error(
              'expected failure',
            );
          }

          return value;
        },
      );

    await assert.rejects(
      writer.write(1),
      /expected failure/,
    );

    assert.equal(
      await writer.write(2),
      2,
    );

    assert.deepEqual(
      started,
      [1, 2],
    );
  },
);
