/**
 * @param {any} menuItemsList
 * @param {CafeDomain.DomainEvent[]} events
 */
export default (menuItemsList, ...events: CafeDomain.DomainEvent[]) => {
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
      menuItemsList.items = menuItemsList.items.map(
        (menuItem: CafeDomain.MenuItem) =>
          menuItem.uniqueId == event.payload.menuItemUniqueId
            ? (() => {
                menuItem.menuItemSupplies = menuItem.menuItemSupplies.map(
                  (menuItemSupply: CafeDomain.MenuItemSupply) => {
                    return menuItemSupply.uniqueId == event.payload.uniqueId
                      ? event.payload
                      : menuItemSupply;
                  }
                );
                return menuItem;
              })()
            : menuItem
      );
    }

    if (event.type == "menu_item_supply_deleted") {
      menuItemsList.items = menuItemsList.items.map(
        (menuItem: CafeDomain.MenuItem) =>
          menuItem.uniqueId == event.payload.menuItemUniqueId
            ? (() => {
                menuItem.menuItemSupplies = menuItem.menuItemSupplies.filter(
                  (menuItemSupply: CafeDomain.MenuItemSupply) =>
                    menuItemSupply.uniqueId != event.payload.uniqueId
                );
                return menuItem;
              })()
            : menuItem
      );
    }
  });

  return menuItemsList;
};
