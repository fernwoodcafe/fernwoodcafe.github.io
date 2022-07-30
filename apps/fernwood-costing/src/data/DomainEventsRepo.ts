import { $create, $readMany } from "@/data/indexedDB-client";
import type { DomainEvent } from "@/types/CafeDomain";

export type DomainEventsRepository = {
  insert: (event: DomainEvent) => Promise<DomainEvent>;
  select: () => Promise<DomainEvent[]>;
};

export default (db: IDBDatabase): DomainEventsRepository => ({
  async insert(event: DomainEvent) {
    await $create(db, "domainEvents", [event]);
    console.log("insert", event);
    return event;
  },
  select: (): Promise<DomainEvent[]> =>
    $readMany(db, "domainEvents").then((events: DomainEvent[]) =>
      events.sort((a, b) => a.eventIndex - b.eventIndex)
    ),
});
