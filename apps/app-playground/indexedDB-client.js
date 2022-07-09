// https://developer.mozilla.org/en-US/docs/Web/API/IndexedDB_API/Using_IndexedDB
const create = async () => {
  const openDBRequest = indexedDB.open("MyTestDatabase", 3);

  openDBRequest.onerror = (event) => {
    console.log("error", event);
  };

  openDBRequest.onsuccess = (event) => {
    console.log("success", event);
  };

  openDBRequest.onupgradeneeded = (event) => {
    console.log("upgradeneeded");
    const db = event.target.result;

    const objectStore = db.createObjectStore("supplies", { keyPath: "name" });

    objectStore.transaction.oncomplete = (event) => {
      const supplyData = [
        {
          name: "8 ounce cups",
        },
        {
          name: "12 ounce cups",
        },
      ];

      const suppliesObjectStore = db
        .transaction("supplies", "readwrite")
        .objectStore("supplies");

      supplyData.forEach(function (customer) {
        suppliesObjectStore.add(customer);
      });
    };
  };
};

create();
