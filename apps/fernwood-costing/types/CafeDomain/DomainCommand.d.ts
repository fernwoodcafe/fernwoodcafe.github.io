import { DomainCommandTypes } from "./DomainCommandTypes";

// TODO Make these into a discriminated union to aid type narrowing.

export type DomainCommand<T = any> = {
  type: DomainCommandTypes;
  payload: T;
  meta?: Record<string, any>;
};
