import { $deleteDB, $migrateDB } from "@/data/indexedDB-client.js";

const resetPrototype = false;

export default async (): Promise<IDBDatabase> => {
  if (resetPrototype) {
    $deleteDB("restaurantDB");
  }

  const db = await $migrateDB("restaurantDB", [
    {
      message: "introduce events",
      operations: [
        (db) =>
          db.createObjectStore("domainEvents", {
            keyPath: "eventIndex",
            autoIncrement: true,
          }),
      ],
    },
  ]);

  return db;
};
