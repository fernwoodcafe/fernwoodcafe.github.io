import type { DomainEvent } from "./DomainEvent";

export const emits = ["onSaved", "onQueued"] as const;
export type Emits = typeof emits[number];

export type DomainEventsRepository = {
  insert: (event: DomainEvent) => Promise<DomainEvent>;
  select: () => Promise<DomainEvent[]>;
  addListener: (name: Emits, listener: EventListener) => EventListener;
};
