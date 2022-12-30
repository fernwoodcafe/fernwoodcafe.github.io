export type Pipable<T> = {
  value: T;
  pipeInto: <U>(func: (x: T) => U) => U;
};

export const pipable = <T>(item: T): Pipable<T> => ({
  value: item,
  pipeInto: (func) => func(item),
});
