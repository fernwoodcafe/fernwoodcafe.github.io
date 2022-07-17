import { $create, $readMany } from "@/data/indexedDB-client";
import { DomainEvent } from "@/types/CafeDomain";

export default (db: IDBDatabase) => ({
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
