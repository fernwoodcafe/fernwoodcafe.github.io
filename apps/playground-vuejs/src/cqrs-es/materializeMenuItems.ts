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

    if (event.type == "menu_item_updated") {
      menuItemsList.items = menuItemsList.items.map((oldItem) =>
        oldItem.uniqueId == event.payload.uniqueId ? event.payload : oldItem
      );
    }
  });

  return menuItemsList;
};