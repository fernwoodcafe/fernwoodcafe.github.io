import { $createOrUpdate, $readMany } from "./indexedDB-client";

export default (db) => ({
  async select() {
    return $readMany(db, "supplies");
  },
  insertOrUpdate(supply) {
    $createOrUpdate(db, "supplies", [supply]);
  },
});
