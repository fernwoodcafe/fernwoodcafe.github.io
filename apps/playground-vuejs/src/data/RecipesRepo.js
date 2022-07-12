import { reactive } from "vue";
import { $createOrUpdate, $readMany, $readSingle } from "./indexedDB-client";

const recipesList = reactive({ items: [] });

/** @param {IDBDatabase} db */
export default (db) => ({
  async select() {
    $readMany(db, "recipes").then((items) => {
      recipesList.items.push(...items);
    });

    return recipesList;
  },
  /**
   * @param {string} id
   * @returns {Promise<Recipe>}
   */
  async single(id) {
    const result = reactive({
      recipeId: "",
      supplies: [{}],
    });

    $readSingle(db, "recipes", id).then((item) => {
      result.supplies = item.supplies;
    });

    return result;
  },
  /**
   * @param {any} item
   */
  insert(item) {
    recipesList.items = recipesList.items.slice().concat([item]);
    $createOrUpdate(db, "recipes", [item]);
  },
  /**
   * @param {{ id: any; }} item
   */
  update(item) {
    recipesList.items = recipesList.items.map((oldItem) =>
      oldItem.id == item.id ? item : oldItem
    );
    $createOrUpdate(db, "recipes", [item]);
  },
});
