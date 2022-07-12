import { reactive } from "vue";
import { $createOrUpdate, $readMany } from "./indexedDB-client";

const suppliesList = reactive({ items: [] });

export default (db) => ({
  async select() {
    $readMany(db, "supplies").then((items) => {
      suppliesList.items.push(...items);
    });

    return suppliesList;
  },
  insert(item) {
    suppliesList.items = suppliesList.items.slice().concat([item]);
    $createOrUpdate(db, "supplies", [item]);
  },
  update(item) {
    suppliesList.items = suppliesList.items.map((oldItem) =>
      oldItem.id == item.id ? item : oldItem
    );
    $createOrUpdate(db, "supplies", [item]);
  },
});
