// TODO Make these into a discriminated union to aid type narrowing.

import type { DomainCommandTypes } from "./DomainCommandTypes";

export type DomainCommand<T = any> = {
  type: DomainCommandTypes;
  payload: T;
  meta?: Record<string, any>;
};
