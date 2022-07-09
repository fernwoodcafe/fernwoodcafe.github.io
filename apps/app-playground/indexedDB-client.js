export const $create = (db, objectStoreName, objects) =>
  new Promise((resolve, reject) => {
    console.log("$create", objectStoreName);
    const transaction = db.transaction(objectStoreName, "readwrite");

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

export const $update = (db, objectStoreName, objects) =>
  new Promise((resolve, reject) => {
    console.log("$update", objectStoreName);
    const transaction = db.transaction(objectStoreName, "readwrite");

    transaction.oncomplete = (event) => {
      console.log("complete", event);
      resolve();
    };

    transaction.onerror = (event) => {
      console.log("error", event);
      reject();
    };

    const objectStore = transaction.objectStore(objectStoreName);
    objects.forEach((obj) => {
      const request = objectStore.put(obj);
      request.onsuccess = (event) => {
        console.log("success", event);
      };
    });
  });

export const $createOrUpdate = (db, objectStoreName, objects) =>
  new Promise((resolve, reject) => {
    console.log("$createOrUpdate", objectStoreName);
    const transaction = db.transaction(objectStoreName, "readwrite");
    const objectStore = transaction.objectStore(objectStoreName);

    transaction.oncomplete = (event) => {
      console.log("complete", event);
      resolve();
    };

    transaction.onerror = (event) => {
      console.log("error", event);
      reject();
    };

    const keyPath = objectStore.keyPath;
    objects.forEach((obj) => {
      const keyValue = obj[keyPath];
      const readRequest = objectStore.get(keyValue);
      readRequest.onsuccess = function (event) {
        console.log("success", event, objectStoreRequest);
        const result = objectStoreRequest.result;
        resolve(result);
      };

      readRequest.onsuccess = (event) => {
        const result = readRequest.result;
        if (result) {
          const updateRequest = objectStore.put(obj);
          updateRequest.onsuccess = (event) => {
            console.log("success", event);
          };
        } else {
          const createRequest = objectStore.add(obj);
          createRequest.onsuccess = (event) => {
            console.log("success", event);
          };
        }
      };
    });
  });

export const $read = (db, objectStoreName, key) =>
  new Promise((resolve, reject) => {
    console.log("$read", objectStoreName);
    const transaction = db.transaction(objectStoreName, "readonly");
    const objectStore = transaction.objectStore(objectStoreName);
    const objectStoreRequest = objectStore.get(key);

    objectStoreRequest.onsuccess = function (event) {
      console.log("success", event, objectStoreRequest);
      const result = objectStoreRequest.result;
      resolve(result);
    };

    objectStoreRequest.onerror = function (event) {
      console.log("error", event);
      reject(event);
    };
  });

export const $delete = () => {};

export const $migrateDB = (databaseName, migrations) =>
  new Promise(async (resolve, reject) => {
    const databases = await indexedDB.databases();
    const findResult = databases.find((x) => x.name == databaseName);
    const currentVersion = findResult == null ? 0 : findResult.version;

    const openDBRequest = indexedDB.open(databaseName, migrations.length);

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

      migrations.slice(currentVersion).forEach((migration) => {
        console.log(`running migration '${migration.message}`);
        migration.operations.forEach((operation) => {
          const objectStore = operation(db);
          if (!objectStore) {
            return;
          }

          objectStore.transaction.oncomplete = (event) => {
            console.log("complete", event);
          };
        });
      });
    };
  });

export const $deleteDB = (databaseName) =>
  new Promise((resolve, reject) => {
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
