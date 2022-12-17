import type { DomainEvent } from "./DomainEvent";

export const emits = [
  "onClientDomainEventSaved",
  "onClientDomainEventQueued",
  "onServerDomainEventArrived"
] as const;
export type RepositoryEmits = typeof emits[number];

export type DomainEventsRepository = {
  insert: (event: DomainEvent) => Promise<DomainEvent>;
  select: () => Promise<DomainEvent[]>;
  addListener: (name: RepositoryEmits, listener: EventListener) => EventListener;
};
