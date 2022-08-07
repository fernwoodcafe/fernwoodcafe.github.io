// TODO Make these into a discriminated union to aid type narrowing.

import type { DomainCommandTypes } from "../domain/types/CafeCommands";

export type DomainCommand<T = any> = {
  type: DomainCommandTypes;
  payload: T;
  meta?: Record<string, any>;
};
