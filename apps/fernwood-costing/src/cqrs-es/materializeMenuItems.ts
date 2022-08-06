import type { DomainEvent, MenuItem, MenuItemSupply } from "@/domain/types";
import type { ReactiveArray } from "@/types/ReactiveArray";

export default (
  menuItemsList: ReactiveArray<MenuItem>,
  ...events: DomainEvent[]
) => {
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

    if (event.type == "menu_item_deleted") {
      menuItemsList.items = menuItemsList.items.filter(
        (item) => item.uniqueId != event.payload.uniqueId
      );
    }

    if (event.type == "supply_added_to_menu_item") {
      if (!event.payload.supplyUniqueId) {
        console.warn("Missing supplyUniqueId", event.payload);
        return;
      }

      menuItemsList.items = menuItemsList.items.map((menuItem: MenuItem) =>
        menuItem.uniqueId == event.payload.menuItemUniqueId
          ? (() => {
              menuItem.menuItemSupplies.push(event.payload);
              return menuItem;
            })()
          : menuItem
      );
    }

    if (event.type == "supply_updated_on_menu_item") {
      menuItemsList.items = menuItemsList.items.map((menuItem: MenuItem) =>
        menuItem.uniqueId == event.payload.menuItemUniqueId
          ? (() => {
              menuItem.menuItemSupplies = menuItem.menuItemSupplies.map(
                (menuItemSupply: MenuItemSupply) => {
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

    if (event.type == "supply_deleted") {
      menuItemsList.items = menuItemsList.items.reduce((acc, menuItem) => {
        menuItem.menuItemSupplies = menuItem.menuItemSupplies.filter(
          (supply) => supply.supplyUniqueId != event.payload.uniqueId
        );
        return acc.concat([menuItem]);
      }, []);
    }

    if (event.type == "supply_removed_from_menu_item") {
      menuItemsList.items = menuItemsList.items.map((menuItem: MenuItem) =>
        menuItem.uniqueId == event.payload.menuItemUniqueId
          ? (() => {
              menuItem.menuItemSupplies = menuItem.menuItemSupplies.filter(
                (menuItemSupply: MenuItemSupply) =>
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
