/**
 * @param {object} obj
 * @return
 */
const cloneObject = (obj) =>
  // Clone manually to handle the exception that we receive with Proxy objects.
  // Uncaught DOMException: Failed to execute 'put' on 'IDBObjectStore': #<Object> could not be cloned.
  JSON.parse(JSON.stringify(obj));

/**
 * @param {IDBDatabase} db
 * @param {string} objectStoreName
 * @param {object[]} objects
 */
export const $create = (db, objectStoreName, objects) =>
  new Promise<void>((resolve, reject) => {
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
    objects.map(cloneObject).forEach((obj) => {
      const request = objectStore.add(obj);
      request.onsuccess = (event) => {
        console.log("success", event);
      };
    });
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

export const $migrateDB = (
  databaseName: string,
  migrations: any[]
): Promise<IDBDatabase> =>
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
  new Promise<void>((resolve, reject) => {
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
