export default [
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
];
