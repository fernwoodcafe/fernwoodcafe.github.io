// https://developer.mozilla.org/en-US/docs/Web/API/IndexedDB_API/Using_IndexedDB

const $create = (db, objectStoreName, objects) =>
  new Promise((resolve, reject) => {
    console.log("$create", objectStoreName);
    const transaction = db.transaction(objectStoreName, "readwrite");
    // Do something when all the data is added to the database.
    transaction.oncomplete = (event) => {
      console.log("complete", event);
      resolve();
    };

    transaction.onerror = (event) => {
      console.log("error", event);
      reject();
    };

    const objectStore = transaction.objectStore(objectStoreName);
    objects.forEach(function (obj) {
      const request = objectStore.add(obj);
      request.onsuccess = (event) => {
        console.log("success", event);
      };
    });
  });

const $read = async () => {};

const $update = async () => {};

const $delete = async () => {};

const $migrate = (schemaVersion) =>
  new Promise((resolve, reject) => {
    const openDBRequest = indexedDB.open("restaurantDB", schemaVersion);

    openDBRequest.onerror = (event) => {
      console.log("error", event);
      reject();
    };

    openDBRequest.onsuccess = (event) => {
      console.log("success", event);
      const db = event.target.result;
      resolve(db);
    };

    openDBRequest.onupgradeneeded = (event) => {
      console.log("upgradeneeded", event);

      const db = event.target.result;

      [
        db.createObjectStore("supplies", { keyPath: "supplyId" }),
        db.createObjectStore("recipes", { keyPath: "recipeId" }),
      ].forEach((objectStore) => {
        objectStore.transaction.oncomplete = (event) => {
          console.log("complete", event);
        };
      });
    };
  });

await new Promise((resolve, reject) => {
  const request = indexedDB.deleteDatabase("restaurantDB");

  request.onsuccess = (event) => {
    console.log("success", event);
    resolve();
  };

  request.onerror = (event) => {
    console.log("error", event);
    reject();
  };

  request.onblocked = (event) => {
    console.log("blocked", event);
    reject();
  };
});

const db = await $migrate(1);

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
