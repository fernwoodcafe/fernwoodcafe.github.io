import { $createOrUpdate, $migrateDB } from "./indexedDB-client.js";

export default async () => {
  const db = await $migrateDB("restaurantDB", [
    {
      message: "initial migration",
      operations: [
        (db) => db.createObjectStore("supplies", { keyPath: "supplyId" }),
        (db) => db.createObjectStore("recipes", { keyPath: "recipeId" }),
      ],
    },
  ]);

  await $createOrUpdate(db, "supplies", [
    {
      supplyId: "3 ounce cups",
      unitSize: "cup",
      costPerUnitDollars: 10,
    },
    {
      supplyId: "8 ounce cups",
      unitSize: "cup",
      costPerUnitDollars: 10,
    },
    {
      supplyId: "12 ounce cups",
      unitSize: "cup",
      costPerUnitDollars: 20,
    },
    {
      supplyId: "16 ounce cups",
      unitSize: "cup",
      costPerUnitDollars: 30,
    },
    {
      supplyId: "espresso beans",
      unitSize: "grams",
      costPerUnitDollars: 10,
    },
  ]);

  return db;
};
