import {
  $createOrUpdate,
  $readMany,
  $readSingle,
} from "@/data/indexedDB-client";
import { reactive } from "vue";

const recipesList = reactive({ items: [] });

/**
 * @param {IDBDatabase} db
 */
export default (db) => ({
  /**
   * @returns {Promise<ReactiveArray<CafeRecipe>>}
   */
  async select() {
    const recipes = await $readMany(db, "recipes");
    recipesList.items.push(...recipes);
    return recipesList;
  },
  /**
   * @param {string} id
   * @returns {Promise<CafeRecipe>}
   */
  async single(id) {
    var recipe = await $readSingle(db, "recipes", id);
    return reactive(recipe);
  },
  /**
   * @param {CafeRecipe} item
   */
  insert(item) {
    recipesList.items = recipesList.items.slice().concat([item]);
    $createOrUpdate(db, "recipes", [item]);
  },
  /**
   * @param {CafeRecipe} item
   */
  update(item) {
    recipesList.items = recipesList.items.map((oldItem) =>
      oldItem.id == item.id ? item : oldItem
    );
    $createOrUpdate(db, "recipes", [item]);
  },
});
