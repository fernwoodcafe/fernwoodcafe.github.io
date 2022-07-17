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

    if (event.type == "supply_added_to_menu_item") {
      menuItemsList.items = menuItemsList.items.map(
        (menuItem: CafeDomain.MenuItem) =>
          menuItem.uniqueId == event.payload.menuItemUniqueId
            ? (() => {
                menuItem.menuItemSupplies.push(event.payload);
                return menuItem;
              })()
            : menuItem
      );
    }

    if (event.type == "supply_updated_on_menu_item") {
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

    if (event.type == "supply_removed_from_menu_item") {
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
