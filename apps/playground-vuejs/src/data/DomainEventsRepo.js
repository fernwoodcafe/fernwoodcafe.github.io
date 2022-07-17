import { $create, $readMany } from "@/data/indexedDB-client";
/**
 * @param {IDBDatabase} db
 */
export default (db) => ({
  /**
   * @param {CafeDomain.DomainEvent} event
   */
  async insert(event) {
    await $create(db, "domainEvents", [event]);
    console.log("insert", event);
    return event;
  },
  /**
   * @returns {Promise<CafeDomain.DomainEvent[]>}
   */
  select: () => $readMany(db, "domainEvents"),
});
