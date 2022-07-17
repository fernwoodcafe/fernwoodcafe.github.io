import {
  $createOrUpdate,
  $readMany,
  $readSingle,
} from "@/data/indexedDB-client";
import { reactive } from "vue";

const menuItemsList = reactive({ items: [] });

/**
 * @param {IDBDatabase} db
 */
export default (db) => ({
  /**
   * @returns {Promise<ReactiveArray<CafeDomain.MenuItem>>}
   */
  async select() {
    const menuItems = await $readMany(db, "menuItems");
    menuItemsList.items.push(...menuItems);
    return menuItemsList;
  },
  /**
   * @param {string} id
   * @returns {Promise<CafeDomain.MenuItem>}
   */
  async single(id) {
    var recipe = await $readSingle(db, "menuItems", id);
    return reactive(recipe);
  },
  /**
   * @param {CafeDomain.MenuItem} item
   */
  insert(item) {
    menuItemsList.items = menuItemsList.items.slice().concat([item]);
    $createOrUpdate(db, "menuItems", [item]);
  },
  /**
   * @param {CafeDomain.MenuItem} item
   */
  update(item) {
    console.log("update", item);

    menuItemsList.items = menuItemsList.items.map((oldItem) =>
      oldItem.id == item.id ? item : oldItem
    );
    $createOrUpdate(db, "menuItems", [item]);
  },
});
