import type {
  CafeEventUnion,
  MenuItem,
  MenuItemComponent,
} from "@packages/domain/types";
import type { ReactiveArray } from "@ui/types/ReactiveArray";
import convertEventToLatestVersion from "./convertEventToLatestVersion";

export default (
  menuItemsList: ReactiveArray<MenuItem>,
  ...events: CafeEventUnion[]
) => {
  events.map(convertEventToLatestVersion).forEach((event) => {
    if (event.type == "menu_item_created") {
      menuItemsList.items.push(event.payload);
    }

    if (event.type == "menu_item_updated") {
      menuItemsList.items = menuItemsList.items.map((menuItem) => {
        if (menuItem.uniqueId !== event.payload.uniqueId) {
          return menuItem;
        }

        // He we MUTATE the menuItem, because the MenuItemView component has a
        // reference to t. When we mutate it here, the MenuItemView receives those
        // updates. Spooky action at a distance! I would like an immutable way to
        // use VueJs while still leveraging its reactivity.
        // Maybe: https://vuejs.org/guide/extras/reactivity-in-depth.html#immutable-data
        Object.keys(menuItem).forEach((key) => {
          menuItem[key] = event.payload[key];
        });

        return event.payload;
      });
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
              menuItem.menuItemComponents.push(event.payload);
              return menuItem;
            })()
          : menuItem
      );
    }

    if (event.type == "supply_updated_on_menu_item") {
      menuItemsList.items = menuItemsList.items.map((menuItem: MenuItem) =>
        menuItem.uniqueId == event.payload.menuItemUniqueId
          ? (() => {
              menuItem.menuItemComponents = menuItem.menuItemComponents.map(
                (menuItemSupply: MenuItemComponent) => {
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
        menuItem.menuItemComponents = menuItem.menuItemComponents.filter(
          (supply) => supply.supplyUniqueId != event.payload.uniqueId
        );
        return acc.concat([menuItem]);
      }, []);
    }

    if (event.type == "supply_removed_from_menu_item") {
      menuItemsList.items = menuItemsList.items.map((menuItem: MenuItem) =>
        menuItem.uniqueId == event.payload.menuItemUniqueId
          ? (() => {
              menuItem.menuItemComponents = menuItem.menuItemComponents.filter(
                (menuItemSupply: MenuItemComponent) =>
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
