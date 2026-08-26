export interface SerializedWriter<T> {
  write: (value: T) => Promise<T>;
}

export function createSerializedWriter<T>(
  persist: (value: T) => Promise<T>,
): SerializedWriter<T> {
  let queue: Promise<void> =
    Promise.resolve();

  return {
    write(value: T): Promise<T> {
      const operation =
        queue.then(() => persist(value));

      queue =
        operation.then(
          () => undefined,
          () => undefined,
        );

      return operation;
    },
  };
}
