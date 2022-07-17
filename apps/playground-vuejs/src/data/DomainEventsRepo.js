import { $create, $readMany } from "@/data/indexedDB-client";
/**
 * @param {IDBDatabase} db
 */
export default (db) => ({
  /**
   * @param {CafeDomain.DomainEvent<any>} event
   */
  async insert(event) {
    await $create(db, "domainEvents", [event]);
    console.log("insert", event);
    return event;
  },
  /**
   * @returns {Promise<CafeDomain.DomainEvent<CafeDomain.DomainEvent>[]>}
   */
  select: () =>
    $readMany(db, "domainEvents").then((events) =>
      events.sort((a, b) => a.eventIndex < b.eventIndex)
    ),
});
