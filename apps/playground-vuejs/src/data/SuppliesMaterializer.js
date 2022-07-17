import { $readMany } from "@/data/indexedDB-client";
import { reactive } from "vue";

const suppliesList = reactive({ items: [] });

/**
 * @param {IDBDatabase} db
 */
export default (db) => ({
  /**
   * @returns {Promise<ReactiveArray<CafeDomain.MenuItemSupply>>}
   */
  async select() {
    const supplies = await $readMany(db, "supplies");
    suppliesList.items.push(...supplies);
    return suppliesList;
  },
  /**
   * @param {CafeDomain.DomainEvent} event
   */
  materialize(event) {
    if (event.type == "NEW_SUPPLY_CREATED") {
      suppliesList.items.push(event.payload);
    }

    if (event.type == "SUPPLY_UPDATED") {
      suppliesList.items = suppliesList.items.map((oldItem) =>
        oldItem.id == event.payload.id ? event.payload : oldItem
      );
    }
  },
});
