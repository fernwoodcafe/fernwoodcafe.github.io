import { $create, $readMany } from "@/data/indexedDB-client";

export default (db: IDBDatabase) => ({
  async insert(event: CafeDomain.DomainEvent) {
    await $create(db, "domainEvents", [event]);
    console.log("insert", event);
    return event;
  },
  select: (): Promise<CafeDomain.DomainEvent[]> =>
    $readMany(db, "domainEvents").then((events: CafeDomain.DomainEvent[]) =>
      events.sort((a, b) => a.eventIndex - b.eventIndex)
    ),
});
