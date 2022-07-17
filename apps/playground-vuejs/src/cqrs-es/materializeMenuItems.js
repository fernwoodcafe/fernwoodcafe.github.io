/**
 * @param {any} menuItemsList
 * @param {CafeDomain.DomainEvent[]} events
 */
export default (menuItemsList, ...events) => {
  events.forEach((event) => {
    console.log("materializeMenuItems", event);
    if (event.type == "new_menu_item_created") {
      menuItemsList.items.push(event.payload);
    }

    if (event.type == "menu_item_updated") {
      menuItemsList.items = menuItemsList.items.map((oldItem) =>
        oldItem.id == event.payload.id ? event.payload : oldItem
      );
    }
  });

  return menuItemsList;
};