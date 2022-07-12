/**
 * @param {IDBDatabase} db
 * @param {string} objectStoreName
 * @param {object[]} objects
 */
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
    objects.forEach((obj) => {
      const request = objectStore.add(obj);
      request.onsuccess = (event) => {
        console.log("success", event);
      };
    });
  });

/**
 * @param {IDBDatabase} db
 * @param {string} objectStoreName
 * @param {object[]} objects
 */
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

/**
 * @param {IDBDatabase} db
 * @param {string} objectStoreName
 * @param {object[]} objects
 */
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
    if (typeof keyPath != "string") {
      throw Error("We do not yet support keyPath arrays.");
    }

    objects.forEach((obj) => {
      const keyValue = obj[keyPath];
      const readRequest = objectStore.get(keyValue);
      readRequest.onsuccess = function (event) {
        console.log("success", event, readRequest);
        const result = readRequest.result;
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

/**
 * @param {IDBDatabase} db
 * @param {string} objectStoreName
 * @param {string} key
 */
export const $readSingle = (db, objectStoreName, key) =>
  new Promise((resolve, reject) => {
    console.log("$readSingle", objectStoreName);
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

/**
 * @param {IDBDatabase} db
 * @param {string} objectStoreName
 */
export const $readMany = (db, objectStoreName) =>
  new Promise((resolve, reject) => {
    console.log("$readMany", objectStoreName);
    const transaction = db.transaction(objectStoreName, "readonly");
    const objectStore = transaction.objectStore(objectStoreName);
    const objectStoreRequest = objectStore.getAll();

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

export const $delete = () => {
  throw new Error("Not implemented.");
};

/**
 * @param {string} [databaseName]
 * @param {{ operations: ((db: IDBDatabase)=> any)[], message: string }[]} [migrations]
 */
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
      const db = openDBRequest.result;
      resolve(db);
    };

    openDBRequest.onupgradeneeded = (event) => {
      console.log("upgradeneeded", event);
      const db = openDBRequest.result;

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

/**
 * @param {string} databaseName
 */
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
