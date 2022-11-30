import type {
  CafeEventUnion,
  MenuItem,
  MenuItemComponent,
} from "@packages/domain/types";
import type { ReactiveArray } from "@ui/types/ReactiveArray";
import convertEventToLatestVersion from "./convertEventToLatestVersion";
import mutateRecord from "./mutateRecord";

export default (
  menuItemsList: ReactiveArray<MenuItem>,
  ...events: CafeEventUnion[]
) => {
  events.map(convertEventToLatestVersion).forEach((event) => {
    if (event.type == "menu_item_created") {
      menuItemsList.items = menuItemsList.items.concat(event.payload);
    }

    if (event.type == "menu_item_updated") {
      const targetItem = menuItemsList.items.filter(
        (menuItem) => menuItem.uniqueId == event.payload.uniqueId
      )[0];

      // We trigger reactivity on the object only. We do not trigger reactivity
      // on its containing array. Why not? It seems nearly impossible to trigger
      // reactivity on both an object and on its array without losing the object
      // reference in the array. Basically, to trigger array reactivity, we have
      // to change the object reference; but, to maintain continuity of object
      // reactivity, we need to keep the object reference. Hmm. Tough challenge.
      // See https://v2.vuejs.org/v2/guide/reactivity.html
      // See also https://www.ag-grid.com/vue-data-grid/value-setters/#read-only-edit/
      // See also our implementation of onCellEditRequest in AgGridComponent.
      //
      // > Since Vue's reactivity tracking works over property access,
      // > we must always keep the same reference to the reactive object.
      // > This means we can't easily "replace" a reactive object because
      // > the reactivity connection to the first reference is lost.
      // > From https://vuejs.org/guide/essentials/reactivity-fundamentals.html

      mutateRecord(targetItem, event.payload);
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
              menuItem.menuItemComponents = menuItem.menuItemComponents.concat(
                event.payload
              );

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
