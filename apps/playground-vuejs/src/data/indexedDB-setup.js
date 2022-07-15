import {
  $createOrUpdate,
  $deleteDB,
  $migrateDB,
} from "@/data/indexedDB-client.js";

const resetPrototype = false;

export default async () => {
  if (resetPrototype) {
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

  if (resetPrototype) {
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
      {
        id: self.crypto.randomUUID(),
        supplyId: "Espresso Beans",
        unitSize: "grams",
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
            unitQuantity: 0,
          },
        ],
        ingredients: [
          {
            id: self.crypto.randomUUID(),
            supplyId: "Espresso Beans",
            unitQuantity: 0,
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
            unitQuantity: 0,
          },
        ],
        ingredients: [
          {
            id: self.crypto.randomUUID(),
            supplyId: "Espresso Beans",
            unitQuantity: 0,
          },
        ],
      },
    ]);
  }

  return db;
};
