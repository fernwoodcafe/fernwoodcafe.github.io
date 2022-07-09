import { $createOrUpdate, $migrateDB, $readMany } from "./indexedDB-client.js";

// $deleteDB("restaurantDB"); // optional reset

const db = await $migrateDB("restaurantDB", [
  {
    message: "initial migration",
    operations: [
      (db) => db.createObjectStore("supplies", { keyPath: "supplyId" }),
      (db) => db.createObjectStore("recipes", { keyPath: "recipeId" }),
    ],
  },
  {
    message: "introduce schedules",
    operations: [
      (db) => db.createObjectStore("schedule", { keyPath: "scheduleId" }),
    ],
  },
  {
    message: "fix schedules type by pluralizing",
    operations: [
      (db) => db.deleteObjectStore("schedule"),
      (db) => db.createObjectStore("schedules", { keyPath: "scheduleId" }),
    ],
  },
]);

await $createOrUpdate(db, "schedules", [
  {
    scheduleId: "2022-Jan",
  },
  {
    scheduleId: "2022-Feb",
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

await $createOrUpdate(db, "recipes", [
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

// TODO Do this in something like React.

const app = document.getElementById("app");
$readMany(db, "recipes").then((results) => {
  app.insertAdjacentHTML("beforebegin", `<h1>Recipes</h1>`);
  results.forEach((result) => {
    app.insertAdjacentHTML("beforebegin", `<p>${result.recipeId}</p>`);
  });
});
$readMany(db, "supplies").then((results) => {
  app.insertAdjacentHTML("beforebegin", `<h1>Supplies</h1>`);
  results.forEach((result) => {
    app.insertAdjacentHTML("beforebegin", `<p>${result.supplyId}</p>`);
  });
});
$readMany(db, "schedules").then((results) => {
  app.insertAdjacentHTML("beforebegin", `<h1>Schedules</h1>`);
  results.forEach((result) => {
    app.insertAdjacentHTML("beforebegin", `<p>${result.scheduleId}</p>`);
  });
});
