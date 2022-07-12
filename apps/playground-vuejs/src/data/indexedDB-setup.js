import { $createOrUpdate, $deleteDB, $migrateDB } from "./indexedDB-client.js";

export default async () => {
  if (true) {
    $deleteDB("restaurantDB"); // optional reset
  }

  const db = await $migrateDB("restaurantDB", [
    {
      message: "initial migration",
      operations: [(db) => db.createObjectStore("supplies", { keyPath: "id" })],
    },
  ]);

  await $createOrUpdate(db, "supplies", [
    {
      id: self.crypto.randomUUID(),
      supplyId: "3 ounce cups",
      unitSize: "cup",
      costPerUnitDollars: 10,
    },
    {
      id: self.crypto.randomUUID(),
      supplyId: "8 ounce cups",
      unitSize: "cup",
      costPerUnitDollars: 10,
    },
    {
      id: self.crypto.randomUUID(),
      supplyId: "12 ounce cups",
      unitSize: "cup",
      costPerUnitDollars: 20,
    },
    {
      id: self.crypto.randomUUID(),
      supplyId: "16 ounce cups",
      unitSize: "cup",
      costPerUnitDollars: 30,
    },
    {
      id: self.crypto.randomUUID(),
      supplyId: "espresso beans",
      unitSize: "grams",
      costPerUnitDollars: 10,
    },
  ]);

  return db;
};
