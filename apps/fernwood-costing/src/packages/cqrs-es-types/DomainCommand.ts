// TODO Make these into a discriminated union to aid type narrowing.

import type { CafeCommandTypes } from "../domain/types/CafeCommandTypes";

export type DomainCommand<T = any> = {
  type: CafeCommandTypes;
  payload: T;
  meta?: Record<string, any>;
};
