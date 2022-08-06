// TODO Make these into a discriminated union to aid type narrowing.

import type { DomainEventTypes } from "./DomainEventTypes";

export type DomainEvent<T = any> = {
  eventIndex?: number; // autoincremented
  type: DomainEventTypes;
  payload: T;
  meta?: Record<string, any>;
};
