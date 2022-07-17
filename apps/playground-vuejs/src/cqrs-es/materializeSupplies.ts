/**
 * @param {any} suppliesList
 * @param {CafeDomain.DomainEvent<any>[]} events
 */
export default (suppliesList, ...events) => {
  events.forEach((event) => {
    console.log("materializeSupplies", event.type);

    if (event.type == "supply_created") {
      suppliesList.items.push(event.payload);
    }

    if (event.type == "supply_updated") {
      suppliesList.items = suppliesList.items.map((oldItem) =>
        oldItem.uniqueId == event.payload.uniqueId ? event.payload : oldItem
      );
    }

    if (event.type == "supply_deleted") {
      suppliesList.items = suppliesList.items.filter(
        (item) => item.uniqueId != event.payload.uniqueId
      );
    }
  });

  return suppliesList;
};
