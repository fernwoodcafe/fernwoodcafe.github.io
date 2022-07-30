import type { DomainEvent } from "@/types/CafeDomain";

export type DomainEventsRepository = {
  insert: (event: DomainEvent) => Promise<DomainEvent>;
  select: () => Promise<DomainEvent[]>;
};
