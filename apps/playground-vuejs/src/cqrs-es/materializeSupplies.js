/**
 * @param {any} suppliesList
 * @param {CafeDomain.DomainEvent[]} events
 */
export default (suppliesList, ...events) => {
  events.forEach((event) => {
    console.log("materializeSupplies", event.type, event.payload);
    if (event.type == "supply_created") {
      suppliesList.items.push(event.payload);
    }

    if (event.type == "supply_updated") {
      suppliesList.items = suppliesList.items.map((oldItem) =>
        oldItem.id == event.payload.id ? event.payload : oldItem
      );
    }
  });

  return suppliesList;
};
