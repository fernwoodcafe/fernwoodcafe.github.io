import type { DomainEvent } from "./DomainEvent";

export type DomainEventsRepository = {
  insert: (event: DomainEvent) => Promise<DomainEvent>;
  select: () => Promise<DomainEvent[]>;
};
