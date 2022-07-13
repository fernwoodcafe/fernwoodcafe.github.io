import {
  $createOrUpdate,
  $deleteDB,
  $migrateDB,
} from "@/data/indexedDB-client.js";

const reset = false;

export default async () => {
  if (reset) {
    $deleteDB("restaurantDB");
  }

  const db = await $migrateDB("restaurantDB", [
    {
      message: "initial migration",
      operations: [
        (db) => db.createObjectStore("supplies", { keyPath: "id" }),
        (db) => db.createObjectStore("recipes", { keyPath: "id" }),
      ],
    },
  ]);

  if (reset) {
    await $createOrUpdate(db, "supplies", [
      {
        id: self.crypto.randomUUID(),
        supplyId: "3 ounce cups",
        unitSize: "cup",
        unitCost: 10,
      },
      {
        id: self.crypto.randomUUID(),
        supplyId: "8 ounce cups",
        unitSize: "cup",
        unitCost: 10,
      },
    ]);

    await $createOrUpdate(db, "recipes", [
      {
        id: self.crypto.randomUUID(),
        recipeId: "Espresso",
        supplies: [
          {
            id: self.crypto.randomUUID(),
            supplyId: "3 ounce cups",
          },
        ],
      },
      {
        id: self.crypto.randomUUID(),
        recipeId: "Americano",
        supplies: [
          {
            id: self.crypto.randomUUID(),
            supplyId: "8 ounce cups",
          },
        ],
      },
    ]);
  }

  return db;
};
