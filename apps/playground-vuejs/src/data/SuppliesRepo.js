import { $readMany } from "./indexedDB-client";

let supplies = [
  {
    supplyId: "12 oz Cups",
    supplierId: "Green Munch",
  },
  {
    supplyId: "Espresso Beans",
    supplierId: "Drumroasters",
  },
];

export default (db) => ({
  select() {
    return $readMany(db, "supplies");
  },
  insert(supply) {
    supplies.push(supply);
  },
});
