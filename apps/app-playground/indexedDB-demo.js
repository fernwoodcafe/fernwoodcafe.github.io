import { $create, $deleteDB, $migrateDB } from "./indexedDB-client.js";

$deleteDB("restaurantDB"); // optional reset

const db = await $migrateDB("restaurantDB", 1, [
    db => db.createObjectStore("supplies", { keyPath: "supplyId" }),
    db => db.createObjectStore("recipes", { keyPath: "recipeId" }),
]);

await $create(db, "supplies", [
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

await $create(db, "recipes", [
  {
    recipeId: "espresso",
    components: [
      {
        supplyId: "3 ounce cup",
        unitQuantity: 1,
      },
      {
        supplyId: "espresso beans",
        unitQuantity: 18.5,
      },
    ],
  },
]);