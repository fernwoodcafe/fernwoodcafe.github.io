export const $create = (db, objectStoreName, objects) =>
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

export const $read = async () => {};

export const $update = async () => {};

export const $delete = async () => {};

export const $migrateDB = (databaseName, schemaVersion, operations) =>
  new Promise((resolve, reject) => {
    const openDBRequest = indexedDB.open(databaseName, schemaVersion);

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

      operations.forEach((operation) => {
        const objectStore = operation(db);
        objectStore.transaction.oncomplete = (event) => {
          console.log("complete", event);
        };
      });
    };
  });

export const $deleteDB = (databaseName) => new Promise((resolve, reject) => {
  const request = indexedDB.deleteDatabase(databaseName);

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
