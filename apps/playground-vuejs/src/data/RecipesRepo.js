import { reactive } from "vue";
import { $createOrUpdate, $readMany, $readSingle } from "./indexedDB-client";

const recipesList = reactive({ items: [] });

export default (db) => ({
  async select() {
    $readMany(db, "recipes").then((items) => {
      recipesList.items.push(...items);
    });

    return recipesList;
  },
  async single(id) {
    const result = reactive({
      supplies: [{}],
    });

    $readSingle(db, "recipes", id).then((item) => {
      result.supplies = item.supplies;
    });

    return result;
  },
  insert(item) {
    recipesList.items = recipesList.items.slice().concat([item]);
    $createOrUpdate(db, "recipes", [item]);
  },
  update(item) {
    recipesList.items = recipesList.items.map((oldItem) =>
      oldItem.id == item.id ? item : oldItem
    );
    $createOrUpdate(db, "recipes", [item]);
  },
});
