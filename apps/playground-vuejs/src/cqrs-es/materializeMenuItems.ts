/**
 * @param {any} menuItemsList
 * @param {CafeDomain.DomainEvent[]} events
 */
export default (menuItemsList, ...events) => {
  events.forEach((event) => {
    console.log("materializeMenuItems", event);

    if (event.type == "menu_item_created") {
      menuItemsList.items.push(event.payload);
    }

    // TODO Consider replacing this one with menu_item_supply_added.
    if (event.type == "menu_item_updated") {
      menuItemsList.items = menuItemsList.items.map((oldItem) =>
        oldItem.uniqueId == event.payload.uniqueId ? event.payload : oldItem
      );
    }

    if (event.type == "menu_item_supply_updated") {
      menuItemsList.items = menuItemsList.items.map((oldItem) =>
        oldItem.uniqueId == event.payload.uniqueId ? event.payload : oldItem
      );
    }

    if (event.type == "menu_item_supply_deleted") {
      menuItemsList.items = menuItemsList.items.filter(
        (item) => item.uniqueId != event.payload.uniqueId
      );
    }
  });

  return menuItemsList;
};
