import { $create, $readMany } from "@/data/indexedDB-client";
import migrateDB from "@/data/indexedDB-migrate";
import type { DomainEvent, DomainEventsRepository } from "@/types/CafeDomain";

const db = await migrateDB();

export default (): DomainEventsRepository => ({
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
