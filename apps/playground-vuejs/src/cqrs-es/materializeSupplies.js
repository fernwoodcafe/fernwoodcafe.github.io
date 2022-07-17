/**
 * @param {any} suppliesList
 * @param {CafeDomain.DomainEvent<any>[]} events
 */
export default (suppliesList, ...events) => {
  events.forEach((event) => {
    console.log(
      "materializeSupplies",
      event.eventIndex,
      event.type,
      event.payload
    );

    if (event.type == "supply_created") {
      suppliesList.items.push(event.payload);
    }

    if (event.type == "supply_updated") {
      suppliesList.items = suppliesList.items.map((oldItem) =>
        oldItem.uniqueId == event.payload.uniqueId ? event.payload : oldItem
      );
    }

    console.log(
      "materializedSupplyList",
      JSON.stringify(suppliesList.items),
      null,
      2
    );
  });

  return suppliesList;
};
