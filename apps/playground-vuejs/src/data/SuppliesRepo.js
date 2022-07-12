import { $createOrUpdate, $readMany } from "@/data/indexedDB-client";
import { reactive } from "vue";

const suppliesList = reactive({ items: [] });

export default (db) => ({
  async select() {
    await $readMany(db, "supplies").then((items) => {
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
