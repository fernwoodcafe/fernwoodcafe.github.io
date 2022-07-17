import { $deleteDB, $migrateDB } from "@/data/indexedDB-client.js";

const resetPrototype = true;

export default async () => {
  if (resetPrototype) {
    $deleteDB("restaurantDB");
  }

  const db = await $migrateDB("restaurantDB", [
    {
      message: "introduce events",
      operations: [
        (db) => db.createObjectStore("domainEvents", { keyPath: "id" }),
      ],
    },
  ]);

  return db;
};
