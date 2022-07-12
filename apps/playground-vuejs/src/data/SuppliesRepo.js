import { $createOrUpdate, $readMany } from "@/data/indexedDB-client";
import { reactive } from "vue";

const suppliesList = reactive({ items: [] });

/**
 * @param {IDBDatabase} db
 */
export default (db) => ({
  /**
   * @returns {Promise<ReactiveArray<CafeSupply>>}
   */
  async select() {
    const supplies = await $readMany(db, "supplies");
    suppliesList.items.push(...supplies);
    return suppliesList;
  },
  /**
   * @param {CafeSupply} item
   */
  insert(item) {
    suppliesList.items = suppliesList.items.slice().concat([item]);
    $createOrUpdate(db, "supplies", [item]);
  },
  /**
   * @param {CafeSupply} item
   */
  update(item) {
    suppliesList.items = suppliesList.items.map((oldItem) =>
      oldItem.id == item.id ? item : oldItem
    );
    $createOrUpdate(db, "supplies", [item]);
  },
});
