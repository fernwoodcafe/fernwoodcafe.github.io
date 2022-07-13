import {
  $createOrUpdate,
  $deleteDB,
  $migrateDB,
} from "@/data/indexedDB-client.js";

const reset = true;

export default async () => {
  if (reset) {
    $deleteDB("restaurantDB");
  }

  const db = await $migrateDB("restaurantDB", [
    {
      message: "initial migration",
      operations: [
        (db) => db.createObjectStore("supplies", { keyPath: "id" }),
        (db) => db.createObjectStore("menuItems", { keyPath: "id" }),
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

    await $createOrUpdate(db, "menuItems", [
      {
        id: self.crypto.randomUUID(),
        menuItemId: "Espresso",
        packaging: [
          {
            id: self.crypto.randomUUID(),
            supplyId: "3 ounce cups",
          },
        ],
        ingredients: [
          {
            id: self.crypto.randomUUID(),
            supplyId: "espressoBeans",
          },
        ],
      },
      {
        id: self.crypto.randomUUID(),
        menuItemId: "Americano",
        packaging: [
          {
            id: self.crypto.randomUUID(),
            supplyId: "8 ounce cups",
          },
        ],
        ingredients: [
          {
            id: self.crypto.randomUUID(),
            supplyId: "espressoBeans",
          },
        ],
      },
    ]);
  }

  return db;
};
