import type { CafeEventUnion, InventorySheet } from "@packages/domain/types";
import type { ReactiveArray } from "@ui/types/ReactiveArray";

export default (
  inventorySheetsList: ReactiveArray<InventorySheet>,
  ...events: CafeEventUnion[]
) => {
  // TODO Consider using a chain-of-responsibility pattern here, to ease
  // maintanance as the quantity of events and commands grow.
  events.forEach((event) => {
    if (event.type == "inventory_sheet_created") {
      const inventory: InventorySheet = {
        uniqueId: event.payload.uniqueId,
        dateStarted: new Date(event.payload.dateStarted),
        dateCompleted: new Date(event.payload.dateCompleted),
        inventoryItems: event.payload.inventoryItems,
      };

      inventorySheetsList.items.push(inventory);
    }

    if (event.type == "inventory_sheet_deleted") {
      inventorySheetsList.items = inventorySheetsList.items.filter(
        (item) => item.uniqueId != event.payload.uniqueId
      );
    }
  });

  return inventorySheetsList;
};
