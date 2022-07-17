import { $create } from "@/data/indexedDB-client";
/**
 * @param {IDBDatabase} db
 */
export default (db) => ({
  /**
   * @param {CafeDomain.DomainEvent} event
   */
  insert(event) {
    $create(db, "domainEvents", [event]);
    return event;
  },
});
