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
    console.debug("$create", objectStoreName);
    const transaction = db.transaction(objectStoreName, "readwrite");

    transaction.oncomplete = (event) => {
      console.debug("complete", event);
      resolve();
    };

    transaction.onerror = (event) => {
      console.debug("error", event);
      reject();
    };

    const objectStore = transaction.objectStore(objectStoreName);
    objects.map(cloneObject).forEach((obj) => {
      const request = objectStore.add(obj);
      request.onsuccess = (event) => {
        console.debug("success", event);
      };
    });
  });

/**
 * @param {IDBDatabase} db
 * @param {string} objectStoreName
 */
export const $readMany = (db, objectStoreName) =>
  new Promise((resolve, reject) => {
    console.debug("$readMany", objectStoreName);
    const transaction = db.transaction(objectStoreName, "readonly");
    const objectStore = transaction.objectStore(objectStoreName);
    const objectStoreRequest = objectStore.getAll();

    objectStoreRequest.onsuccess = function (event) {
      console.debug("success", event, objectStoreRequest);
      const result = objectStoreRequest.result;
      resolve(result);
    };

    objectStoreRequest.onerror = function (event) {
      console.debug("error", event);
      reject(event);
    };
  });

export const $migrateDB = (
  databaseName: string,
  migrations: any[]
): Promise<IDBDatabase> =>
  new Promise((resolve, reject) =>
    indexedDB.databases().then((databases) => {
      const findResult = databases.find((x) => x.name == databaseName);
      const currentVersion = findResult == null ? 0 : findResult.version;
      const openDBRequest = indexedDB.open(databaseName, migrations.length);

      openDBRequest.onerror = (event) => {
        console.debug("error", event);
        reject();
      };

      openDBRequest.onsuccess = (event) => {
        console.debug("success", event);
        const db = openDBRequest.result;
        resolve(db);
      };

      openDBRequest.onupgradeneeded = (event) => {
        console.debug("upgradeneeded", event);
        const db = openDBRequest.result;
        migrations.slice(currentVersion).forEach((migration) => {
          console.debug(`running migration '${migration.message}`);
          migration.operations.forEach((operation) => {
            const objectStore = operation(db);
            if (!objectStore) {
              return;
            }

            objectStore.transaction.oncomplete = (event) => {
              console.debug("complete", event);
            };
          });
        });
      };
    })
  );

/**
 * @param {string} databaseName
 */
export const $deleteDB = (databaseName) =>
  new Promise<void>((resolve, reject) => {
    const request = indexedDB.deleteDatabase(databaseName);

    request.onsuccess = (event) => {
      console.debug("success", event);
      resolve();
    };

    request.onerror = (event) => {
      console.debug("error", event);
      reject();
    };

    request.onblocked = (event) => {
      console.debug("blocked", event);
      reject();
    };
  });
