// https://developer.mozilla.org/en-US/docs/Web/API/IndexedDB_API/Using_IndexedDB

const $create = (db, objectStoreName, objects) =>
  new Promise((resolve, reject) => {
    console.log("$create");
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

      const objectStore = db.createObjectStore("supplies", { keyPath: "name" });

      objectStore.transaction.oncomplete = (event) => {
        console.log("complete", event);
      };
    };
  });

const db = await $migrate(1);

await $create(db, "supplies", [
  {
    name: "8 ounce cups",
    cost: 10
  },
  {
    name: "12 ounce cups",
    cost: 20
  },
  {
    name: "16 ounce cups",
    cost: 30
  },
]);
